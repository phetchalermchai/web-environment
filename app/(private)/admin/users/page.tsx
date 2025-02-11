"use client"

import { getUsers, type User } from '@/features/admin/server/usersAction'; // สมมติว่า usersAction.js ถูกเปลี่ยนเป็น usersAction.ts และ export getUsers เป็น function
import { useState, useEffect } from 'react';
import { ArrowUpDownIcon, UserplusIcon, EllipsisHorizontalIcon } from '@/config/iconConfig';

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
    <div className='p-5 sm:p-6 lg:p-7 xl:p-10 flex flex-col h-[calc(100vh-66px)]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <label className="input input-bordered input-sm lg:input-md flex items-center gap-2 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
            <input type="text" className="lg:grow w-28 md:w-auto" placeholder="Search" />
            <kbd className="kbd kbd-sm hidden lg:flex">ctrl</kbd>
            <kbd className="kbd kbd-sm hidden lg:flex">K</kbd>
          </label>
          <div className="dropdown dropdown-end sm:mx-2">
            <div tabIndex={0} role="button" className="btn btn-sm px-2 lg:btn-md btn-outline m-1">
              <span className='hidden lg:inline-flex'>Sort by: Email</span>
              <span className='flex items-center justify-center lg:hidden'><ArrowUpDownIcon />Department</span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><a>Email</a></li>
              <li><a>Department</a></li>
              <li><a>Created</a></li>
            </ul>
          </div>
        </div>
        <div>
          <button className="btn btn-sm lg:btn-md btn-primary px-2">
            <span className='hidden lg:inline-flex'>สร้างผู้ใช้งาน</span>
            <span className='inline-flex lg:hidden'><UserplusIcon /></span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mt-6 grow">
        <table className="table table-xs md:table-md">
          {/* head */}
          <thead>
            <tr>
              <th>User</th>
              <th>Department</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-circle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.firstname} {user.lastname}</div>
                        <div className="text-xs md:text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.department}</td>
                  <td>07/01/2568</td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1"><EllipsisHorizontalIcon/></div>
                      <ul tabIndex={0} className="dropdown-content card card-compact bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        {/* <li><a>แก้ไขข้อมูล</a></li> */}
                        <button className='btn btn-ghost btn-sm hover:bg-error/15  text-error '>ลบข้อมูล</button>
                        {/* <li><a className='text-error hover:bg-error/15'>ลบข้อมูล</a></li> */}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;