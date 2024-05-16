import { DataTable } from '@/components/organisms/data-table';

export default async function Home() {
  async function getColors() {
    const response = await fetch('http://localhost:3000/api/colors', {
      method: 'GET',
    });
    const { colors } = await response?.json();
    return colors.colors;
  }
  const colors = await getColors();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl flex-col items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full">
          <DataTable data={colors} />
        </div>
      </div>
    </main>
  );
}
