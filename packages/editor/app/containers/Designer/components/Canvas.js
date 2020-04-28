import React, { memo, useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Widgets from "widgets";
import classnames from "classnames";

import { makeSelectNodes, makeSelectSelectedNodeId } from "../selectors";
import designerActions from "../actions";
import { CanvasContainer } from "./canvas.styles";
import WidgetHolder from "./WidgetHolder";

// TODO: 待优化
const Canvas = ({ nodes, selectedNodeId }) => {
  const RenderChildren = useCallback(
    (nodeId) => {
      const Component = Widgets[nodes[nodeId].type];
      const node = nodes[nodeId];
      const props = {
        ...node.styleProps,
        ...node.settingProps,
        ...node.eventProps,
      };
      console.log(4444);
      return (
        <div
          key={nodeId}
          onClickCapture={(e) => e.stopPropagation()}
          className={classnames({
            "designer_selected-node": selectedNodeId === nodeId,
          })}
        >
          <WidgetHolder nodeId={nodeId}>
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
