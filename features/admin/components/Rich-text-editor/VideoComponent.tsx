"use client";
import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Resizable } from 're-resizable';

const VideoComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, editor, HTMLAttributes }) => {
    const { src, width: initialWidth, height: initialHeight, align: initialAlign } = node.attrs as {
        src: string;
        width: number;
        height: number;
        align: 'left' | 'center' | 'right';
    };

    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

    const handleResizeStop = (_e: any, _direction: any, ref: HTMLElement) => {
        const newWidth = ref.offsetWidth;
        const newHeight = ref.offsetHeight;
        setSize({ width: newWidth, height: newHeight });
        updateAttributes({ width: newWidth, height: newHeight });
    };

    const handleAlign = (newAlign: 'left' | 'center' | 'right') => {
        updateAttributes({ align: newAlign });
    };

    return (
        <NodeViewWrapper className={`video-wrapper video-wrapper--${node.attrs.align} block w-full`}>
            {/* Alignment Controls */}
            <div className="video-menu absolute top-0 left-0 flex space-x-1 z-10">
                <button
                    type="button"
                    className={`btn btn-xs ${node.attrs.align === 'left' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleAlign('left')}
                >ซ้าย</button>
                <button
                    type="button"
                    className={`btn btn-xs ${node.attrs.align === 'center' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleAlign('center')}
                >กลาง</button>
                <button
                    type="button"
                    className={`btn btn-xs ${node.attrs.align === 'right' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleAlign('right')}
                >ขวา</button>
            </div>
            <Resizable
                size={size}
                lockAspectRatio={true}
                onResizeStop={handleResizeStop}
                enable={{
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                    topRight: true,
                    bottomRight: true,
                    bottomLeft: true,
                    topLeft: true,
                }}
                className={`relative inline-block overflow-hidden`}
                style={{ width: size.width, height: size.height }}
            >
                <iframe
                    src={src}
                    width={size.width}
                    height={size.height}
                    allowFullScreen
                    className="block"
                />
            </Resizable>
        </NodeViewWrapper>
    );
};

export default VideoComponent;