"use client"

import axios from "axios"
import { useEffect, useState } from "react"

const page = () => {

  const [data, setData] = useState<any[]>([]); // เก็บข้อมูลผู้ใช้
  const [loading, setLoading] = useState(true); // สถานะโหลดข้อมูล
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true); // เริ่มโหลดข้อมูล
        const res = await axios.get(`/api/superuser/get-users`);
        setData(res.data); // บันทึกข้อมูลผู้ใช้
      } catch (err: any) {
        // จัดการข้อผิดพลาด
        setError(err.response?.data?.error || "Error fetching user data");
      } finally {
        setLoading(false); // หยุดสถานะโหลด
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
    <h1>รายชื่อผู้ใช้</h1>

    {/* แสดงสถานะโหลดข้อมูล */}
    {loading && <p>กำลังโหลดข้อมูล...</p>}

    {/* แสดงข้อความข้อผิดพลาดถ้ามี */}
    {error && <p style={{ color: "red" }}>{error}</p>}

    {/* แสดงข้อมูลผู้ใช้ถ้ามี */}
    {data.length > 0 && (
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.firstname} {user.lastname} - {user.email} ({user.role})
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default page