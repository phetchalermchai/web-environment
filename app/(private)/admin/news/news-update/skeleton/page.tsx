import NewsCreate from "@/features/admin/components/NewsForm/Create/NewsCreate"

const page = () => {
  return (
    <NewsCreate
        type="news"
        apiEndpoint="/api/news/create"
        redirectPath="/admin/news/news-update"
      />
  )
}

export default page