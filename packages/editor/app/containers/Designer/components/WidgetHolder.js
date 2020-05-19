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
  setCoveredId,
}) => {
  const ref = useRef(null);

  const handleDomClick = (e) => {
    onSelectNode(nodeId);
    e.stopPropagation();
  };

  useEffect(() => {
    const currentDom = document.querySelector(`#${nodeId}`);
    currentDom.addEventListener("click", handleDomClick);
    return () => {
      currentDom.removeEventListener("click", handleDomClick);
    };
  }, []);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "box",
    drop: (item, monitor) => {
      setCoveredId("");
      if (monitor.didDrop()) return;
      onCreateNode(item.widgetType, nodeId);
    },
    hover: (item, monitor) => {
      const dragIndex = item.nodeId;
      const hoverIndex = nodeId;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (hoverClientY < hoverMiddleY) {
        setCoveredId(nodeId, "before");
        return;
      }
      if (hoverClientY > hoverMiddleY) {
        setCoveredId(nodeId, "after");
        return;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "box", nodeId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <>
      <div
        ref={drop(ref)}
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
