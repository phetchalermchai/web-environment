import AvatarCard from "./AvatarCard";

type AvatarGridProps = {
  personnel: Array<{
    level: number;
    image: string;
    name: string;
    position: string;
  }>;
  level: number; // ระดับที่ต้องการแสดงผล
  columns?: string; // รูปแบบ grid column เช่น "grid-cols-1"
};

const AvatarGrid = ({ personnel, level, columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }: AvatarGridProps) => {
  return (
    <div className={`py-10 grid ${columns} gap-5`}>
      {personnel
        .filter((person) => person.level === level) // กรองเฉพาะระดับที่ต้องการ
        .map((person, index) => (
            <AvatarCard
            key={index}
            image={person.image}
            name={person.name}
            position={person.position}
            colSpan={level === 1 ? "col-span-4" : "col-span-1"} // ระดับ 1 ใช้ col-span-4
          />
        ))}
    </div>
  );
};

export default AvatarGrid;
