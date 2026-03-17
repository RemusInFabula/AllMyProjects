export interface User {
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export const MOCK_USERS: ReadonlyArray<User> = [
  { email: 'test@test.it', password: '123456', role: 'user' },
  { email: 'admin@test.it', password: 'admin', role: 'admin' }
] as const;
