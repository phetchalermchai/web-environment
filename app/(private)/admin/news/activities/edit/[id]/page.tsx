import NewsEdit from "@/features/admin/components/NewsForm/Edit/NewsEdit"

const page = () => {
  return (
    <NewsEdit
      type="activity"
      apiFetchBase="/api/activities"
      apiUpdateBase="/api/activities/edit"
      redirectPath="/admin/news/activities"
    />
  )
}

export default page
