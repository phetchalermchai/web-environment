import { useState, useEffect } from "react";
import axios from "axios";
import { DataItem } from "@/types/userTypes";

export type ItemType = "Personnel" | "User" | "NewsItems" | "ActivityItems" | "E_Service";

function getItemType(item: DataItem): "Personnel" | "User" | "NewsItems" | "ActivityItems" | "E_Service" {
  if ("firstName" in item) {
    return "Personnel";
  } else if ("role" in item) {
    return "User";
  } else if ("author" in item) {
    // ถ้ามี slug แสดงว่าเป็น ActivityItems, ไม่เช่นนั้นถือว่าเป็น NewsItems
    if ("content" in item && item.content != null) {
      return "NewsItems";
    }
    return "ActivityItems";
  } else if ("linkURL" in item) {
    return "E_Service";
  }
  throw new Error("Unknown item type");
}

export const useDataItems = (getsApi: string) => {
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [itemType, setItemType] = useState<ItemType | null>(null);
  const [sort, setSort] = useState<string>("");

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
        console.log("dataItemsWithDate", dataItemsWithDate);

        if (dataItemsWithDate.length > 0) {
          const currentItemType = getItemType(dataItemsWithDate[0]);
          setItemType(currentItemType);
          console.log("currentItemType", currentItemType);
          switch (currentItemType) {
            case "Personnel":
              setSort("ชื่อ-นามสกุล");
              break;
            case "User":
              setSort("ผู้ใช้งาน");
              break;
            case "NewsItems":
              setSort("ชื่อข่าวสาร");
              break;
            case "ActivityItems":
              setSort("ชื่อกิจกรรม");
              break;
            case "E_Service":
              setSort("ชื่อบริการ");
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.error(error);
        setError(new Error(
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Failed to fetch data"
            : "An unexpected error occurred"
        ));
      } finally {
        setLoading(false);
      }
    };

    loadDataItems();
  }, [getsApi]);


  return { dataItems, loading, error, itemType, sort, setSort, getItemType };
};
