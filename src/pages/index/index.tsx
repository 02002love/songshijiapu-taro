import ReactFlow, { MiniMap } from "reactflow";
import { uuid } from "@/util/toolFunction";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";

import "./text-updater-node.css";

const rfStyle = {
  backgroundColor: "#fff",
};

const gapWidth = 100;
const gapHeight = 200;

const minimapStyle = {
  height: 120,
};

const staffPersonList = [
  {
    id: 1,
    name: "春雨", // 名字
    generationNumber: 1, // 世代
    generationWord: "春", // 辈分
    rankIndex: 1, // 排行
    gender: 1, // 性别
    childrenIds: [2, 3, 6], // 后代
    position: { x: 0, y: 0 },
  },
  {
    id: 2,
    name: "社会",
    generationNumber: 2,
    generationWord: "传",
    gender: 1,
    rankIndex: 1, // 排行
    childrenIds: [5], // 后代
    position: { x: -gapWidth, y: gapHeight },
  },
  // {
  //   id: 3,
  //   name: "传海",
  //   nickName: "社庄",
  //   generationNumber: 2,
  //   generationWord: "传",
  //   gender: 1,
  //   rankIndex: 2, // 排行
  //   childrenIds: [4], // 后代
  //   position: { x: gapWidth, y: gapHeight },
  // },
  // {
  //   id: 4,
  //   name: "金委",
  //   rankIndex: 1, // 排行
  //   generationNumber: 3,
  //   generationWord: "家",
  //   gender: 1,
  //   childrenIds: [], // 后代
  //   position: { x: gapWidth, y: gapHeight * 2 },
  // },
  // {
  //   id: 5,
  //   name: "银伟",
  //   rankIndex: 1, // 排行
  //   generationNumber: 3,
  //   generationWord: "家",
  //   gender: 1,
  //   childrenIds: [], // 后代
  //   position: { x: -gapWidth, y: gapHeight * 2 },
  // },
];

let initialEdges: any = [];
staffPersonList.map((person: any) => {
  if (person.childrenIds && person.childrenIds.length > 0) {
    const { id, childrenIds } = person;
    childrenIds.map((child: any) => {
      initialEdges.push({
        id: uuid(),
        source: id + "",
        target: child + "",
        animated: true,
        style: { stroke: "#f00" },
      });
    });
  }
});

console.log(initialEdges);

// 格式化 node 信息
let initialNodes: any = [];
staffPersonList.map((person: any) => {
  const { id, position } = person;
  initialNodes.push({
    id: id + "",
    type: "textUpdater",
    position: position,
    data: person,
  });
});

// initialNodes.unshift({
//   id: "-1",
//   type: "default",
//   data: {
//     label: (
//       <>
//         On the bottom left you see the <strong>Controls</strong> and the bottom
//         right the <strong>MiniMap</strong>. This is also just a node 🥳
//       </>
//     ),
//   },
//   draggable: false,
//   selectable: false,
//   position: { x: 0, y: 400 },
// });

console.log(initialNodes);

const nodeTypes = { textUpdater: TextUpdaterNode };

// 节点点击
const onNodeClick = (e: any, node: any) => {
  console.log(e);
  console.log(135, node, "nodes");
};

function Flow() {
  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      onNodeClick={onNodeClick}
      fitView
      style={rfStyle}
      fitViewOptions={{ padding: 2 }}
      nodeOrigin={[0.5, 0]}
    >
      <MiniMap style={minimapStyle} />
    </ReactFlow>
  );
}

export default Flow;
