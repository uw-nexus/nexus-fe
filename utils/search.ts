import getConfig from 'next/config';
import algoliasearch from 'algoliasearch';
import { Project, ProjectsFilter, Student, StudentsFilter } from 'types';

type ProjectSearchRes = {
  objectID: string;
  title: string;
  status: string;
  duration: string;
  teamSize: string;
  postal: string;
  skills: string[];
  roles: string[];
  interests: string[];
};

type StudentSearchRes = {
  objectID: string;
  username: string;
  firstName: string;
  lastName: string;
  degree: string;
  majors: string[];
  postal: string;
  skills: string[];
  roles: string[];
  interests: string[];
};

const {
  publicRuntimeConfig: { ALGOLIA_APP_ID, ALGOLIA_API_KEY },
} = getConfig();

const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const studentIndex = algoliaClient.initIndex('students');
const projectIndex = algoliaClient.initIndex('projects');

export const searchProjects = async (filters: ProjectsFilter): Promise<Project[]> => {
  const projectsRes = await projectIndex.search(filters.query, {
    facetFilters: [
      [`duration:${filters.duration}`],
      [`teamSize:${filters.teamSize}`],
      filters.skills.map((skill) => `skills:${skill}`),
      filters.roles.map((role) => `roles:${role}`),
      filters.interests.map((interest) => `interests:${interest}`),
    ],
  });

  return projectsRes.hits.map((p: ProjectSearchRes) => ({
    details: {
      projectId: p.objectID,
      title: p.title,
      status: p.status,
      duration: p.duration,
      size: p.teamSize,
      postal: p.postal,
    },
    skills: p.skills,
    roles: p.roles,
    interests: p.interests,
  }));
};

export const searchStudents = async (filters: StudentsFilter): Promise<Student[]> => {
  const studentsRes = await studentIndex.search(filters.query, {
    facetFilters: [
      [`degree:${filters.degree}`],
      filters.skills.map((skill) => `skills:${skill}`),
      filters.roles.map((role) => `roles:${role}`),
    ],
  });

  return studentsRes.hits.map((s: StudentSearchRes) => ({
    profile: {
      user: { username: s.objectID },
      firstName: s.firstName,
      lastName: s.lastName,
      degree: s.degree,
      majors: s.majors,
      postal: s.postal,
    },
    skills: s.skills,
    roles: s.roles,
    interests: s.interests,
  }));
};

export const getProjects = async (projectIds: string[]): Promise<Project[]> => {
  const res = await projectIndex.getObjects(projectIds);

  return res.results.map((p: ProjectSearchRes) => ({
    details: {
      projectId: p.objectID,
      title: p.title,
      status: p.status,
      duration: p.duration,
      size: p.teamSize,
      postal: p.postal,
    },
    skills: p.skills,
    roles: p.roles,
    interests: p.interests,
  }));
};

export const getStudents = async (usernames: string[]): Promise<Student[]> => {
  const res = await studentIndex.getObjects(usernames);

  return res.results.map((s: StudentSearchRes) => ({
    profile: {
      user: { username: s.objectID },
      firstName: s.firstName,
      lastName: s.lastName,
      degree: s.degree,
      majors: s.majors,
      postal: s.postal,
    },
    skills: s.skills,
    roles: s.roles,
    interests: s.interests,
  }));
};
