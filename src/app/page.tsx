import React from 'react';
import { DataTable } from '@/components/organisms/table/data-table';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function Home() {
  
  async function getColors() {
    const response = await fetch(`${apiBaseUrl}/api/colors`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { colors } = await response.json();
    return colors;
  }
  const colors = await getColors();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
      <div className="z-10 w-full max-w-5xl flex-col items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full">
          <DataTable data={colors} />
        </div>
      </div>
    </main>
  );
}
