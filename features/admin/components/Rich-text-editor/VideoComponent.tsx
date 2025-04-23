import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Resizable } from 're-resizable';

// VideoComponent: Custom NodeView for resizing and alignment
// Props provided by ReactNodeViewRenderer: node (ProseMirror node), updateAttributes (to change attrs)
const VideoComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
    // Extract attributes from the node
    const { src, width: initialWidth, height: initialHeight, align: initialAlign } = node.attrs as {
        src: string;
        width: number;
        height: number;
        align: 'left' | 'center' | 'right';
    };

    // Local state for interactive resizing
    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
    // Local state for alignment
    const [align, setAlign] = useState(initialAlign);

    // Handler when resizing stops: update both local and node attributes
    const handleResizeStop = (_e: any, _direction: any, ref: HTMLElement) => {
        const newWidth = ref.offsetWidth;
        const newHeight = ref.offsetHeight;
        setSize({ width: newWidth, height: newHeight });
        updateAttributes({ width: newWidth, height: newHeight });
    };

    // Handler to change alignment: update both local state and node attributes
    const handleAlign = (newAlign: 'left' | 'center' | 'right') => {
        setAlign(newAlign);
        updateAttributes({ align: newAlign });
    };

    return (
        <NodeViewWrapper className={`video-wrapper video-wrapper--${align} w-[${size.width}px] h-[${size.height}px]`}>
            {/* Alignment Controls */}
            <div className="video-menu absolute top-0 right-0 flex space-x-1 z-10">
                <button
                    type="button"
                    className={`btn btn-xs ${align === 'left' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleAlign('left')}
                >ซ้าย</button>
                <button
                    type="button"
                    className={`btn btn-xs ${align === 'center' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleAlign('center')}
                >กลาง</button>
                <button
                    type="button"
                    className={`btn btn-xs ${align === 'right' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleAlign('right')}
                >ขวา</button>
            </div>

            {/* Resizable Container */}
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
                className={`w-[${size.width}px] h-[${size.height}px]`}
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