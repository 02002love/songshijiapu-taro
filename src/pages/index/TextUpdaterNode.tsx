import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { View, Text } from "@tarojs/components";
import "./index.less";
import { numberToChinese } from "@/util/toolFunction";
const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  console.log(data);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);


  return (
    <View className="item-wrapper" key={data.id}>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <View className="item-word-wrapper">
        <View
          className="item-dot"
          style={{ backgroundColor: "#1d3d63" }}
        ></View>
        <Text
          className="item-word item-word-Lishu"
          style={{ color: "#1d3d63" }}
        >
          {data.rankIndex === 1 ? "长子" : "次子"}
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
        <Text className="item-generate">{data.gender === 1 ? "男" : "女"}</Text>
      </View>
    </View>
  );
}

export default TextUpdaterNode;
