export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await fetch(`https://www.csscolorsapi.com/api/colors`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
  });
  const colors = await res.json();

  const simplifiedColors = colors?.map((color: any) => ({
    name: color.name,
    hex: color.hex,
  }));

  return Response.json({ colors: simplifiedColors });
}
