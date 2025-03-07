"use client"
import ManagementPage from "@/features/admin/components/NewsManagement/ManagementPage"

const page = () => {
  return (
    <ManagementPage getsApi="/api/activities" createLink="/admin/news/news-update/create" editLink="/admin/news/activities/edit/" deleteApi="/api/activities/delete/"/>
  )
}

export default page