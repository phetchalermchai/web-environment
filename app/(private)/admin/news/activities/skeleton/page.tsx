import NewsCreate from "@/features/admin/components/NewsForm/Create/NewsCreate"

const page = () => {
  return (
    <NewsCreate
        type="activity"
        apiEndpoint="/api/activities/create"
        redirectPath="/admin/news/activities"
      />
  )
}

export default page