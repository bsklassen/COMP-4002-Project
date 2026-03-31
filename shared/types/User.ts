export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type NewUser = Omit<User, 'id'>;
