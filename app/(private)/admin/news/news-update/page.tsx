"use client"
import ManagementPage from "@/features/admin/components/NewsManagement/ManagementPage"

const page = () => {
  return (
    <ManagementPage getsApi="/api/news" createLink="/admin/news/news-update/create" editLink="/admin/news/news-update/edit/" deleteApi="/api/activities/delete/"/>
  )
}

export default page