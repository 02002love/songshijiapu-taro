import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";

import "./text-updater-node.css";

const rfStyle = {
  backgroundColor: "#fff",
};

const gapWidth = 100;
const gapHeight = 200;

const initialEdges = [
  {
    id: "56",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#f00" },
  },
  {
    id: "5644",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "#f00" },
  },
  {
    id: "5644",
    source: "2",
    target: "5",
    animated: true,
    style: { stroke: "#f00" },
  },
  {
    id: "5644",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "#f00" },
  },
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
    position: { x: -gapWidth, y: gapHeight },
    data: {
      name: "社会",
      id: 2,
      generationNumber: 3,
      generationWord: "传",
      gender: 1,
      rankIndex: 1, // 排行
    },
  },
  {
    id: "3",
    type: "textUpdater",
    position: { x: gapWidth, y: gapHeight },
    data: {
      name: "传海",
      generationNumber: 3,
      generationWord: "传",
      gender: 1,
      rankIndex: 2, // 排行
    },
  },

  {
    id: "4",
    type: "textUpdater",
    position: { x: gapWidth, y: gapHeight * 2 },
    data: {
      name: "金委",
      rankIndex: 1, // 排行
      generationNumber: 4,
      generationWord: "家",
      gender: 1,
    },
  },

  {
    id: "5",
    type: "textUpdater",
    position: { x: -gapWidth, y: gapHeight * 2 },
    data: {
      name: "银伟",
      generationNumber: 4,
      rankIndex: 4, // 排行
      generationWord: "家",
      gender: 1,
    },
  },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}

export default Flow;
