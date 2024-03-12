import {
  mdiAlphaMCircleOutline,
  mdiChartLine,
  mdiChartTimeline,
  mdiCheckNetwork,
  mdiDatabaseSearch,
  mdiDna,
  mdiShape,
  mdiHistory,
  mdiSigmaLower,
  mdiSpeedometer,
  mdiTable,
  mdiAccountGroupOutline,
} from "@mdi/js";

export const reports = [
  {
    folder: "Data Source Release",
    icon: mdiSigmaLower,
    name: "Data Quality",
    routeName: "dataQuality",
  },
  {
    folder: "Data Source Release",
    icon: mdiChartLine,
    name: "Person",
    routeName: "person",
  },
  {
    folder: "Data Source Release",
    icon: mdiAccountGroupOutline,
    name: "Cohorts",
    routeName: "cohorts",
  },
  {
    folder: "Data Network",
    icon: mdiDatabaseSearch,
    name: "Data Source Feasibility",
    routeName: "feasibility",
  },
  {
    folder: "Data Network",
    icon: mdiCheckNetwork,
    name: "Network Concept Report",
    routeName: "networkConcept",
  },
  {
    folder: "Data Network",
    icon: mdiDatabaseSearch,
    name: "Network Concept Dashboard",
    routeName: "networkConceptDashboard",
  },
  {
    folder: "Data Network",
    icon: mdiDatabaseSearch,
    name: "Web API",
    routeName: "webApi",
  },
  {
    folder: "Data Network",
    icon: mdiSpeedometer,
    name: "Network Performance",
    routeName: "networkPerformance",
  },
  {
    folder: "Data Source Release",
    icon: mdiChartLine,
    name: "Data Density",
    routeName: "dataDensity",
  },
  {
    folder: "Data Source Release",
    icon: mdiChartLine,
    name: "Observation Period",
    routeName: "observationPeriod",
  },
  {
    folder: "Data Source",
    icon: mdiHistory,
    name: "Data Quality History",
    routeName: "dataQualityHistory",
  },
  {
    folder: "Data Source",
    icon: mdiTable,
    name: "Data Source Overview",
    routeName: "dataSourceOverview",
  },
  {
    folder: "Data Source",
    icon: mdiChartTimeline,
    name: "Domain Continuity",
    routeName: "domainContinuity",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Conditions",
    routeName: "domainTable",
    domain: "condition_occurrence",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Condition Eras",
    routeName: "domainTable",
    domain: "condition_era",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Drugs",
    routeName: "domainTable",
    domain: "drug_exposure",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Drug Eras",
    routeName: "domainTable",
    domain: "drug_era",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Visit Occurrence",
    routeName: "domainTable",
    domain: "visit_occurrence",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Visit Detail",
    routeName: "domainTable",
    domain: "visit_detail",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Measurements",
    routeName: "domainTable",
    domain: "measurement",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Observations",
    routeName: "domainTable",
    domain: "observation",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Procedures",
    routeName: "domainTable",
    domain: "procedure_occurrence",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Device Exposures",
    routeName: "domainTable",
    domain: "device_exposure",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Death",
    routeName: "death",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Unmapped Source Codes",
    routeName: "unmappedSourceCodes",
  },
  {
    folder: "Data Source Release",
    icon: mdiTable,
    name: "Temporal Characterization",
    routeName: "temporalCharacterization",
  },
  {
    folder: "Data Source Release",
    icon: mdiSpeedometer,
    name: "Performance",
    routeName: "performance",
  },
  {
    folder: "Data Source Release",
    icon: mdiAlphaMCircleOutline,
    name: "Metadata",
    routeName: "metadata",
  },
  {
    folder: "Data Network",
    icon: mdiTable,
    name: "Overview",
    routeName: "overview",
  },
  {
    folder: "Data Network",
    icon: mdiSigmaLower,
    name: "Quality Assessment",
    routeName: "networkDataQuality",
  },
  {
    folder: "Data Network",
    icon: mdiChartLine,
    name: "Population Overview",
    routeName: "population",
  },
  {
    folder: "Data Network",
    icon: mdiShape,
    name: "Network Diversity Report",
    routeName: "networkDiversityReport",
  },
  {
    folder: "Data Network",
    icon: mdiDna,
    name: "Data Strand Report",
    routeName: "dataStrandReport",
  },
  {
    folder: "Data Network",
    icon: mdiTable,
    name: "Unmapped Source Codes",
    routeName: "networkUnmappedSourceCodes",
  },
];
