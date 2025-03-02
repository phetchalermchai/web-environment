import CreateButton from "./CreateButton"
import SearchBar from "./SearchBar"
import SortDropdown from "./SortDropdown"
import Table from "./Table"
import { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import { User } from "@/types/userTypes";

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
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-5 sm:p-6 lg:p-7 xl:p-10 flex flex-col h-[calc(100vh-66px)]">
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