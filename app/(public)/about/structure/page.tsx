import FlowChart from "@/features/users/components/Structure/FlowChart";
export const metadata = {
  title: "โครงสร้างหน่วยงาน | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
  description:
    "ข้อมูลโครงสร้างการบริหารงานของสำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี เพื่อความเข้าใจในหน้าที่และความรับผิดชอบของแต่ละส่วนงาน",
  keywords: [
    "โครงสร้างองค์กร",
    "สำนักสาธารณสุขและสิ่งแวดล้อม",
    "เทศบาลนครนนทบุรี",
    "หน่วยงาน",
    "แผนผัง",
    "ฝ่ายบริหาร",
    "ส่วนราชการ"
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_API_URL}/about/structure`,
  },
  openGraph: {
    title: "โครงสร้างหน่วยงาน | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
    description:
      "ชมภาพรวมโครงสร้างการบริหารภายในของสำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี เพื่อให้ประชาชนเข้าใจบทบาทหน้าที่ของแต่ละฝ่าย",
    url: `${process.env.NEXT_PUBLIC_API_URL}/about/structure`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/โลโก้เทศบาลนครนนทบุรี.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "th_TH",
    siteName: "สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
  },
  twitter: {
    card: "summary_large_image",
    title: "โครงสร้างหน่วยงาน | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
    description:
      "ดูโครงสร้างและหน้าที่ของแต่ละหน่วยงานในเทศบาล เพื่อความโปร่งใสและเข้าถึงง่าย",
    images: [`${process.env.NEXT_PUBLIC_API_URL}/โลโก้เทศบาลนครนนทบุรี.jpg`],
  },
};

const page = () => {
  return (
    <FlowChart />
  );
};

export default page;