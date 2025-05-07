"use client"
import ManagementPage from "@/features/admin/components/Management/ManagementPage"

const page = () => {
  return (
    <ManagementPage getsApi="/api/activities" createLink="/admin/news/activities/create" editLink="/admin/news/activities/edit/" deleteApi="/api/activities/delete/"/>
  )
}

export default page