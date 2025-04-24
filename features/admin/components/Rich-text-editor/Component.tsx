import { NodeViewWrapper } from '@tiptap/react'
import { NodeViewProps } from '@tiptap/core';
import React from 'react'

export default (props: NodeViewProps) => {
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    })
  }

  return (
    <NodeViewWrapper className="react-component">
      <label>React Component</label>

      <div className="content">
        <button onClick={increase}>
          This button has been clicked {props.node.attrs.count} times.
        </button>
      </div>
    </NodeViewWrapper>
  )
}