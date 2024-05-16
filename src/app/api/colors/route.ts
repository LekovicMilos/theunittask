export async function GET(request: Request) {
  const res = await fetch(`https://www.csscolorsapi.com/api/colors`, {
    method: 'GET',
  });
  const colors = await res.json();

  let simplifiedColors = [];
  if (colors && Array.isArray(colors)) {
    simplifiedColors = colors.map((color: any) => ({
      name: color.name,
      hex: color.hex,
    }));
  } else {
    simplifiedColors = colors;
  }

  return Response.json(simplifiedColors);
}
