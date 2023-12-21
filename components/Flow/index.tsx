'use client'

import { useCallback, useEffect } from 'react'
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
} from 'reactflow'
// import CustomNode from './CustomNode'
import styles from './Flow.module.css'

import GraphData from '@/data/graphdata.json'

const nodeTypes = {
  // custom: CustomNode,
}

const defaultEdgeOptions = {
  animated: true,
  type: 'simplebezier',
}

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  

  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        if(GraphData.nodes && GraphData.edges){
          setNodes(GraphData.nodes)
          setEdges(GraphData.edges)
        }
      } catch (error) {
        console.error('Error loading data from storage:', error);
      }
    };

    // Call the function to load data from storage only once
    loadDataFromStorage();
  }, []); // Empty dependency array ensures the effect runs only once

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )  

  return (
    <div className={styles.flow + "overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700"} style={{ height: 800 }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView>
        {/* <div className="save__controls">
          <button onClick={onSave}>save</button>
          <button onClick={onAdd}>add node</button>
        </div> */}
        </ReactFlow>
    </div>
  )
}

export default Flow
