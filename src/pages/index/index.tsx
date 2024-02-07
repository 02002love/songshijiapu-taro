import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";
import { numberToChinese } from "@/util/toolFunction";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const generationTree = [
    {
      name: "春雨", // 名字
      generationNumber: 13, // 世代
      generationWord: "春", // 辈分
      rankIndex: 1, // 排行
      gender: 1, // 性别
      // 孩子
      children: [
        {
          name: "社会",
          generationNumber: 13,
          generationWord: "传",
          gender: 1,
          rankIndex: 1, // 排行
          children: [
            {
              name: "银伟",
              generationNumber: 14,
              rankIndex: 1, // 排行
              generationWord: "家",
              gender: 1,
            },
          ],
        },
        {
          name: "传海",
          generationNumber: 13,
          generationWord: "传",
          gender: 1,
          rankIndex: 2, // 排行
          children: [
            {
              name: "金委",
              rankIndex: 1, // 排行
              generationNumber: 14,
              generationWord: "家",
              gender: 1,
            },
          ],
        },
      ],
    },
  ];

  return generationTree.map((item: any) => {
    return (
      <View className="item-wrapper">
        <View className="item-word-wrapper">
          <View
            className="item-dot"
            style={{ backgroundColor: "#1d3d63" }}
          ></View>
          <Text
            className="item-word item-word-Lishu"
            style={{ color: "#1d3d63" }}
          >
            {item.rankIndex === 1 ? "长子" : "次子"}
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
            {item.name}
          </Text>
        </View>
        <View className="dash-line"></View>
        <View className="item-word-wrapper">
          <View className="item-dot"></View>
          <Text className="item-word">
            {numberToChinese(item.generationNumber)}世
          </Text>
          <Text className="item-generate">
            {" "}
            {item.gender === 1 ? "男" : "女"}
          </Text>
        </View>
      </View>
    );
  });
}
