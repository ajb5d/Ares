export const specPopulationByRelease = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: "container",
  height: 200,
  transform: [
    {
      timeUnit: "yearmonthdate",
      field: "release_name",
      as: "date",
    },
  ],
  encoding: {
    tooltip: [
      {
        field: "date",
        title: "Release date",
        type: "temporal",
        format: "%Y-%m-%d",
      },
      { field: "count_person", title: "Population", format: "," },
    ],
    x: {
      field: "date",
      type: "temporal",
      timeUnit: "yearmonthdate",
      axis: {
        title: "Release",
      },
    },
    y: {
      field: "count_person",
      type: "quantitative",
      axis: {
        title: "People",
      },
      scale: {
        zero: false,
      },
    },
  },
  layer: [
    {
      mark: { type: "line", interpolate: "linear", point: true },
    },
    {
      selection: {
        x: {
          type: "single",
          on: "mousemove",
          fields: ["release_name"],
          nearest: true,
        },
      },
      mark: { type: "point", tooltip: true },
    },
    {
      transform: [
        {
          filter: {
            and: ["x.release_name", { selection: "x" }],
          },
        },
      ],
      layer: [
        {
          mark: "rule",
          encoding: {
            y: {
              height: 1,
            },
            color: {
              value: "black",
            },
          },
        },
      ],
    },
  ],
};
