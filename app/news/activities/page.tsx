import News from "@/components/News/News"
import { activitiesData } from "@/config/newConfig"
activitiesData

const page = () => {

  return (
    <News newsData={activitiesData} title="กิจกรรมของสำนัก" itemsPerPage={3} showPagination={true} showViewAll={false} showBreadcrumbs={true}/>
  )
}

export default page