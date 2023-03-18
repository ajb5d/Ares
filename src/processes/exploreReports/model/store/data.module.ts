import getFilePath from "@/shared/api/getFilePath";
import apiService from "@/shared/api/apiService";

import preprocessing from "./preprocessing";
import postprocessing from "./postprocessing";

import { CLEAR_DATA, SET_DATA } from "./mutations.type";
import {
  FETCH_FILES,
  FETCH_MULTIPLE_FILES_BY_RELEASE,
  FETCH_MULTIPLE_FILES_BY_SOURCE,
  RESET_DATA_STORAGE,
} from "./actions.type";

import { errorActions } from "@/widgets/error";
import { SourceRelease } from "@/processes/exploreReports/model/interfaces/files/SourceIndex";

const state = {
  data: {},
};

const getters = {
  getData: (state) => {
    return state.data;
  },
  dataInStore: (state) => {
    return Object.keys(state.data).length;
  },
};

const actions = {
  [RESET_DATA_STORAGE]({ commit }) {
    commit(CLEAR_DATA);
  },

  async [FETCH_FILES]({ commit, dispatch, rootState }, payload) {
    const promises = payload.files.map((file) => {
      return apiService(
        {
          url: getFilePath(
            payload.params ? payload.params : rootState.route.params
          )[file.name],
          method: "get",
        },
        {
          required: file.required,
        }
      );
    });

    await Promise.allSettled(promises).then((responses) => {
      const data = responses.reduce((obj, currValue, index) => {
        const status = currValue.status;
        if (status === "fulfilled") {
          const fileData = currValue.value?.data;
          return {
            ...obj,
            [payload.files[index].name]: preprocessing[
              payload.files[index].name
            ]
              ? preprocessing[payload.files[index].name](fileData)
              : fileData,
          };
        }
        if (status === "rejected" && currValue.reason.payload.required) {
          const message = currValue.reason.error.message;
          const url = currValue.reason?.error?.config?.url;
          dispatch(errorActions.NEW_ERROR, {
            message,
            details: url,
          });
          return {
            ...obj,
          };
        } else {
          return {
            ...obj,
          };
        }
      }, {});
      postprocessing[rootState.route.name]
        ? commit(SET_DATA, postprocessing[rootState.route.name](data))
        : commit(SET_DATA, data);
    });
  },

  async [FETCH_MULTIPLE_FILES_BY_SOURCE](
    { commit, dispatch, rootState, rootGetters },
    payload
  ) {
    const promises = payload.files.reduce(
      (obj, file) => ({
        ...obj,
        [file.name]: rootGetters.getSources.reduce(
          (filesArray, currentSource) => {
            const loadedFiles = file.instanceParams.reduce(
              (array, currentInstance) => {
                return [
                  ...array,
                  apiService(
                    {
                      url: getFilePath({
                        cdm: currentSource.cdm_source_key,
                        release: currentSource.releases[0].release_id,
                        domain: currentInstance.domain
                          ? currentInstance.domain
                          : rootState.route.params.domain,
                        concept: currentInstance.concept
                          ? currentInstance.concept
                          : rootState.route.params.concept,
                      })[file.name],
                      method: "get",
                    },

                    { source: currentSource }
                  ),
                ];
              },
              []
            );
            return [...filesArray, ...loadedFiles];
          },
          []
        ),
      }),
      {}
    );
    const data = {};
    for (const file in promises) {
      await Promise.allSettled(promises[file]).then((responses) => {
        data[file] = responses
          .filter((response) => response.status === "fulfilled")
          .map(
            (
              filtered: PromiseFulfilledResult<{
                data: never[];
                payload: { source: string };
              }>
            ) => ({
              data: preprocessing[file]
                ? preprocessing[file](filtered.value.data)
                : filtered.value?.data,
              source: filtered.value?.payload.source,
            })
          );
        if (data[file].length === 0 && payload.criticalError) {
          dispatch(errorActions.NEW_ERROR, {
            message: "No files found across data sources",
            details: "No additional data",
          });
        }
      });
    }
    postprocessing[rootState.route.name]
      ? commit(SET_DATA, postprocessing[rootState.route.name](data))
      : commit(SET_DATA, data);
  },

  async [FETCH_MULTIPLE_FILES_BY_RELEASE](
    { commit, dispatch, rootState, rootGetters },
    payload
  ) {
    const promises = payload.files.reduce(
      (obj, file) => ({
        ...obj,
        [file]: rootGetters.getSelectedSource.releases.map((release) => {
          return apiService(
            {
              url: getFilePath({
                cdm: rootGetters.getSelectedSource.cdm_source_key,
                release: release.release_id,
                domain: rootState.route.params.domain,
                concept: rootState.route.params.concept,
              })[file],
              method: "get",
            },
            release.release_name
          );
        }),
      }),
      {}
    );
    const data = {};
    for (const file in promises) {
      await Promise.allSettled(promises[file]).then((responses) => {
        data[file] = responses
          .filter((response) => response.status === "fulfilled")
          .map(
            (
              filtered: PromiseFulfilledResult<{
                data: never;
                payload: SourceRelease;
              }>
            ) => ({
              data: filtered.value?.data,
              release: filtered.value?.payload,
            })
          );
        if (data[file].length === 0) {
          dispatch(errorActions.NEW_ERROR, {
            message: "No files found across current data source releases",
            details: rootGetters.getSelectedSource.cdm_source_abbreviation,
          });
        }
      });
    }
    postprocessing[rootState.route.name]
      ? commit(SET_DATA, postprocessing[rootState.route.name](data))
      : commit(SET_DATA, data);
  },
};

const mutations = {
  [SET_DATA](state, payload) {
    state.data = payload;
  },
  [CLEAR_DATA](state) {
    state.data = {};
    state.webApiData = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};