import React, { memo, useEffect, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
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
  selectedNodeId,
  onSelectNode,
  onCreateNode,
  onHoverNode,
}) => {
  const ref = useRef(null);

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

  const [{ isDragging }, drag] = useDrag({
    item: { type: "box" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  //   drag(drop(ref));

  // console.log("isOver,canDrop: ", isOver, canDrop);
  return (
    <>
      <div
        ref={drop}
        id={nodeId}
        className={classnames({ designer_node: nodeId === hoveredNodeId })}
        onMouseOver={(e) => {
          onHoverNode(nodeId);
          e.stopPropagation();
        }}
      >
        {children}
        <div
          ref={drag}
          className={classnames({
            "designer_node-placeholder":
              nodeId === hoveredNodeId || nodeId === selectedNodeId,
            designer_hidden:
              nodeId != hoveredNodeId && nodeId != selectedNodeId,
          })}
          onMouseOver={(e) => {
            onHoverNode(nodeId);
            e.stopPropagation();
          }}
        >
          hello<button>sdfsdfdsfs</button>
        </div>
      </div>
    </>
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
