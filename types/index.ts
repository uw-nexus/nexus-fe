export type User = {
  userId?: string;
  username: string;
  password?: string;
  userType?: string;
  provider?: string;
};

export type Student = {
  profile?: StudentProfile;
  skills?: string[];
};

export type StudentProfile = {
  studentId?: string;
  user?: User;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: Date;
  school?: string;
  standing?: string;
  major1?: string;
  major2?: string;
  photoUrl?: string;
  location?: Location;
};

export type Project = {
  details?: ProjectDetails;
  fields?: string[];
  skills?: string[];
};

export type ProjectDetails = {
  projectId?: string;
  owner?: StudentProfile;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Contract = {
  contractId?: string;
  project?: ProjectDetails;
  student?: StudentProfile;
  startDate?: Date;
  endDate?: Date;
  status?: string;
};
