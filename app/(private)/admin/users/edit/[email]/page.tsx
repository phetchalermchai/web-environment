
const page = async ({params}: {params: Promise<{ email: string }>}) => {
  const slug = (await params).email
  return (
    <div>page {slug}</div>
  )
}

export default page