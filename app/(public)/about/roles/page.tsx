import RolesSection from "@/features/users/components/Roles/RolesSection"

export const metadata = {
  title: "อำนาจหน้าที่ | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
  description: "อำนาจหน้าที่ของสำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรีในการดูแล ส่งเสริม และป้องกันสุขภาพของประชาชน",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_API_URL}/about/roles`,
  },
  keywords: [
    "อำนาจหน้าที่",
    "สำนักสาธารณสุขและสิ่งแวดล้อม",
    "เทศบาล",
    "เทศบาลนครนนทบุรี",
    "หน่วยงานราชการ",
  ],
  openGraph: {
    title: "อำนาจหน้าที่ | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
    description: "ดูรายละเอียดอำนาจหน้าที่และภารกิจของหน่วยงาน",
    url: `${process.env.NEXT_PUBLIC_API_URL}/about/roles`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/โลโก้เทศบาลนครนนทบุรี.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    siteName: "สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
    type: "article",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "อำนาจหน้าที่ | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
    description: "แสดงอำนาจหน้าที่ของสำนักสาธารณสุข เทศบาลนครนนทบุรี",
    images: [`${process.env.NEXT_PUBLIC_API_URL}/โลโก้เทศบาลนครนนทบุรี.jpg`],
  },
};

const page = () => {
  return <RolesSection />
}

export default page