export function specObservationByAge(zeroBaseline = false, minMax = false) {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    height: { step: "20" },
    width: "container",
    encoding: {
      y: {
        field: "CATEGORY",
        type: "nominal",
        title: null,
        sort: { field: "categoryOrder" },
        scale: {
          zero: zeroBaseline,
        },
      },
    },
    layer: [
      {
        mark: {
          type: "rule",
        },
        encoding: {
          x: {
            field: minMax ? "MIN_VALUE" : "P10_VALUE",
            type: "quantitative",
            scale: { zero: false },
            title: "Years",
            format: ".0d",
          },
          x2: { field: minMax ? "MAX_VALUE" : "P90_VALUE" },
        },
      },
      {
        mark: {
          type: "bar",
          size: 14,
        },
        encoding: {
          tooltip: [
            { field: "CATEGORY", title: "CATEGORY" },
            { field: "MIN_VALUE", title: "MIN_VALUE" },
            { field: "P10_VALUE", title: "P10_VALUE" },
            { field: "P25_VALUE", title: "P25_VALUE" },
            { field: "MEDIAN_VALUE", title: "MEDIAN_VALUE" },
            { field: "P75_VALUE", title: "P75_VALUE" },
            { field: "P90_VALUE", title: "P90_VALUE" },
            { field: "MAX_VALUE", title: "MAX_VALUE" },
          ],
          x: { field: "P25_VALUE", type: "quantitative" },
          x2: { field: "P75_VALUE" },
          color: { field: "CATEGORY", type: "nominal", legend: null },
        },
      },
      {
        mark: { type: "tick", color: "white", size: 14 },
        encoding: {
          x: { field: "MEDIAN_VALUE", type: "quantitative" },
        },
      },
    ],
    row: {
      field: "CATEGORY",
      type: "nominal",
      title: "Measurement",
    },
  };
}
