import React, { useState, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Widgets from "widgets";
import classnames from "classnames";
import { isEqual } from "lodash";

import { makeSelectNodes, makeSelectSelectedNodeId } from "../selectors";
import designerActions from "../actions";
import { CanvasContainer } from "./canvas.styles";
import WidgetHolder from "./WidgetHolder";

// TODO: 待优化
const Canvas = ({ nodes, selectedNodeId }) => {
  const [coveredId, setCoveredId] = useState({ id: "", direction: "" });

  const handleSetCoverId = (id, direction) => {
    if (id !== "root" && !isEqual(coveredId, { id, direction })) {
      setCoveredId({ id, direction });
    }
  };

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
        onClickCapture={(e) => e.stopPropagation()}
        className={classnames({
          "designer_selected-node": selectedNodeId === nodeId,
          "designer_covered-widget": coveredId.id === nodeId,
        })}
      >
        <WidgetHolder nodeId={nodeId} setCoveredId={handleSetCoverId}>
          <Component.template {...props}>
            {nodes[nodeId].childrenId.map((childId) => RenderChildren(childId))}
          </Component.template>
        </WidgetHolder>
      </div>
    );
  };

  return (
    <CanvasContainer direction={coveredId.direction}>
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
