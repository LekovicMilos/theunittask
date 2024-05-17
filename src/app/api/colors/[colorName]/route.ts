import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { colorName: string } }) {
  const res = await fetch(`https://www.csscolorsapi.com/api/colors/${params.colorName}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  const data = await res.json();
  return NextResponse.json(data);
}
