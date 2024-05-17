'use client';

import React  from 'react';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl">About</h1>
        <h2 className="mb-4 text-lg">
          Technical task for The unit interview process built by Milos Lekovic
        </h2>
        <ul></ul>
        <li>Fetching external API https://www.csscolorsapi.com/api/colors for retrieving colors</li>
        <li>Using Tailwind CSS for styling</li>
        <li>Using shadcn component library</li>
        <li>Using redux for state management (adding and deleting colors)</li>
        <li>Listing colors in the table, adding, deleting and filtering colors</li>
        <li>Validation while adding colors using zod</li>
        <li>Responsive design</li>
        <li>Using Eslint and Prettier for code quality and consistency</li>
        <li>Using @heroicons/react for icons</li>
        <li>Using react-hook-form for forms</li>
      </div>
    </main>
  );
}
