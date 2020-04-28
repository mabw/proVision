import React, { memo, useEffect } from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import classnames from "classnames";

import {
  makeSelectNodes,
  makeSelectSelectedNodeId,
  makeSelectHoveredNodeId,
} from "../selectors";
import designerActions from "../actions";

const WidgetHolder = ({
  nodeId,
  children,
  hoveredNodeId,
  onSelectNode,
  onCreateNode,
  onHoverNode,
}) => {
  const handleDomClick = (e) => {
    onSelectNode(nodeId);
    e.stopPropagation();
  };

  // const handleDomMouseover = (e) => {
  //   // console.log("e: ", e.target.id);
  //   // console.log("e: ", e.target.className);
  //   console.log("nodeId", nodeId);
  //   console.log("e: ", e.target.getBoundingClientRect());
  //   // e.stopPropagation();
  // };

  useEffect(() => {
    const currentDom = document.querySelector(`#${nodeId}`);
    currentDom.addEventListener("click", handleDomClick);
    // currentDom.addEventListener("mouseover", handleDomMouseover);
    return () => {
      currentDom.removeEventListener("click", handleDomClick);
      // currentDom.removeEventListener("mouseover", handleDomMouseover);
    };
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
    <div className={classnames({ designer_node: nodeId === hoveredNodeId })}>
      <div
        ref={drop}
        id={nodeId}
        onMouseOver={(e) => {
          onHoverNode(nodeId);
          e.stopPropagation();
        }}
      >
        {children}
      </div>
      <div className="designer_node-placeholder">
        hello<button>sdfsdfdsfs</button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodes(),
  selectedNodeId: makeSelectSelectedNodeId(),
  hoveredNodeId: makeSelectHoveredNodeId(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectNode: (nodeId) => dispatch(designerActions.selectNode(nodeId)),
    onHoverNode: (nodeId) => dispatch(designerActions.hoverNode(nodeId)),
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
)(WidgetHolder);
