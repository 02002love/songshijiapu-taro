/*
 * @Author: songjinwei1 songjinwei1@yiche.com
 * @Date: 2024-02-18 10:54:42
 * @LastEditors: songjinwei1 songjinwei1@yiche.com
 * @LastEditTime: 2024-03-11 16:29:27
 * @FilePath: /songshijiapu-taro/src/pages/index/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by YICHE, All Rights Reserved.
 */
import ReactFlow, {
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  // getConnectedEdges,
} from "reactflow";
// import { Form, Input, Modal, Spin } from "antd";
import { Overlay } from "@antmjs/vantui";
import { numberToChinese } from "@/util/toolFunction";

import { useCallback, useEffect, useRef, useState } from "react";
// import { uuid } from "@/util/toolFunction";
import "reactflow/dist/style.css";
import CustomNode from "@/components/CustomNode/CustomNode";
import { v4 as UUID } from "uuid";

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
    id: "1",
    name: "祖先", // 名字
    generationNumber: 1, // 世代
    generationWord: "春", // 辈分
    rankIndex: 1, // 排行
    gender: 1, // 性别
    childrenIds: [], // 后代
    position: { x: 0, y: 0 },
  },
  // {
  //   id: "2",
  //   name: "社会",
  //   generationNumber: 2,
  //   generationWord: "传",
  //   gender: 1,
  //   rankIndex: 1, // 排行
  //   childrenIds: [5], // 后代
  //   position: { x: -gapWidth, y: gapHeight },
  // },
  // {
  //   id: "3",
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
  //   id: "4",
  //   name: "天一",
  //   rankIndex: 1, // 排行
  //   generationNumber: 3,
  //   generationWord: "家",
  //   gender: 1,
  //   childrenIds: [], // 后代
  //   position: { x: gapWidth, y: gapHeight * 2 },
  // },
  // {
  //   id: "5",
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
  const [nodes, setNodes] = useState<any>([]);
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;
  const [edges, setEdges] = useState<any>([]);
  const edgesRef = useRef(edges);
  edgesRef.current = edges;

  const [addNodePopShow, setAddNodePopShow] = useState<any>(false); // 底部弹窗

  useEffect(() => {
    // 格式化 edge 信息
    let initialEdges: any = [];
    staffList.map((person: any) => {
      if (person.childrenIds && person.childrenIds.length > 0) {
        const { id, childrenIds } = person;
        childrenIds.map((child: any) => {
          initialEdges.push({
            id: UUID(),
            source: id,
            target: child,
            animated: true,
            style: { stroke: "#f00" },
          });
        });
      }
    });
    setEdges(initialEdges);

    // 格式化 node 信息
    let initialNodes: any = [];
    staffList.map((person: any) => {
      const { id, position } = person;
      initialNodes.push({
        id: id,
        type: "CustomNodeType",
        position: position,
        data: {
          ...person,
          addMethod: onNodesAdd,
          delMethod: onNodeDelete,
        },
      });
    });
    setNodes(initialNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description: 获取 node 的孩子
   * @param {any} incomeNodes 父节点
   * @return {*} 子节点数组
   */
  const getChildrenOfNode = (incomeNodes: any): any => {
    const nodeIds = incomeNodes.map((node: any) => node.id);
    return edgesRef.current.filter((edge: any) =>
      nodeIds.includes(edge.source)
    );
  };

  /**
   * @description: 初始化新建节点信息
   * @param {any} node 父节点
   * @return {*} 子节点
   */
  const initNodeInfo = (node: any): any => {
    const { name, generationNumber, childrenIds, position } = node;

    const uuid = UUID();
    const newNode: any = {
      id: uuid,
      type: "CustomNodeType",
      data: {
        id: uuid,
        name: `${name}${numberToChinese(childrenIds.length + 1, true)}子`, // 名字
        generationNumber: generationNumber + 1, // 世代
        generationWord: null, // 辈分
        rankIndex: childrenIds.length + 1, // 排行
        gender: 1, // 性别
        genderStr: "男", // 性别
        childrenIds: [], // 后代
        position: { x: 0, y: 0 },
        addMethod: onNodesAdd,
        delMethod: onNodeDelete,
      },
    };

    // 获取子节点的个数
    const connectedEdges = getChildrenOfNode([node]);
    console.log("孩子个数: " + connectedEdges.length);

    const targetIds = connectedEdges.map((item: any) => item.target);
    const childrenNode = nodesRef.current.filter((item: { id: any }) =>
      targetIds.includes(item.id)
    );

    debugger;
    // 第一个孩子 直接创建在父节点的 正下方, 第二个孩子 在父节点两边, 第三个孩子 在父节点的 正下方 和两边, 依次类推
    if (childrenNode.length % 2 === 0) {
      // 偶数个孩子
      const newPosition = { x: position.x, y: position.y + gapHeight };
      newNode.position = newPosition;
      newNode.data.position = newPosition;
    } else {
      // 奇数个孩子
      const newPosition = { x: position.x, y: position.y + gapHeight };
      newNode.position = newPosition;
      newNode.data.position = newPosition;
    }

    return newNode;
  };

  const initEdgeInfo = (source: any, target: string) => {
    return {
      id: UUID(),
      source,
      target,
      animated: true,
      style: { stroke: "#f00" },
    };
  };

  /**
   * @description: 添加子节点
   * @param {any} node 父节点
   * @return {*}
   */
  const onNodesAdd = (node: any): any => {
    // const newNode = initNodeInfo(node);
    // // 更新节点
    // setNodes([...nodesRef.current, newNode]);
    // // 更新关系
    // setEdges([...edgesRef.current, initEdgeInfo(node.id, newNode.id)]);

    setAddNodePopShow(true);
  };

  /**
   * @description: 删除当前节点
   * @param {any} node 当前节点
   * @return {*}
   */
  const onNodeDelete = (node: any): any => {
    console.log(edges);
    console.log("删除本节点node: " + node.id);
  };

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

  /**
   * @description: 节点点击事件
   * @param {any} e
   * @param {any} node
   * @return {*}
   */
  const onNodeClick = (e: any, node: any): any => {
    console.log(e);
    console.log("onNodeClick:", node);
  };

  return (
    <>
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

      {/* 添加子节点弹窗 */}
      <Overlay show={addNodePopShow}>这里是添加节点的表单</Overlay>
    </>
  );
}

export default Flow;
