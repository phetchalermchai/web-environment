"use client"

import ManagementPage from "@/features/admin/components/BannerManagement/ManagementPage"

const page = () => {
  return (
    <ManagementPage getsApi="/api/banner/image" createLink="/admin/banner/image/create" editLink="/admin/banner/image/edit/" deleteApi="/api/banner/image/delete/"/>
  )
}

export default page