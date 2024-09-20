import { normalize, schema } from "normalizr";

const phaseSchema = new schema.Entity(
  "phases",
  {},
  {
    idAttribute: (value) => `${value.jobNum}-${value.yearNum}-${value.num}`,
    processStrategy: (value) => ({
      ...value,
      id: `${value.jobNum}-${value.yearNum}-${value.num}`,
      yearId: `${value.jobNum}-${value.yearNum}`,
    }),
  },
);

const yearSchema = new schema.Entity(
  "years",
  {
    phases: [phaseSchema],
  },
  {
    idAttribute: (value) => `${value.jobNum}-${value.num}`,
    processStrategy: (value) => ({
      ...value,
      id: `${value.jobNum}-${value.num}`,
    }),
  },
);

const jobSchema = new schema.Entity(
  "jobs",
  {
    years: [yearSchema],
  },
  {
    idAttribute: "num",
  },
);

export function normalizeData(jobsData) {
  const normalized = normalize(jobsData, [jobSchema]);
  const { jobs, years, phases } = normalized.entities;

  return {
    jobs,
    years,
    phases,
  };
}
