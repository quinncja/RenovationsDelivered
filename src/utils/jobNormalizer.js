import { normalize, schema } from "normalizr";

const clientSchema = new schema.Entity(
  "clients",
  {},
  {
    idAttribute: "id",
    processStrategy: (value) => ({
      id: value.id,
      name: value.name,
      jobs: value.jobIds || [],
    }),
  },
);

const supervisorSchema = new schema.Entity(
  "supervisors",
  {},
  {
    idAttribute: "id",
    processStrategy: (value) => ({
      id: value.id,
      name: value.name,
      jobs: value.jobIds || [],
    }),
  },
);

const phaseSchema = new schema.Entity(
  "phases",
  {},
  {
    idAttribute: (value) => `${value.jobNum}-${value.yearNum}-${value.num}`,
    processStrategy: (value) => ({
      ...value,
      id: `${value.jobNum}-${value.yearNum}-${value.num}`,
      yearId: `${value.jobNum}-${value.yearNum}`,
      jobId: value.jobNum,
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
      jobId: value.jobNum,
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

function createStateLookup(normalizedData) {
  const states = {};

  Object.values(normalizedData.phases).forEach((phase) => {
    if (!states[phase.state]) {
      states[phase.state] = {
        id: phase.state,
        name: phase.state,
        phaseIds: [],
        jobIds: new Set(),
      };
    }
    states[phase.state].phaseIds.push(phase.id);
    states[phase.state].jobIds.add(phase.jobId);
  });

  Object.values(states).forEach((state) => {
    state.jobIds = Array.from(state.jobIds);
  });

  return states;
}

function createStatusLookup(normalizedData) {
  const statuses = {};

  Object.values(normalizedData.phases).forEach((phase) => {
    if (!statuses[phase.status]) {
      statuses[phase.status] = {
        status: phase.status,
        phaseIds: [],
        jobIds: new Set(),
      };
    }
    statuses[phase.status].phaseIds.push(phase.id);
    statuses[phase.status].jobIds.add(phase.jobId);
  });

  Object.values(statuses).forEach((status) => {
    status.jobIds = Array.from(status.jobIds);
  });

  return statuses;
}

export function normalizeData(cleanedData) {
  const { jobs, clients, supervisors } = cleanedData;

  const normalizedJobs = normalize(jobs, [jobSchema]);
  const normalizedClients = normalize(clients, [clientSchema]);
  const normalizedSupervisors = normalize(supervisors, [supervisorSchema]);

  const entities = {
    jobs: normalizedJobs.entities.jobs || {},
    years: normalizedJobs.entities.years || {},
    phases: normalizedJobs.entities.phases || {},
    clients: normalizedClients.entities.clients || {},
    supervisors: normalizedSupervisors.entities.supervisors || {},
  };

  const states = createStateLookup(entities);
  const statuses = createStatusLookup(entities);

  return {
    ...entities,
    states,
    statuses,
  };
}
