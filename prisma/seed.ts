import { PrismaClient, Role, Prisma } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9ก-๙\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function main() {
  // -------------------------
  // 1) Seed User (SUPERUSER)
  // -------------------------
  const rawPassword = 'Nakornnont025890500.1202@';
  const passwordHash = await bcrypt.hash(rawPassword, 12);

  const superUser = await prisma.user.upsert({
    where: { email: 'env.health.nakornnont@gmail.com' },
    update: {
      firstname: 'Env',
      lastname: 'Nakornnont',
      department: 'ผู้ดูแลระบบสูงสุด',
      role: Role.SUPERUSER,
      password: passwordHash,
      avatar: null,
    },
    create: {
      // NOTE: id เป็น autoincrement; ไม่ต้องกำหนดก็ได้
      firstname: 'Env',
      lastname: 'Nakornnont',
      email: 'env.health.nakornnont@gmail.com',
      password: passwordHash,
      department: 'ผู้ดูแลระบบสูงสุด',
      role: Role.SUPERUSER,
      avatar: null,
    },
  });

  // -------------------------
  // 2) Seed Activity
  // -------------------------
  const activities = [
    {
      title: 'กิจกรรมรณรงค์สุขภาพชุมชน',
      content: {
        ops: [
          { insert: 'สรุปกิจกรรมร่วมกับ อสม. ในเขตนครนนท์\n' },
          { insert: 'ประเด็น: ', attributes: { bold: true } },
          { insert: 'คัดกรองเบาหวาน ความดัน, ให้ความรู้โภชนาการ\n' },
        ],
      } as Prisma.JsonObject,
      image: 'https://picsum.photos/seed/activity1/1200/630',
    },
    {
      title: 'คลินิกเลิกบุหรี่เคลื่อนที่',
      content: {
        ops: [
          { insert: 'เปิดจุดให้คำปรึกษาและมอบนิโคตินแพทช์\n' },
          { insert: 'ผลลัพธ์: ', attributes: { italic: true } },
          { insert: 'ผู้เข้าร่วม 52 คน ตั้งใจเลิก 41 คน\n' },
        ],
      } as Prisma.JsonObject,
      image: 'https://picsum.photos/seed/activity2/1200/630',
    },
    {
      title: 'อบรมความปลอดภัยอาหารในโรงเรียน',
      content: {
        ops: [
          { insert: 'ร่วมอบรมกับครูและแม่ครัว 8 โรงเรียน\n' },
          { insert: 'หัวข้อ: GMP เบื้องต้น และการเก็บตัวอย่าง\n' },
        ],
      } as Prisma.JsonObject,
      image: 'https://picsum.photos/seed/activity3/1200/630',
    },
  ].map((a) => ({
    ...a,
    slug: slugify(a.title),
    authorId: superUser.id,
  }));

  await prisma.activity.createMany({
    data: activities,
    skipDuplicates: true, // กันกรณี slug ซ้ำ
  });

  // -------------------------
  // 3) Seed News
  // -------------------------
  const newsList = [
    {
      title: 'ประกาศหยุดทำการชั่วคราว',
      description: 'ประกาศหยุดทำการเนื่องในวันหยุดราชการ',
      content: {
        ops: [
          { insert: 'หน่วยงานจะหยุดทำการในวันที่ 12 สิงหาคม\n' },
          { insert: 'ขออภัยในความไม่สะดวก\n' },
        ],
      } as Prisma.JsonObject,
      image: 'https://picsum.photos/seed/news1/1200/630',
    },
    {
      title: 'รายงานสถานการณ์โรคไข้เลือดออก',
      description: 'อัปเดตอัตราป่วยและมาตรการป้องกัน',
      content: {
        ops: [
          { insert: 'แนวโน้มพบผู้ป่วยเพิ่มในบางพื้นที่\n' },
          { insert: 'ขอความร่วมมือกำจัดแหล่งเพาะพันธุ์ยุงลาย\n' },
        ],
      } as Prisma.JsonObject,
      image: 'https://picsum.photos/seed/news2/1200/630',
    },
    {
      title: 'เชิญเข้าร่วมเวทีรับฟังความคิดเห็น',
      description: 'เปิดรับข้อเสนอแนะการพัฒนาบริการสุขภาพ',
      content: {
        ops: [
          { insert: 'เวทีรับฟังความคิดเห็นประชาชน วันที่ 25 ส.ค.\n' },
          { insert: 'สถานที่: ห้องประชุมใหญ่ ชั้น 2\n' },
        ],
      } as Prisma.JsonObject,
      image: 'https://picsum.photos/seed/news3/1200/630',
    },
  ].map((n) => ({
    ...n,
    slug: slugify(n.title),
    authorId: superUser.id,
  }));

  await prisma.news.createMany({
    data: newsList,
    skipDuplicates: true,
  });

  // -------------------------
  // 4) Seed AgencyPersonnel
  // -------------------------
  await prisma.agencyPersonnel.createMany({
    data: [
      {
        nameTitle: 'นาง',
        firstName: 'ธัญญา',
        lastName: 'ธรรมมณี',
        position: 'ผอ.',
        positionName: 'ผู้อำนวยการกองสาธารณสุข',
        department: 'กองสาธารณสุข',
        image: 'https://picsum.photos/seed/person1/600/800',
      },
      {
        nameTitle: 'นาย',
        firstName: 'ปรีชา',
        lastName: 'จิตอาสา',
        position: 'จนท.',
        positionName: 'นักวิชาการสาธารณสุข',
        department: 'งานส่งเสริมสุขภาพ',
        image: 'https://picsum.photos/seed/person2/600/800',
      },
      {
        nameTitle: 'นางสาว',
        firstName: 'ชาลิสา',
        lastName: 'ใจดี',
        position: 'จนท.',
        positionName: 'เจ้าพนักงานธุรการ',
        department: 'ศูนย์บริการประชาชน',
        image: 'https://picsum.photos/seed/person3/600/800',
      },
    ],
    skipDuplicates: true,
  });

  // -------------------------
  // 5) Seed BannerImage
  // -------------------------
  await prisma.bannerImage.createMany({
    data: [
      {
        title: 'สุขภาพดีเริ่มที่บ้าน',
        imageMobile: 'https://picsum.photos/seed/banner1m/750/1334',
        imageDesktop: 'https://picsum.photos/seed/banner1d/1920/600',
        isActive: true,
        sortOrder: 1,
      },
      {
        title: 'ร่วมกำจัดลูกน้ำยุงลาย',
        imageMobile: 'https://picsum.photos/seed/banner2m/750/1334',
        imageDesktop: 'https://picsum.photos/seed/banner2d/1920/600',
        isActive: true,
        sortOrder: 2,
      },
    ],
    skipDuplicates: true,
  });

  // -------------------------
  // 6) Seed BannerVideo
  // -------------------------
  await prisma.bannerVideo.createMany({
    data: [
      {
        title: 'รณรงค์ออกกำลังกาย 10 นาที',
        videoMobile: 'https://example.com/video/mobile-10min.mp4',
        videoDesktop: 'https://example.com/video/desktop-10min.mp4',
        isActive: true,
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  // -------------------------
  // 7) Seed EService
  // -------------------------
  await prisma.eService.createMany({
    data: [
      {
        title: 'แจ้งเหตุสาธารณสุข',
        image: 'https://picsum.photos/seed/es1/400/300',
        linkURL: 'https://example.com/report',
      },
      {
        title: 'จองคิวบริการฉีดวัคซีน',
        image: 'https://picsum.photos/seed/es2/400/300',
        linkURL: 'https://example.com/vaccine',
      },
      {
        title: 'ขอคำปรึกษาสุขภาพ',
        image: 'https://picsum.photos/seed/es3/400/300',
        linkURL: 'https://example.com/consult',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
