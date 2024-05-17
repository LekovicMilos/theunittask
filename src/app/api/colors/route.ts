import { Color } from '@/components/organisms/data-table';

export async function GET(request: Request) {
  console.log(request);
  const res = await fetch(`https://www.csscolorsapi.com/api/colors`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const colors = await res.json();

  let simplifiedColors = [];
  if (colors && Array.isArray(colors)) {
    simplifiedColors = colors.map((color: Color) => ({
      name: color.name,
      hex: color.hex,
    }));
  } else {
    simplifiedColors = colors;
  }

  return Response.json(simplifiedColors);
}
