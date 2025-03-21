import CreateButton from "./CreateButton"
import SearchBar from "./SearchBar"
import SortDropdown from "./SortDropdown"
import Table from "./Table"
import { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import Image from "next/image"
import Link from "next/link";

interface Activity {
    id: string;
    title: string;
    slug: string;
    author: {
        firstname: string,
        lastname: string,
        department: string
    };
    description?: string;
    createdAt: string;
    updatedAt: string;
}

const ManagementPage = ( { getsApi, createLink, editLink, deleteApi }: { getsApi:string, createLink:string, editLink:string, deleteApi:string }) => {

    // กำหนด type ให้กับ state variables
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sort, setSort] = useState<string>("ชื่อข่าวสาร");

    useEffect(() => {
        const loadActivities = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(`${getsApi}`);
                const activitiesWithDate = data.map((a: any) => ({
                    ...a,
                    createdAt: a.createdAt && !isNaN(Date.parse(a.createdAt)) ? new Date(a.createdAt) : null,
                    updatedAt: a.updatedAt && !isNaN(Date.parse(a.updatedAt)) ? new Date(a.updatedAt) : null,
                }));
                setActivities(activitiesWithDate);
            } catch (error) {
                console.log(error);
                setError(new Error(axios.isAxiosError(error) ? error.response?.data?.message || "Failed to fetch activities" : "An unexpected error occurred"));
            } finally {
                setLoading(false);
            }
        };

        loadActivities();
    }, []);

    // ใช้ useEffect เพื่อ filter ข้อมูลตาม searchQuery เมื่อ users หรือ searchQuery เปลี่ยนแปลง
    const filteredActivities = useMemo(() => {
        return activities.filter(a =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.author.firstname?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
            (a.author.department?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
        );
    }, [activities, searchQuery]);

    // ฟังก์ชันเรียงลำดับข้อมูลผู้ใช้งานตามตัวเลือก
    const sortedFilteredActivities = useMemo(() => {
        let sorted = [...filteredActivities];

        switch (sort) {
            case "ชื่อข่าวสาร":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "คำอธิบาย":
                sorted.sort((a, b) => (a.description || "").localeCompare(b.description || ""));
                break;
            case "ผู้เขียน":
                sorted.sort((a, b) => (a.author.firstname || "").localeCompare(b.author.firstname || ""));
                break;
            case "ส่วนงาน":
                sorted.sort((a, b) => (a.author.department || "").localeCompare(b.author.department || ""));
                break;
            case "วันที่สร้าง":
                sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case "วันที่อัปเดต":
                sorted.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
                break;
        }

        return sorted;
    }, [filteredActivities, sort]);

    const handleSort = (option: string) => {
        setSort(option);
    };

    // ฟังก์ชันรับ query จาก SearchBar
    const handleSearch = (query: string) => {
        setSearchQuery(query);
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
                    <Image src={`/undraw_not-found_6bgl.svg`} alt="Error เกิดข้อผิดพลาด" width={300} height={300}/>
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
                <CreateButton createLink={createLink}/>
            </div>
            <div className="overflow-x-auto mt-6 grow">
                <Table activities={sortedFilteredActivities} sort={sort} editLink={editLink} deleteApi={deleteApi}/>
            </div>
        </div>
    )
}

export default ManagementPage