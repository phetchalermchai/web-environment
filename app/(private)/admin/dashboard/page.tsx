"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/activities`);
        // สมมติว่า res.data เป็น array ของ activity objects
        setData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h1>รายการกิจกรรม</h1>

      {loading && <p>กำลังโหลดข้อมูล...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && data.length === 0 && <p>ไม่พบข้อมูลกิจกรรม</p>}

      {data.length > 0 && (
        <ul>
          {data.map((activity) => {
            let htmlContent = "";
            if (activity.description) {
              // ถ้า description เป็น string (HTML) ให้ใช้ค่าโดยตรง
              if (typeof activity.description === "string") {
                htmlContent = activity.description;
              }
              // แต่ถ้า description เป็น object ที่มี .ops (Quill Delta) ให้แปลงเป็น HTML
              else if (activity.description.ops) {
                const converter = new QuillDeltaToHtmlConverter(
                  activity.description.ops,
                  {}
                );
                htmlContent = converter.convert();
              }
            }

            return (
              <li key={activity.id}>
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Page;
