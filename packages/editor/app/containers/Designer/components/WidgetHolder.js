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
  onMoveNode,
  onDeleteNode,
  setCoveredId,
}) => {
  const ref = useRef(null);

  const handleDomClick = (e) => {
    onSelectNode(nodeId);
    e.stopPropagation();
  };

  const handleDeleteNode = (e) => {
    if (e.target.id !== "delete-root") {
      const nodeIdToDelete = e.target.id.replace("delete-", "");
      onDeleteNode(nodeIdToDelete);
    }
  };

  useEffect(() => {
    const currentDom = document.querySelector(`#${nodeId}`);
    const deleteBtn = document.querySelector(`#delete-${nodeId}`);
    currentDom.addEventListener("click", handleDomClick);
    deleteBtn.addEventListener("click", handleDeleteNode);
    return () => {
      currentDom.removeEventListener("click", handleDomClick);
      deleteBtn.removeEventListener("click", handleDeleteNode);
    };
  }, []);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "box",
    drop: (item, monitor) => {
      if (item.from === "canvas") {
        const dragIndex = item.nodeId;
        const hoverIndex = nodeId;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        if (clientOffset) {
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          if (hoverClientY < hoverMiddleY) {
            onMoveNode(item.nodeId, nodeId, "before");
          }
          if (hoverClientY > hoverMiddleY) {
            onMoveNode(item.nodeId, nodeId, "after");
          }
        }
      }
      if (monitor.didDrop()) return; // stop propagation, in case of adding multiply components
      setCoveredId("");
      if (item.from !== "canvas") {
        onCreateNode(item.widgetType, nodeId);
      }
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
      if (monitor) {
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
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "box", nodeId, from: "canvas" },
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
          <div className="fa fa-arrows designer_toolbar-item" />
          <div
            id={`delete-${nodeId}`}
            className="fa fa-trash-o designer_toolbar-item"
          />
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
    onMoveNode: (nodeId, targetId, direction) =>
      dispatch(designerActions.moveNode(nodeId, targetId, direction)),
    onDeleteNode: (nodeId) => dispatch(designerActions.deleteNode(nodeId)),
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
