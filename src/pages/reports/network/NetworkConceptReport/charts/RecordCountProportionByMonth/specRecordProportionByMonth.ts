import { VEGA_SCHEMA } from "@/shared/config/links";
import { TopLevelSpec } from "vega-lite";

export function specRecordProportionByMonth(zeroBaseline = false) {
  return {
    $schema: VEGA_SCHEMA,
    vconcat: [
      {
        height: 150,
        width: "container",
        description: "Domain Data Density",
        data: { name: "conceptData" },

        layer: [
          {
            mark: { type: "circle" },
            params: [
              {
                name: "source",
                select: { type: "point", fields: ["SOURCE"] },
                bind: "legend",
              },
            ],
            encoding: {
              opacity: {
                condition: { param: "source", value: 1 },
                value: 0.2,
              },
              y: {
                field: "Y_PREVALENCE_1000PP",
                type: "quantitative",
                scale: {
                  zero: zeroBaseline,
                },
              },
            },
          },
          {
            params: [
              {
                name: "index",
                select: {
                  type: "point",
                  fields: ["date"],
                  on: "mousemove",
                  nearest: true,
                },
              },
            ],
            mark: { type: "point" },
            encoding: {
              y: {
                field: "Y_PREVALENCE_1000PP",
                type: "quantitative",
                scale: {
                  zero: zeroBaseline,
                },
              },
              opacity: { value: 0 },
            },
          },
          {
            transform: [
              {
                filter: {
                  and: ["index.date", { param: "index" }],
                },
              },
            ],
            mark: "rule",
            encoding: {
              y: {
                height: 1,
              },
            },
          },
        ],
        encoding: {
          x: {
            field: "date",
            type: "temporal",
            timeUnit: "yearmonth",
            scale: { domain: { selection: "brush" } },
            axis: { title: "" },
          },
          y: {
            field: "Y_PREVALENCE_1000PP",
            type: "quantitative",
            title: "Record Proportion per 1000",
            scale: {
              zero: zeroBaseline,
            },
          },
          color: { field: "SOURCE", type: "nominal" },

          tooltip: [
            {
              field: "Y_PREVALENCE_1000PP",
              title: "RPP1000",
              type: "quantitative",
            },
            {
              field: "date",
              title: "Date",
              type: "temporal",
              timeUnit: "yearmonth",
            },
          ],
        },
      },
      {
        width: "container",
        height: 25,
        mark: "line",
        data: { name: "conceptData" },
        selection: {
          brush: { type: "interval", encodings: ["x"] },
        },
        encoding: {
          x: {
            field: "date",
            type: "temporal",
            title: "Date",
            timeUnit: "yearmonth",
          },
          y: {
            field: "Y_PREVALENCE_1000PP",
            type: "quantitative",
            title: "",
          },
        },
      },
    ],
  };
}
