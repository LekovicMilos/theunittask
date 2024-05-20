# theunittask

Technical task for The unit interview process built by Milos Lekovic

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Add .env.local file with content: NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Production url: https://theunittask.vercel.app/

## Features

- Fetching external API https://www.csscolorsapi.com/api/colors for retrieving colors
- Using Tailwind CSS for styling
- Using shadcn component library
- Using redux for state management (adding and deleting colors)
- Listing colors in the table, adding, deleting, filtering and sorting colors
- Color details dialog
- Validation while adding colors using zod
- Responsive design
- Using Eslint and Prettier for code quality and consistency
- Using @heroicons/react for icons
- Using react-hook-form for forms
- Client-side pagination
- Unit testing functionality
