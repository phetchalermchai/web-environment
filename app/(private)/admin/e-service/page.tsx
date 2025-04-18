import ManagementPage from "@/features/admin/components/Management/ManagementPage"

const page = () => {
  return (
        // <ManagementPage getsApi="/api/agency/personnel" createLink="/admin/agency/personnel/create" editLink="/admin/agency/personnel/edit/" deleteApi="/api/agency/personnel/delete/"/>
        // <ManagementPage getsApi="/api/news" createLink="/admin/news/news-update/create" editLink="/admin/news/news-update/edit/" deleteApi="/api/news/delete/"/>
        // <ManagementPage getsApi="/api/activities" createLink="/admin/news/activities/create" editLink="/admin/news/activities/edit/" deleteApi="/api/activities/delete/"/>
        <ManagementPage getsApi="/api/eservice" createLink="/admin/e-service/create" editLink="/admin/e-service/edit/" deleteApi="/api/eservice/delete/"/>
        // <ManagementPage getsApi="/api/superuser/get-users" createLink="/admin/users/create" editLink="/admin/users/edit/" deleteApi="/api/superuser/delete-user/"/>
  )
}

export default page