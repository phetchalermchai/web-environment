import Breadcrumbs from "@/components/Breadcrumbs"
import ContactList from "@/components/Contact/ContactList";
import MapDetails from "@/components/Contact/MapDetails";
import Divider from "@/components/Divider";

const page = () => {

  const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "ติดต่อเรา", isCurrent: true },
  ];

  return (
    <div className="px-10 py-5 xl:px-20 xl:py-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="my-3">
        <h1 className="text-2xl sm:text-3xl font-bold">ติดต่อเรา</h1>
        <Divider />
        <div className="flex flex-col md:flex-row gap-10 pt-3 lg:pt-5">
          <div className="flex w-full md:w-1/2 flex-col gap-4">
            <ContactList />
          </div>
          <div className="flex w-full md:w-1/2 flex-col">
            <MapDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page