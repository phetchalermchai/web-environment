import { activitiesData } from "@/config/newConfig"
import News from "@/features/users/components/News/News"

const page = () => {

  return (
    <News newsData={activitiesData} title="กิจกรรมของสำนัก" itemsPerPage={3} showPagination={true} showViewAll={false} showBreadcrumbs={true} cardType="type2"/>
  )
}

export default page