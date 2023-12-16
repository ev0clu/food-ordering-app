import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string;
    role: string;
    id: string;
    provider: string;
  }
  interface Session {
    user: User & {
      username: string;
      role: string;
      id: string;
      provider: string;
    };
    token: {
      username: string;
      role: string;
      id: string;
      provider: string;
    };
  }
}
