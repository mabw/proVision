import React, { memo, useCallback } from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Widgets from "widgets";

import { makeSelectNodes, makeSelectSelectedNodeId } from "../selectors";
import designerActions from "../actions";
import { Root } from "./RootWidget";
import { CanvasContainer } from "./canvas.styles";

const WidgetHolder = ({ nodeId }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "box",
    drop: (item) => console.log(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  console.log("isOver,canDrop: ", isOver, canDrop);
  return (
    <div ref={drop}>
      <Root.template>{children}</Root.template>
    </div>
  );
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
        <Component.template {...props}>
          {nodes[nodeId].childrenId.map((childId) => RenderChildren(childId))}
        </Component.template>
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
