export const dynamic = 'force-static'
 
export async function GET() {
  const data = {
    name: "name",
    age: "28"
  }
 
  return Response.json({ data })
}