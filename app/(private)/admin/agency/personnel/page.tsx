"use client"
import ManagementPage from "@/features/admin/components/Management/ManagementPage"

const page = () => {
  return (
    <ManagementPage getsApi="/api/agency/personnel" createLink="/admin/agency/personnel/create" editLink="/admin/agency/personnel/edit/" deleteApi="/api/agency/personnel/delete/" />
  )
}

export default page 