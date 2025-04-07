import ManagementPage from "@/features/admin/components/Management/ManagementPage"

const page = () => {
  return (
        // <ManagementPage getsApi="/api/agency/personnel" createLink="/admin/agency/personnel/create" editLink="/admin/agency/personnel/edit/" deleteApi="/api/agency/personnel/delete/"/>
        // <ManagementPage getsApi="/api/news" createLink="/admin/news/news-update/create" editLink="/admin/news/news-update/edit/" deleteApi="/api/activities/delete/"/>
        <ManagementPage getsApi="/api/eservice" createLink="/admin/eservice/create" editLink="/admin/eservice/edit/" deleteApi="/api/eservice/delete/"/>
  )
}

export default page