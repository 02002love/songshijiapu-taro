import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { View, Text } from "@tarojs/components";
import { numberToChinese } from "@/util/toolFunction";
import "./index.less";

function TextUpdaterNode({ data, isConnectable }) {
  console.log(data.id);
  return (
    <View className="item-wrapper" key={data.id}>
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

export default TextUpdaterNode;
