"use client"

import ManagementPage from "@/features/admin/components/BannerManagement/ManagementPage"

const page = () => {
  return (
    <ManagementPage management="video" getsApi="/api/banner/video" createLink="/admin/banner/video/create" editLink="/admin/banner/video/edit" deleteApi="/api/banner/video/delete"/>
  )
}

export default page