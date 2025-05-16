import ManagementSection from "@/features/users/components/Management/ManagementSection";

export const metadata = {
  title: "บุคลากรผู้บริหาร | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
  description:
    "รายชื่อและข้อมูลบุคลากรผู้บริหารของสำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี ที่รับผิดชอบงานด้านสุขภาพและสิ่งแวดล้อมของประชาชน",
  alternates: {
    canonical: "http://localhost:3000/about/executives", // เปลี่ยนเป็นโดเมนจริงเมื่อ deploy
  },
  keywords: [
    "บุคลากร",
    "ผู้บริหาร",
    "เทศบาล",
    "สาธารณสุข",
    "เทศบาลนครนนทบุรี",
    "ฝ่ายบริหาร",
  ],
  openGraph: {
    title: "บุคลากรผู้บริหาร | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
    description:
      "ทำความรู้จักกับผู้บริหารของสำนักสาธารณสุขที่ดูแลการส่งเสริมสุขภาพและพัฒนาคุณภาพชีวิตของประชาชนในเขตเทศบาล",
    url: "http://localhost:3000/about/executives",
    siteName: "เทศบาลนครนนทบุรี",
    type: "profile",
    locale: "th_TH",
  },
  twitter: {
    card: "summary",
    title: "บุคลากรผู้บริหาร | สำนักสาธารณสุขและสิ่งแวดล้อมเทศบาลนครนนทบุรี",
    description:
      "แสดงรายชื่อบุคลากรผู้บริหารของเทศบาลนครนนทบุรีและหน้าที่ความรับผิดชอบ",
  },
};

const page = () => {
  return <ManagementSection/>
}

export default page