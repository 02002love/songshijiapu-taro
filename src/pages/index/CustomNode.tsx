import { FlowNode, FlowNodePorts } from "reactflow";
import "./CustomNode.css";

const CustomNode = ({ data }) => {
  return (
    <FlowNode style={{ backgroundColor: data.color }} className="custom-node">
      <div className="node-label">{data.label}</div>
      <div className="node-icon">{data.icon}</div>
      <FlowNodePorts ports={data.ports} position="top" />
    </FlowNode>
  );
};

export default CustomNode;
