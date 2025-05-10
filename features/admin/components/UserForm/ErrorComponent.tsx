import Image from "next/image";
import Link from "next/link";

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-66px)]">
      <div className="text-center p-6 bg-base-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-error mb-4">Error</h1>
        <p className="text-lg mb-4">เกิดข้อผิดพลาด: {message}</p>
        <Image src="/undraw_not-found_6bgl.svg" alt="Error เกิดข้อผิดพลาด" width={300} height={300} />
        <Link href="/admin/dashboard" className="btn btn-primary my-4">
          ไปยังหน้าแดชบอร์ด
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
