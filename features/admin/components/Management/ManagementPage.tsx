"use client"

import CreateButton from "./CreateButton"
import SearchBar from "./SearchBar"
import SortDropdown from "./SortDropdown"
import Table from "./Table"
import { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import Image from "next/image"
import Link from "next/link";
import { DataItem, PersonnelItems, NewsItems, E_ServiceItems } from "@/types/userTypes";

const ManagementPage = ({ getsApi, createLink, editLink, deleteApi }: { getsApi: string, createLink: string, editLink: string, deleteApi: string }) => {

    // กำหนด type ให้กับ state variables
    const [dataItems, setDataItems] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sort, setSort] = useState<string>("ชื่อ-นามสกุล");
    const [itemType, setItemType] = useState<"Personnel" | "NewsItems" | "E_Service" | null>(null);

    function getItemType(item: DataItem): "Personnel" | "NewsItems" | "E_Service" {
        if ("firstName" in item) {
            return "Personnel";
        } else if ("author" in item) {
            return "NewsItems";
        } else if ("linkURL" in item) {
            return "E_Service";
        }
        throw new Error("Unknown item type");
    }

    useEffect(() => {
        const loadDataItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(getsApi);
                const dataItemsWithDate = data.map((a: any) => ({
                    ...a,
                    createdAt: a.createdAt && !isNaN(Date.parse(a.createdAt)) ? new Date(a.createdAt) : null,
                    updatedAt: a.updatedAt && !isNaN(Date.parse(a.updatedAt)) ? new Date(a.updatedAt) : null,
                }));
                setDataItems(dataItemsWithDate);

                if (dataItemsWithDate.length > 0) {
                    setItemType(getItemType(dataItemsWithDate[0]));
                    if (getItemType(dataItemsWithDate[0]) === "Personnel") {
                        setSort("ชื่อ-นามสกุล");
                    }
                    if (getItemType(dataItemsWithDate[0]) === "NewsItems") {
                        setSort("ชื่อข่าวสาร");
                    }
                    if (getItemType(dataItemsWithDate[0]) === "E_Service") {
                        setSort("ชื่อบริการ");
                    }
                }


            } catch (error) {
                console.error(error);
                setError(new Error(axios.isAxiosError(error) ? error.response?.data?.message || "Failed to fetch data" : "An unexpected error occurred"));
            } finally {
                setLoading(false);
            }
        };

        loadDataItems();
    }, [getsApi]);

    // สมมุติว่าเรามี configuration สำหรับแต่ละประเภท
    const filterConfig: { [key: string]: string[] } = {
        Personnel: ["firstName", "lastName", "position", "positionName", "department"],
        NewsItems: ["title", "author.firstname", "author.department"],
        E_Service: ["title", "linkURL"]
    };

    const getNestedValue = (obj: any, key: string): string => {
        return key.split(".").reduce((o, k) => (o ? o[k] : ""), obj) || "";
    };

    // ใช้ useEffect เพื่อ filter ข้อมูลตาม searchQuery เมื่อ users หรือ searchQuery เปลี่ยนแปลง
    const filteredDataItems = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return dataItems.filter((item) => {
            const itemType = getItemType(item); // ตรวจสอบประเภทของ item
            const fields = filterConfig[itemType] || [];
            return fields.some((field) => {
                const fieldValue = getNestedValue(item, field).toString().toLowerCase();
                return fieldValue.includes(query);
            });
        });
    }, [dataItems, searchQuery]);

    const sortingConfig: {
        [key in "Personnel" | "NewsItems" | "E_Service"]: {
            [option: string]: (a: DataItem, b: DataItem) => number;
        };
    } = {
        Personnel: {
            "ชื่อ-นามสกุล": (a, b) => {
                // สมมุติให้รวม firstName กับ lastName
                const nameA = (a as PersonnelItems).firstName + " " + (a as PersonnelItems).lastName;
                const nameB = (b as PersonnelItems).firstName + " " + (b as PersonnelItems).lastName;
                return nameA.localeCompare(nameB);
            },
            "ตำแหน่ง": (a, b) =>
                (a as PersonnelItems).position.localeCompare((b as PersonnelItems).position),
            "ชื่อตำแหน่ง": (a, b) =>
                (a as PersonnelItems).positionName.localeCompare((b as PersonnelItems).positionName),
            "ส่วนงาน": (a, b) =>
                (a as PersonnelItems).department.localeCompare((b as PersonnelItems).department),
            "วันที่สร้าง": (a, b) =>
                new Date((a as PersonnelItems).createdAt).getTime() - new Date((b as PersonnelItems).createdAt).getTime(),
            "วันที่อัปเดต": (a, b) =>
                new Date((a as PersonnelItems).updatedAt).getTime() - new Date((b as PersonnelItems).updatedAt).getTime(),
        },
        NewsItems: {
            "ชื่อข่าวสาร": (a, b) =>
                (a as NewsItems).title.localeCompare((b as NewsItems).title),
            "ผู้เขียน": (a, b) =>
                (a as NewsItems).author.firstname.localeCompare((b as NewsItems).author.firstname),
            "ส่วนงาน": (a, b) =>
                (a as NewsItems).author.department.localeCompare((b as NewsItems).author.department),
            "วันที่สร้าง": (a, b) =>
                new Date((a as NewsItems).createdAt).getTime() - new Date((b as NewsItems).createdAt).getTime(),
            "วันที่อัปเดต": (a, b) =>
                new Date((a as NewsItems).updatedAt).getTime() - new Date((b as NewsItems).updatedAt).getTime(),
        },
        E_Service: {
            "ชื่อบริการ": (a, b) =>
                (a as E_ServiceItems).title.localeCompare((b as E_ServiceItems).title),
            "วันที่สร้าง": (a, b) =>
                new Date((a as E_ServiceItems).createdAt).getTime() - new Date((b as E_ServiceItems).createdAt).getTime(),
            "วันที่อัปเดต": (a, b) =>
                new Date((a as E_ServiceItems).updatedAt).getTime() - new Date((b as E_ServiceItems).updatedAt).getTime(),
        },
    };


    // ฟังก์ชันเรียงลำดับข้อมูลผู้ใช้งานตามตัวเลือก
    const sortedFilteredDataItems = useMemo(() => {
        const sorted = [...filteredDataItems];
        if (sorted.length === 0) return sorted;
        const type = getItemType(sorted[0]);
        const comparator = sortingConfig[type][sort];
        if (comparator) {
            sorted.sort(comparator);
        } else {
            // เรียงตาม createdAt เป็นค่า default
            sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }
        return sorted;
    }, [filteredDataItems, sort]);


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
                    <SortDropdown onSort={handleSort} itemType={itemType} />
                </div>
                <CreateButton createLink={createLink} itemType={itemType} />
            </div>
            <div className="overflow-x-auto mt-6 grow">
                <Table dataItem={sortedFilteredDataItems} ItemType={itemType} sort={sort} editLink={editLink} deleteApi={deleteApi} />
            </div>
        </div>
    )
}

export default ManagementPage