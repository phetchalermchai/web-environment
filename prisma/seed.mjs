import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ก-๙\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function main() {
  // ---------- 0) ENV ----------
  const email = process.env.SEED_SUPERUSER_EMAIL ?? 'env.health.nakornnont@gmail.com';
  const rawPassword =
    process.env.SEED_SUPERUSER_PASSWORD ??
    (() => { throw new Error('Missing SEED_SUPERUSER_PASSWORD in .env'); })();
  const rounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 12);

  // ---------- 1) SUPERUSER ----------
  const passwordHash = await bcrypt.hash(rawPassword, rounds);
  const superUser = await prisma.user.upsert({
    where: { email },
    update: {
      firstname: 'Env',
      lastname: 'Nakornnont',
      department: 'ผู้ดูแลระบบสูงสุด',
      role: Role.SUPERUSER,
      password: passwordHash,
      avatar: null,
    },
    create: {
      firstname: 'Env',
      lastname: 'Nakornnont',
      email,
      password: passwordHash,
      department: 'ผู้ดูแลระบบสูงสุด',
      role: Role.SUPERUSER,
      avatar: null,
    },
  });

  // ---------- 2) ACTIVITY (use upsert by slug) ----------
  const activities = [
    {
      title: 'กิจกรรมรณรงค์สุขภาพชุมชน',
      content: {
        ops: [
          { insert: 'สรุปกิจกรรมร่วมกับ อสม. ในเขตนครนนท์\n' },
          { insert: 'ประเด็น: ', attributes: { bold: true } },
          { insert: 'คัดกรองเบาหวาน ความดัน, ให้ความรู้โภชนาการ\n' },
        ],
      },
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
      },
      image: 'https://picsum.photos/seed/activity2/1200/630',
    },
    {
      title: 'อบรมความปลอดภัยอาหารในโรงเรียน',
      content: {
        ops: [
          { insert: 'ร่วมอบรมกับครูและแม่ครัว 8 โรงเรียน\n' },
          { insert: 'หัวข้อ: GMP เบื้องต้น และการเก็บตัวอย่าง\n' },
        ],
      },
      image: 'https://picsum.photos/seed/activity3/1200/630',
    },
  ];

  for (const a of activities) {
    const slug = slugify(a.title);
    await prisma.activity.upsert({
      where: { slug },
      update: {
        title: a.title,
        content: a.content,
        image: a.image,
        authorId: superUser.id,
      },
      create: {
        title: a.title,
        slug,
        content: a.content,
        image: a.image,
        authorId: superUser.id,
      },
    });
  }

  // ---------- 3) NEWS (upsert by slug) ----------
  const newsList = [
    {
      title: 'ประกาศหยุดทำการชั่วคราว',
      description: 'ประกาศหยุดทำการเนื่องในวันหยุดราชการ',
      content: {
        ops: [
          { insert: 'หน่วยงานจะหยุดทำการในวันที่ 12 สิงหาคม\n' },
          { insert: 'ขออภัยในความไม่สะดวก\n' },
        ],
      },
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
      },
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
      },
      image: 'https://picsum.photos/seed/news3/1200/630',
    },
  ];

  for (const n of newsList) {
    const slug = slugify(n.title);
    await prisma.news.upsert({
      where: { slug },
      update: {
        title: n.title,
        description: n.description,
        content: n.content,
        image: n.image,
        authorId: superUser.id,
      },
      create: {
        title: n.title,
        slug,
        description: n.description,
        content: n.content,
        image: n.image,
        authorId: superUser.id,
      },
    });
  }

  // ---------- 4) AGENCY PERSONNEL (เลือก key ที่ unique) ----------
  const personnels = [
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
  ];

  // แนะนำให้ตั้ง unique index เช่น @@unique([firstName, lastName, positionName])
  for (const p of personnels) {
    await prisma.agencyPersonnel.upsert({
      where: {
        // ปรับให้ตรงกับ unique ของคุณ
        firstName_lastName_positionName: {
          firstName: p.firstName,
          lastName: p.lastName,
          positionName: p.positionName,
        },
      },
      update: {
        ...p,
      },
      create: {
        ...p,
      },
    });
  }

  // ---------- 5) BANNER IMAGE (upsert by title) ----------
  const bannerImages = [
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
  ];

  for (const b of bannerImages) {
    await prisma.bannerImage.upsert({
      where: { title: b.title },
      update: { ...b },
      create: { ...b },
    });
  }

  // ---------- 6) BANNER VIDEO (upsert by title) ----------
  const bannerVideos = [
    {
      title: 'รณรงค์ออกกำลังกาย 10 นาที',
      videoMobile: 'https://example.com/video/mobile-10min.mp4',
      videoDesktop: 'https://example.com/video/desktop-10min.mp4',
      isActive: true,
      sortOrder: 1,
    },
  ];

  for (const v of bannerVideos) {
    await prisma.bannerVideo.upsert({
      where: { title: v.title },
      update: { ...v },
      create: { ...v },
    });
  }

  // ---------- 7) E-SERVICE (upsert by title) ----------
  const eServices = [
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
  ];

  for (const s of eServices) {
    await prisma.eService.upsert({
      where: { title: s.title },
      update: { ...s },
      create: { ...s },
    });
  }

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
