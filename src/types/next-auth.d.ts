import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string;
    role: string;
    id: string;
    login: string;
  }
  interface Session {
    user: User & {
      username: string;
      role: string;
      id: string;
      login: string;
    };
    token: {
      username: string;
      role: string;
      id: string;
      login: string;
    };
  }
}
