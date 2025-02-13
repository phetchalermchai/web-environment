import CreateButton from "./CreateButton"
import SearchBar from "./SearchBar"
import SortDropdown from "./SortDropdown"
import Table from "./Table"
import { useState, useEffect } from 'react';
import { getUsers, type User } from '@/features/admin/server/usersAction';

const ManagementPage = () => {

    // กำหนด type ให้กับ state variables
    const [users, setUsers] = useState<User[]>([]); // users เป็น array ของ User interface
    const [loading, setLoading] = useState<boolean>(true); // loading เป็น boolean
    const [error, setError] = useState<Error | null>(null); // error เป็น Error object หรือ null
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // ฟังก์ชันรับ query จาก SearchBar
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

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

    // ใช้ useEffect เพื่อ filter ข้อมูลตาม searchQuery เมื่อ users หรือ searchQuery เปลี่ยนแปลง
    useEffect(() => {
        const filtered = users.filter((user) => {
            return (
                user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredUsers(filtered);
    }, [users, searchQuery]);

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
                    <SortDropdown />
                </div>
                <CreateButton />
            </div>
            <div className="overflow-x-auto mt-6 grow">
                <Table users={filteredUsers} />
            </div>
        </div>
    )
}

export default ManagementPage