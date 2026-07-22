export type UserRole = "user" | "admin";

export interface User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileUpdate {
  name?: string;
  email?: string;
  avatar?: string;
}
