"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs"
import { CustomNode, CustomLeftNode, CustomDubleLeftNode } from "@/components/Structure/CustomNodes";
import { nodes, edges } from "@/config/nodesData";
import {
    ReactFlow,
    Controls,
    Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
    customNode: CustomNode,
    customLeftNode: CustomLeftNode,
    customDubleLeftNode: CustomDubleLeftNode,
};

const FlowChart = () => {

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "ข้อมูลหน่วยงาน", },
        { label: "โครงสร้างหน่วยงาน", isCurrent: true },
    ];

    return (
        <div className="flex flex-col px-10 py-5 xl:px-20 xl:py-10">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-3">
                <h1 className="text-3xl font-bold">โครงสร้างหน่วยงาน</h1>
                <div className="flex w-full flex-col border-opacity-50">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="self-center mb-3 w-full h-[60vh] md:h-[80vh]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    minZoom={0.1}
                    fitView
                    className="rounded-box shadow-lg border border-base-content"
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    )
}

export default FlowChart