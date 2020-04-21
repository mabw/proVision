import React, { memo, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Widgets from "widgets";
import classnames from "classnames";

import { makeSelectNodes, makeSelectSelectedNodeId } from "../selectors";
import designerActions from "../actions";
import { CanvasContainer } from "./canvas.styles";

const WidgetHolder = ({ nodeId, children, onSelectNode, onCreateNode }) => {
  const documentHandler = (e) => {
    onSelectNode(nodeId);
    e.stopPropagation();
  };

  useEffect(() => {
    const currentDom = document.querySelector(`#${nodeId}`);
    currentDom.addEventListener("click", documentHandler);
    return () => currentDom.removeEventListener("click", documentHandler);
  }, []);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "box",
    drop: (item, monitor) => {
      if (monitor.didDrop()) return;
      onCreateNode(item.widgetType, nodeId);
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
  return (
    <div ref={drop} id={nodeId}>
      {children}
    </div>
  );
};

// TODO: 待优化
const Canvas = ({ nodes, selectedNodeId, onSelectNode, onCreateNode }) => {
  const RenderChildren = useCallback(
    (nodeId) => {
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
          onClickCapture={(e) => e.stopPropagation()}
          className={classnames("designer_node", {
            "designer_selected-node": selectedNodeId === nodeId,
          })}
        >
          <WidgetHolder
            nodeId={nodeId}
            onSelectNode={onSelectNode}
            onCreateNode={onCreateNode}
          >
            <Component.template {...props} className={"designer_widget-holder"}>
              {nodes[nodeId].childrenId.map((childId) =>
                RenderChildren(childId)
              )}
            </Component.template>
          </WidgetHolder>
        </div>
      );
    },
    [nodes, selectedNodeId]
  );

  return <CanvasContainer>{RenderChildren("root")}</CanvasContainer>;
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodes(),
  selectedNodeId: makeSelectSelectedNodeId(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectNode: (nodeId) => dispatch(designerActions.selectNode(nodeId)),
    onCreateNode: (widgetType, nodeId) =>
      dispatch(designerActions.createNode(widgetType, nodeId)),
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
