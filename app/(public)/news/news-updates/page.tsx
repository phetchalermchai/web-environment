import { newsData } from "@/config/newConfig"
import News from "@/features/users/components/News/News"

const page = () => {

  return (
    <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={3} showPagination={true} showViewAll={false} showBreadcrumbs={true} cardType={"type1"}/>
  )
}

export default page