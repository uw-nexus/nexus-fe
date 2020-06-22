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
  date: Date;
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
  date: Date;
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

  return projectsRes.hits
    .map((p: ProjectSearchRes) => ({
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
      date: +new Date(p.date),
    }))
    .sort((p1, p2) => (filters.sortBy === 'recency' ? p2.date - p1.date : 1));
};

export const searchStudents = async (filters: StudentsFilter): Promise<Student[]> => {
  const studentsRes = await studentIndex.search(filters.query, {
    facetFilters: [
      [`degree:${filters.degree}`],
      filters.skills.map((skill) => `skills:${skill}`),
      filters.roles.map((role) => `roles:${role}`),
    ],
  });

  return studentsRes.hits
    .map((s: StudentSearchRes) => ({
      profile: {
        user: { username: s.objectID },
        firstName: s.firstName,
        lastName: s.lastName,
        degree: s.degree,
        major1: s.majors[0] || '',
        major2: s.majors[1] || '',
        postal: s.postal,
      },
      skills: s.skills,
      roles: s.roles,
      interests: s.interests,
      date: +new Date(s.date),
    }))
    .sort((s1, s2) => (filters.sortBy === 'recency' ? s2.date - s1.date : 1));
};

export const getProjects = async (projectIds: string[]): Promise<Project[]> => {
  const res = await projectIndex.getObjects(projectIds);

  return res.results.filter(Boolean).map((p: ProjectSearchRes) => ({
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

  return res.results.filter(Boolean).map((s: StudentSearchRes) => ({
    profile: {
      user: { username: s.objectID },
      firstName: s.firstName,
      lastName: s.lastName,
      degree: s.degree,
      major1: s.majors[0] || '',
      major2: s.majors[1] || '',
      postal: s.postal,
    },
    skills: s.skills,
    roles: s.roles,
    interests: s.interests,
  }));
};
