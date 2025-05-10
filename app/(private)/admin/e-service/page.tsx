import ManagementPage from "@/features/admin/components/Management/ManagementPage"

const page = () => {
  return (
        <ManagementPage getsApi="/api/eservice" createLink="/admin/e-service/create" editLink="/admin/e-service/edit/" deleteApi="/api/eservice/delete/"/>
  )
}

export default page