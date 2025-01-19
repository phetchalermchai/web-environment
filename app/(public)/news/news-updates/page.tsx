import News from "@/components/News/News"
import { newsData } from "@/config/newConfig"

const page = () => {

  return (
    <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={3} showPagination={true} showViewAll={false} showBreadcrumbs={true}/>
  )
}

export default page