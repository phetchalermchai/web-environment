"use client"

import { getUsers} from '@/features/admin/server/usersAction'; // สมมติว่า usersAction.js ถูกเปลี่ยนเป็น usersAction.ts และ export getUsers เป็น function
import { useState, useEffect } from 'react';

// Define interface หรือ type สำหรับ User object
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string; // password อาจจะไม่ถูกส่งกลับมาใน response เสมอไป หรือขึ้นอยู่กับการ query ของคุณ
  department: string | null; // Nullable department
  role: 'USER' | 'ADMIN' | 'SUPERADMIN'; // Role enum (ตาม schema ของคุณ)
  avatar: string | null; // Nullable avatar URL
  createdAt: Date;
  updatedAt: Date;
  Post?: any[]; // Assuming Post is a relation, you might not need to include it when fetching user list
}

const UsersPage = () => {
  // กำหนด type ให้กับ state variables
  const [users, setUsers] = useState<User[]>([]); // users เป็น array ของ User interface
  const [loading, setLoading] = useState<boolean>(true); // loading เป็น boolean
  const [error, setError] = useState<Error | null>(null); // error เป็น Error object หรือ null

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // getUsers() ควรจะถูก type ใน usersAction.ts ให้ return Promise<User[]>
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers); // fetchedUsers ถูก type ให้เป็น User[] แล้ว
        setLoading(false);
      } catch (error: any) { // กำหนด type ให้ error เป็น any หรือ Error ก็ได้ แล้วแต่กรณี
        console.error("Fetching users failed:", error);
        if (error instanceof Error) { // ตรวจสอบว่าเป็น instance ของ Error เพื่อความปลอดภัยในการเข้าถึง message
          setError(error);
        } else {
          setError(new Error("An unexpected error occurred")); // กรณี error ไม่ใช่ instance ของ Error
        }
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users Page (Using Server Actions)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstname} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;