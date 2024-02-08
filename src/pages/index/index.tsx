import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode";

import "./text-updater-node.css";

const rfStyle = {
  backgroundColor: "#999999",
};

const initialEdges = [
  {
    id: "edge-1",
    source: "1",
    target: "2",
    sourceHandle: "1",
    targetHandle: "2",
  },
  // { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
];

const initialNodes = [
  {
    id: "1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: {
      id: 1,
      name: "春雨", // 名字
      generationNumber: 2, // 世代
      generationWord: "春", // 辈分
      rankIndex: 1, // 排行
      gender: 1, // 性别
    },
  },
  {
    id: "2",
    type: "textUpdater",
    position: { x: 0, y: 200 },
    data: {
      id: 1,
      name: "春龙", // 名字
      generationNumber: 2, // 世代
      generationWord: "春", // 辈分
      rankIndex: 1, // 排行
      gender: 1, // 性别
    },
  },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}

export default Flow;
