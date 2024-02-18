import { useCallback } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import { View, Text } from "@tarojs/components";
import { numberToChinese } from "@/util/toolFunction";
import "./CustomNode.less";
import { AtIcon } from "taro-ui";

function CustomNode({ data, isConnectable }) {
  console.log(data.id);
  return (
    <View className="item-wrapper" key={data.id}>
      <NodeToolbar
        isVisible={data.forceToolbarVisible || undefined}
        position={Position.Right}
        offset={0}
      >
        <View>
          <AtIcon value="add-circle" size="14" color="#e7c48d"></AtIcon>
          <AtIcon value="money" size="14" color="#e7c48d"></AtIcon>
          <AtIcon value="trash" size="14" color="#e7c48d"></AtIcon>
        </View>
      </NodeToolbar>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="dot-color"
      />
      {/* <View className="item-word-wrapper">
        <View
          className="item-dot"
          style={{ backgroundColor: "#1d3d63" }}
        ></View>
        <Text
          className="item-word item-word-Lishu"
          style={{ color: "#1d3d63" }}
        >
          {data.generationWord}字辈
        </Text>
      </View> */}
      <View className="item-word-wrapper">
        <View
          className="item-dot"
          style={{ backgroundColor: "#1d3d63" }}
        ></View>
        <Text
          className="item-word item-word-Lishu"
          style={{ color: "#1d3d63" }}
        >
          {numberToChinese(data.rankIndex, true)}子
        </Text>
      </View>
      <View className="item-word-wrapper">
        <View
          className="item-dot"
          style={{ backgroundColor: "#824504" }}
        ></View>
        <Text
          className="item-word"
          style={{ fontWeight: "bold", color: "#824504" }}
        >
          {data.name}
        </Text>
      </View>
      <View className="dash-line"></View>
      <View className="item-word-wrapper">
        <View className="item-dot"></View>
        <Text className="item-word">
          {numberToChinese(data.generationNumber)}世
        </Text>
        {/* <Text className="item-generate">{data.gender === 1 ? "男" : "女"}</Text> */}
        <Text className="item-generate">{data.generationWord}</Text>
      </View>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="dot-color"
      />
    </View>
  );
}

export default CustomNode;
