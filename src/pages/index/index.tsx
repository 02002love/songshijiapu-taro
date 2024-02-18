import ReactFlow, {
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { useCallback, useEffect, useState } from "react";
import { uuid } from "@/util/toolFunction";
import "reactflow/dist/style.css";
import CustomNode from "@/components/CustomNode/CustomNode";

const nodeTypes = { CustomNodeType: CustomNode };
// 背景样式
const rfStyle = {
  backgroundColor: "#fff",
};

// 节点之间的横向间距
const gapWidth = 100;
// 节点之间的竖向间距
const gapHeight = 200;

// 缩略图样式
const minimapStyle = {
  height: 120,
};
// mock数据
const staffList = [
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

function Flow() {
  useEffect(() => {
    // 格式化 edge 信息
    let initialEdges: any = [];
    staffList.map((person: any) => {
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

    // 格式化 node 信息
    let initialNodes: any = [];
    staffList.map((person: any) => {
      const { id, position } = person;
      initialNodes.push({
        id: id + "",
        type: "CustomNodeType",
        position: position,
        data: { ...person, addMethod: onNodesAdd },
      });
    });

    setEdges(initialEdges);
    setNodes(initialNodes);
  }, []);

  const onNodesAdd = (node: any) => {
    // 第一个孩子 直接创建在父节点的 正下方
    // 第二个孩子 在父节点两边
    // 第三个孩子 在父节点的 正下方 和两边
    // 依次类推
    console.log("node: " + node);
    //{"id":2,"name":"社会","generationNumber":2,"generationWord":"传","gender":1,"rankIndex":1,"childrenIds":[5],
    //"position": { "x": -100, "y": 200 }}
  };

  const deleteNode = (node: any) => {
    console.log("node: " + node);
  };
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: any) => setEdges((eds: any) => addEdge(connection, eds)),
    [setEdges]
  );

  // 节点点击
  const onNodeClick = (e: any, node: any) => {
    console.log(e);
    console.log(135, node, "nodes");
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
      fitViewOptions={{ padding: 2 }}
      nodeOrigin={[0.5, 0]}
      attributionPosition={undefined}
    >
      <MiniMap style={minimapStyle} />
    </ReactFlow>
  );
}

export default Flow;
