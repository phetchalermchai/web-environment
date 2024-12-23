"use client";

import Link from "next/link";

import React from "react";
// import ReactFlow, { ReactFlowProvider, useReactFlow, Node, Edge } from "reactflow";
import {
  ReactFlow,
  Controls,
  Background,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// ข้อมูลโหนดทั้งหมด
const nodes = [
  {
    id: "1",
    position: { x: 800, y: 50 },
    data: { label: "สำนักสาธารณสุขและสิ่งแวดล้อม" },
    type: "customNode",
  },
  {
    id: "2",
    position: { x: 300, y: 150 },
    type: "customNode",
    data: { label: "ส่วนส่งเสริมสาธารณสุข" },
  },
  {
    id: "3",
    position: { x: 120, y: 250 },
    type: "customNode",
    data: { label: "ฝ่ายวิชาการและการประเมินผล" },
  },
  {
    id: "4",
    position: { x: 140, y: 350 },
    type: "customLeftNode",
    data: { label: "งานนโยบายและแผนงานสาธารณสุข" },
  },
  {
    id: "5",
    position: { x: 140, y: 450 },
    data: { label: "งานวิชาการและบริการข้อมูล" },
    type: "customLeftNode",
  },
  {
    id: "6",
    position: { x: 140, y: 550 },
    data: { label: "งานติดตามและประเมินผล" },
    type: "customLeftNode",
  },
  {
    id: "7",
    position: { x: 450, y: 250 },
    data: { label: "ฝ่ายส่งเสริมสาธารณสุข" },
    type: "customNode",
  },
  {
    id: "8",
    position: { x: 470, y: 350 },
    data: { label: "งานหลักประกันสุขภาพ" },
    type: "customLeftNode",
  },
  {
    id: "9",
    position: { x: 470, y: 450 },
    data: { label: "งานส่งเสริมคุณภาพชีวิตผู้สูงอายุ" },
    type: "customLeftNode",
  },
  {
    id: "10",
    position: { x: 470, y: 550 },
    data: { label: "งานอาสาสมัครสาธารณสุข" },
    type: "customLeftNode",
  },
  {
    id: "11",
    position: { x: 470, y: 650 },
    data: { label: "งานเผยแพร่และฝึกอบรมด้านสาธารณสุข" },
    type: "customLeftNode",
  },
  { id: "12", position: { x: 470, y: 750 }, data: { label: "งานสัตวแพทย์" }, type: "customLeftNode", },
  {
    id: "13",
    position: { x: 470, y: 850 },
    data: { label: "งานส่งเสริมสุขภาพ" },
    type: "customLeftNode",
  },
  {
    id: "14",
    position: { x: 470, y: 950 },
    data: { label: "งานป้องกันและควบคุมโรค" },
    type: "customLeftNode",
  },
  {
    id: "15",
    position: { x: 810, y: 150 },
    data: { label: "ส่วนบริการอนามัยสิ่งแวดล้อม" },
    type: "customNode",
  },
  {
    id: "16",
    position: { x: 803, y: 250 },
    data: { label: "ฝ่ายจัดการมูลฝอยและสิ่งปฏิกูล" },
    type: "customNode",
  },
  {
    id: "17",
    position: { x: 820, y: 350 },
    data: { label: "งานบริการรักษาความสะอาด" },
    type: "customLeftNode",
  },
  {
    id: "18",
    position: { x: 820, y: 450 },
    data: { label: "งานบริหารจัดการมูลฝอย" },
    type: "customLeftNode",
  },
  {
    id: "19",
    position: { x: 820, y: 550 },
    data: { label: "งานพัฒนาระบบจัดการมูลฝอย" },
    type: "customLeftNode",
  },
  {
    id: "20",
    position: { x: 820, y: 650 },
    data: { label: "งานบริหารจัดการสิ่งปฏิกูล" },
    type: "customLeftNode",
  },
  {
    id: "21",
    position: { x: 1137, y: 150 },
    data: { label: "ส่วนส่งเสริมอนามัยสิ่งแวดล้อม" },
    type: "customNode",
  },
  {
    id: "22",
    position: { x: 1100, y: 250 },
    data: { label: "ฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อม" },
    type: "customNode",
  },
  {
    id: "23",
    position: { x: 1120, y: 350 },
    data: { label: "งานสุขาภิบาลสถานประกอบการ" },
    type: "customLeftNode",
  },
  {
    id: "24",
    position: { x: 1120, y: 450 },
    data: { label: "งานสุขาภิบาลชุมชนเมืองและเหตุรำคาญ" },
    type: "customLeftNode",
  },
  {
    id: "25",
    position: { x: 1120, y: 550 },
    data: { label: "งานคุ้มครองผู้บริโภค" },
    type: "customLeftNode",
  },
  {
    id: "26",
    position: { x: 1120, y: 650 },
    data: { label: "งานเฝ้าระวังและตรวจสอบคุณภาพสิ่งแวดล้อม" },
    type: "customLeftNode",
  },
  {
    id: "27",
    position: { x: 1120, y: 750 },
    data: { label: "งานจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อม" },
    type: "customLeftNode",
  },
  {
    id: "28",
    position: { x: 1450, y: 120 },
    data: { label: "ฝ่ายบริหารงานทั่วไป" },
    type: "customDubleLeftNode",
  },
  {
    id: "29",
    position: { x: 1470, y: 250 },
    data: { label: "งานบริหารทั่วไป" },
    type: "customLeftNode",
  },
  {
    id: "30",
    position: { x: 1470, y: 350 },
    data: { label: "งานการเงินและบัญชี" },
    type: "customLeftNode",
  },
];

// Custom Node Component
const CustomNode = ({ data }: any) => {
  return (
    <div className="btn btn-outline btn-ghost border-4">
      <Handle id="top" type="target" position={Position.Top} />
      <div className="">{data.label}</div>
      <Handle id="bottom" type="source" position={Position.Bottom} />
      <Handle id="left" type="source" position={Position.Left} />
      <Handle id="right" type="source" position={Position.Right} />
    </div>
  );
};

// Custom Node Component
const CustomLeftNode = ({ data }: any) => {
  return (
    <div className="btn btn-outline btn-ghost border-4">
      <Handle id="top" type="source" position={Position.Top} />
      <div className="">{data.label}</div>
      <Handle id="bottom" type="source" position={Position.Bottom} />
      <Handle id="left" type="target" position={Position.Left} />
      <Handle id="right" type="source" position={Position.Right} />
    </div>
  );
};

// Custom Node Component
const CustomDubleLeftNode = ({ data }: any) => {
  return (
    <div className="btn btn-outline btn-ghost border-4">
      <Handle id="top" type="source" position={Position.Top} />
      <div className="">{data.label}</div>
      <Handle id="bottom" type="source" position={Position.Bottom} />
      <Handle style={{left : '10'}} id="bottom1" type="source" position={Position.Bottom} />
      <Handle id="left" type="target" position={Position.Left} />
      <Handle id="right" type="source" position={Position.Right} />
    </div>
  );
};

const edges = [
  { id: "e1", source: "1", target: "2", type: "step" },
  { id: "e2", source: "2", target: "3", type: "step" },
  {
    id: "e3",
    source: "3",
    target: "4",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e4",
    source: "3",
    target: "5",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e5",
    source: "3",
    target: "6",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e6",
    source: "2",
    target: "7",

    type: "step",
  },
  {
    id: "e7",
    source: "7",
    target: "8",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e8",
    source: "7",
    target: "9",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e9",
    source: "7",
    target: "10",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e10",
    source: "7",
    target: "11",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e11",
    source: "7",
    target: "12",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e12",
    source: "7",
    target: "12",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e13",
    source: "7",
    target: "13",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e14",
    source: "7",
    target: "14",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e15",
    source: "1",
    target: "15",

    type: "step",
    sourceHandle: "bottom",
  },
  {
    id: "e16",
    source: "15",
    target: "16",

    type: "step",
    sourceHandle: "bottom",
  },
  {
    id: "e17",
    source: "16",
    target: "17",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e18",
    source: "16",
    target: "18",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e19",
    source: "16",
    target: "19",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e20",
    source: "16",
    target: "20",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e21",
    source: "1",
    target: "21",

    type: "step",
  },
  {
    id: "e22",
    source: "21",
    target: "22",

    type: "step",
  },
  {
    id: "e23",
    source: "22",
    target: "23",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e24",
    source: "22",
    target: "24",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e25",
    source: "22",
    target: "25",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e26",
    source: "22",
    target: "26",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e27",
    source: "22",
    target: "27",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e28",
    source: "1",
    target: "28",

    type: "step",
  },
  {
    id: "e29",
    source: "28",
    target: "29",

    type: "step",
    sourceHandle: "left",
  },
  {
    id: "e30",
    source: "28",
    target: "30",

    type: "step",
    sourceHandle: "left",
  },
];

const page = () => {
  return (
    <div className="flex flex-col px-10 py-5 xl:px-20 xl:py-10">
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link href={`/`} className="opacity-65 hover:opacity-100">หน้าแรก</Link></li>
          <li className="opacity-65">ข้อมูลหน่วยงาน</li>
          <li>โครงสร้างหน่วยงาน</li>
        </ul>
      </div>
      <div className="self-center my-3 w-full h-[60vh] md:h-[80vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ customNode: CustomNode, customLeftNode: CustomLeftNode ,customDubleLeftNode: CustomDubleLeftNode}}
          minZoom={0.1}
          fitView
          className="rounded-box shadow-lg border border-base-content"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default page;
