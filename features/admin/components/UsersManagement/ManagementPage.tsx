import CreateButton from "./CreateButton"
import SearchBar from "./SearchBar"
import SortDropdown from "./SortDropdown"
import Table from "./Table"
import { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import { User } from "@/types/userTypes";
import Image from "next/image"
import Link from "next/link";

const ManagementPage = () => {

    // กำหนด type ให้กับ state variables
    const [users, setUsers] = useState<User[]>([]); // users เป็น array ของ User interface
    const [loading, setLoading] = useState<boolean>(true); // loading เป็น boolean
    const [error, setError] = useState<Error | null>(null); // error เป็น Error object หรือ null
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sort, setSort] = useState<string>("Email")

    // ฟังก์ชันรับ query จาก SearchBar
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(`/api/superuser/get-users`);
                const usersWithDate = data.map((user: any) => ({
                    ...user,
                    createdAt: new Date(user.createdAt),
                    updatedAt: new Date(user.updatedAt),
                }));

                // เรียงลำดับอีเมลก่อนตั้งค่า users
                usersWithDate.sort((a: { email: string; }, b: { email: string; }) => a.email.localeCompare(b.email));

                setUsers(usersWithDate);
            } catch (error) {
                setError(new Error(axios.isAxiosError(error) ? error.response?.data?.message || "Failed to fetch users" : "An unexpected error occurred"));
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // ใช้ useEffect เพื่อ filter ข้อมูลตาม searchQuery เมื่อ users หรือ searchQuery เปลี่ยนแปลง
    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            (user.firstname?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
            (user.lastname?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
            (user.email?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    // ฟังก์ชันเรียงลำดับข้อมูลผู้ใช้งานตามตัวเลือก
    const sortedFilteredUsers = useMemo(() => {
        let sorted = [...filteredUsers];

        switch (sort) {
            case "Email":
                sorted.sort((a, b) => a.email.localeCompare(b.email));
                break;
            case "Department":
                sorted.sort((a, b) => (a.department || "").localeCompare(b.department || ""));
                break;
            case "Created":
                sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case "Updated":
                sorted.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
                break;
        }

        return sorted;
    }, [filteredUsers, sort]);

    const handleSort = (option: string) => {
        setSort(option);
    };

    if (loading) {
        return (
            <div className="m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 flex flex-col h-[calc(100vh-106px)] bg-base-100 rounded-lg shadow">
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <div className="skeleton h-8 lg:h-12 w-[154px] md:w-[201px] lg:w-[296px] rounded-lg"></div>
                        <div className="skeleton h-8 lg:h-12 w-[105px] lg:w-[168px] rounded-lg m-1 md:mx-3"></div>
                    </div>
                    <div className="skeleton h-8 lg:h-12 w-[38px] lg:w-[117px] rounded-lg"></div>
                </div>
                <div className="overflow-x-auto mt-6 grow">
                    <div className="skeleton h-full w-full"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-66px)]">
                <div className="text-center p-6 bg-base-100 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-error mb-4">Error</h1>
                    <p className="text-lg mb-4">เกิดข้อผิดพลาด: {error.message}</p>
                    <Image src={`/undraw_not-found_6bgl.svg`} alt="Error เกิดข้อผิดพลาด" width={300} height={300} />
                    <Link href={`/admin/dashboard`} className="btn btn-primary my-4">ไปยังหน้าแดชบอร์ด</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 flex flex-col h-[calc(100vh-106px)] bg-base-100 rounded-lg shadow">
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <SearchBar onSearch={handleSearch} />
                    <SortDropdown onSort={handleSort} />
                </div>
                <CreateButton />
            </div>
            <div className="overflow-x-auto mt-6 grow">
                <Table users={sortedFilteredUsers} sort={sort} />
            </div>
        </div>
    )
}

export default ManagementPage