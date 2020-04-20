import React, { memo, useCallback } from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Widgets from "widgets";

import { makeSelectNodes, makeSelectSelectedNodeId } from "../selectors";
import designerActions from "../actions";
import { CanvasContainer } from "./canvas.styles";

const WidgetHolder = ({ nodeId, children }) => {
  // console.log("nodeId: ", nodeId);
  const node = nodeId;
  const onDrop = (item) => {
    console.log("node", node);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "box",
    drop: (item, monitor) => {
      if (monitor.didDrop()) return;
      console.log("nodeId: ", nodeId);
    },
    hover: (item, monitor) => {
      // console.log("monitor: ", monitor);
      // console.log("hover item: ", item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  // console.log("isOver,canDrop: ", isOver, canDrop);
  return <div ref={drop}>{children}</div>;
};

// TODO: 待优化
const Canvas = ({ nodes, selectedNodeId, onSelectNode }) => {
  const RenderChildren = (nodeId) => {
    const Component = Widgets[nodes[nodeId].type];
    const node = nodes[nodeId];
    const props = {
      ...node.styleProps,
      ...node.settingProps,
      ...node.eventProps,
    };

    return (
      <div
        key={nodeId}
        onClick={(e) => {
          onSelectNode(nodeId);
          e.stopPropagation();
        }}
        className={selectedNodeId === nodeId ? "designer_selected-node" : ""}
      >
        <WidgetHolder nodeId={nodeId}>
          <Component.template {...props}>
            {nodes[nodeId].childrenId.map((childId) => RenderChildren(childId))}
          </Component.template>
        </WidgetHolder>
      </div>
    );
  };

  return (
    <CanvasContainer onClick={() => onSelectNode("root")}>
      {RenderChildren("root")}
    </CanvasContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodes(),
  selectedNodeId: makeSelectSelectedNodeId(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectNode: (nodeId) => dispatch(designerActions.selectNode(nodeId)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(Canvas);
