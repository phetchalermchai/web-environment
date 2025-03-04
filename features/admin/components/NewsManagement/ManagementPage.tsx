import CreateButton from "./CreateButton"
import SearchBar from "./SearchBar"
import SortDropdown from "./SortDropdown"
import Table from "./Table"
import { useState, useEffect, useMemo } from 'react';
import axios from "axios";

interface Activity {
    id: string;
    title: string;
    author: {
        firstname: string,
        lastname: string,
        department: string
    };
    description?: string;
    createdAt: string;
    updatedAt: string;
}

const ManagementPage = () => {

    // กำหนด type ให้กับ state variables
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sort, setSort] = useState<string>("ชื่อกิจกรรม");

    useEffect(() => {
        const loadActivities = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(`/api/activities`);
                const activitiesWithDate = data.map((a: any) => ({
                    ...a,
                    createdAt: a.createdAt && !isNaN(Date.parse(a.createdAt)) ? new Date(a.createdAt) : null,
                    updatedAt: a.updatedAt && !isNaN(Date.parse(a.updatedAt)) ? new Date(a.updatedAt) : null,
                }));
                console.log("API Response:", data);
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
            case "ชื่อกิจกรรม":
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
            <div className="p-5 sm:p-6 lg:p-7 xl:p-10 flex flex-col h-[calc(100vh-66px)]">
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
                <Table activities={sortedFilteredActivities} sort={sort} />
            </div>
        </div>
    )
}

export default ManagementPage