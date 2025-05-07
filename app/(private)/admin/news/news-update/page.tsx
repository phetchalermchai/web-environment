"use client"
import ManagementPage from "@/features/admin/components/Management/ManagementPage"

const page = () => {
  return (
    <ManagementPage getsApi="/api/news" createLink="/admin/news/news-update/create" editLink="/admin/news/news-update/edit/" deleteApi="/api/news/delete/"/>
  )
}

export default page