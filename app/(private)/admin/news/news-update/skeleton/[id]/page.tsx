import NewsEdit from "@/features/admin/components/NewsForm/Edit/NewsEdit"

const page = () => {
  return (
    <NewsEdit
      type="news"
      apiFetchBase="/api/news"
      apiUpdateBase="/api/news/edit"
      redirectPath="/admin/news/news-update"
    />
  )
}

export default page