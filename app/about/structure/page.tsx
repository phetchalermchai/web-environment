"use client";

import React from "react";
import ReactFlow, { ReactFlowProvider, useReactFlow, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

// ข้อมูลโหนดทั้งหมด
const nodes: Node[] = [
  { id: "1", position: { x: 500, y: 50 }, data: { label: "สำนักสาธารณสุขและสิ่งแวดล้อม" }, type: "input" },
  { id: "2", position: { x: 300, y: 150 }, data: { label: "ส่วนส่งเสริมสาธารณสุข" } },
  { id: "3", position: { x: 150, y: 250 }, data: { label: "ฝ่ายวิชาการและการประเมินผล" } },
  { id: "4", position: { x: 50, y: 350 }, data: { label: "งานนโยบายและแผนงานสาธารณสุข" } },
  { id: "5", position: { x: 250, y: 350 }, data: { label: "งานวิชาการและบริการข้อมูล" } },
  { id: "6", position: { x: 150, y: 450 }, data: { label: "งานติดตามและประเมินผล" } },
  { id: "7", position: { x: 450, y: 250 }, data: { label: "ฝ่ายส่งเสริมสาธารณสุข" } },
  { id: "8", position: { x: 400, y: 350 }, data: { label: "งานหลักประกันสุขภาพ" } },
  { id: "9", position: { x: 500, y: 350 }, data: { label: "งานส่งเสริมคุณภาพชีวิตผู้สูงอายุ" } },
  { id: "10", position: { x: 600, y: 350 }, data: { label: "งานอาสาสมัครสาธารณสุข" } },
  { id: "11", position: { x: 700, y: 350 }, data: { label: "งานเผยแพร่และฝึกอบรมด้านสาธารณสุข" } },
  { id: "12", position: { x: 800, y: 350 }, data: { label: "งานสัตวแพทย์" } },
  { id: "13", position: { x: 900, y: 350 }, data: { label: "งานส่งเสริมสุขภาพ" } },
  { id: "14", position: { x: 1000, y: 350 }, data: { label: "งานป้องกันและควบคุมโรค" } },
  { id: "15", position: { x: 300, y: 150 }, data: { label: "ส่วนบริการอนามัยสิ่งแวดล้อม" } },
  { id: "16", position: { x: 200, y: 250 }, data: { label: "ฝ่ายจัดการมูลฝอยและสิ่งปฏิกูล" } },
  { id: "17", position: { x: 100, y: 350 }, data: { label: "งานบริการรักษาความสะอาด" } },
  { id: "18", position: { x: 200, y: 350 }, data: { label: "งานบริหารจัดการมูลฝอย" } },
  { id: "19", position: { x: 300, y: 350 }, data: { label: "งานพัฒนาระบบจัดการมูลฝอย" } },
  { id: "20", position: { x: 400, y: 350 }, data: { label: "งานบริหารจัดการสิ่งปฏิกูล" } },
  { id: "21", position: { x: 500, y: 450 }, data: { label: "ส่วนส่งเสริมอนามัยสิ่งแวดล้อม" } },
  { id: "22", position: { x: 400, y: 550 }, data: { label: "ฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อม" } },
  { id: "23", position: { x: 300, y: 650 }, data: { label: "งานสุขาภิบาลสถานประกอบการ" } },
  { id: "24", position: { x: 400, y: 650 }, data: { label: "งานสุขาภิบาลชุมชนเมืองและเหตุรำคาญ" } },
  { id: "25", position: { x: 500, y: 650 }, data: { label: "งานคุ้มครองผู้บริโภค" } },
  { id: "26", position: { x: 600, y: 650 }, data: { label: "งานเฝ้าระวังและตรวจสอบคุณภาพสิ่งแวดล้อม" } },
  { id: "27", position: { x: 700, y: 650 }, data: { label: "งานจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อม" } },
];

const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e3-5", source: "3", target: "5", animated: true },
  { id: "e3-6", source: "3", target: "6", animated: true },
  { id: "e2-7", source: "2", target: "7", animated: true },
  { id: "e7-8", source: "7", target: "8", animated: true },
  { id: "e1-9", source: "1", target: "9", animated: true },
  { id: "e9-10", source: "9", target: "10", animated: true },
  { id: "e10-11", source: "10", target: "11", animated: true },
  { id: "e10-12", source: "10", target: "12", animated: true },
];

// Component สำหรับปุ่มควบคุมซูม
const ZoomControls: React.FC = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2 bg-white p-2 rounded shadow">
      <button onClick={() => zoomIn()} className="px-4 py-2 bg-blue-500 text-white rounded">
        +
      </button>
      <button onClick={() => zoomOut()} className="px-4 py-2 bg-gray-500 text-white rounded">
        -
      </button>
      <button onClick={() => fitView()} className="px-4 py-2 bg-green-500 text-white rounded">
        Fit
      </button>
    </div>
  );
};

const page = () => {
  return (
    <div style={{ height: "50vh", width: "100%" }} className="relative">
      <ReactFlowProvider>
        <ZoomControls />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          className="bg-base-300"
        />
      </ReactFlowProvider>
    </div>
  );
}

export default page