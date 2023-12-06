# **Next.js Food ordering App**

A food ordering app has built with Next.js framework. The app allows users to log in in order to order foods.

### Demo: [Link]()

## How run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal
3. Create .env file and add a new enviromental variable named DATABASE_URL with your own MongoDB connection link, add NEXTAUTH_SECRET variable with open ssl key
4. Run `npx prisma generate`
5. Run `npm run dev` command in your terminal
6. Server running at `http://localhost:3000/`

## Features

- Allow user to register, log in and log out
- Only logged in users have rights to order foods

<!--
- Only users with admin rights can create a new post
- User with admin rights can remove/update posts and comments
- User without admin rigths can remove/update comments which have written by himself/herself
- Posts and comments update date has shown
- Next.js used for CSR and SSR
- MongoDB used to store users, posts and comments informations
- Prisma ORM is used
- Bcrypt.js used to hash the user password
- Zod used for validation
- Render-as-you-fetch approach is used for Loading screen
-->

- Hosted on Vercel
- Responsive design

### Useful links and informations

- Open SSL key generation:
  - You can use the following link to create open ssl key: `https://www.cryptool.org/en/cto/openssl` or you can install open ssl and generate key from terminal. To generate code you should run: `openssl rand -base64 32`
- React Hook Form usage with UI component needs to has `ref={null}` property to avoid ref warning:
  - [Stackoverflow](https://stackoverflow.com/questions/67877887/react-hook-form-v7-function-components-cannot-be-given-refs-attempts-to-access)
  - [GitHub](https://github.com/react-hook-form/react-hook-form/issues/3411)
- Loading screen approaches (Fetch-than-render, Render-as-you-fetch, Suspense, ):
  - [Medium.com](https://medium.com/jspoint/introduction-to-react-v18-suspense-and-render-as-you-fetch-approach-1b259551a4c0)
  - [Linkedin.com](https://www.linkedin.com/pulse/fetch-then-render-render-as-you-fetch-fetch-on-render-amit-pal/)

### Dependencies

- [React](https://react.dev/)
- [React DOM](https://www.npmjs.com/package/react-dom)
- [React Icons](https://www.npmjs.com/package/react-icons)
- [Lucide](https://lucide.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Next Auth](https://next-auth.js.org/)
- [Next Theme](https://www.npmjs.com/package/next-themes)
- [Prisma](https://www.prisma.io/)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [React Hook Form](https://react-hook-form.com/)
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)
- [Zod](https://zod.dev/)
- [Sonner toaster](https://sonner.emilkowal.ski/)
- [shadcn ui](https://ui.shadcn.com/)

### Layout

![layout picture](https://github.com/ev0clu/next-blog/blob/main/layout.png?raw=true)

### Assets

[Home page picture from Flo Dahm on Pexels](https://www.pexels.com/photo/dinnerware-on-table-541216/)<br>
[About page picture from Mat Brown on Pexels](https://www.pexels.com/photo/close-up-photo-of-dinnerware-set-on-top-of-table-with-glass-cups-1395967/)<br>
[Contact page picture from Igor Starkov on Pexels](https://www.pexels.com/photo/two-green-potted-plants-791810/)<br>
