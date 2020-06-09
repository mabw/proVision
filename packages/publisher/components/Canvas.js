import React, { memo } from "react";
import Widgets from "widgets";

import { Root } from "./RootWidget";

Widgets.Root = Root;

const Canvas = ({ nodes }) => {
  const RenderChildren = (nodeId) => {
    const Component = Widgets[nodes[nodeId].type];
    const node = nodes[nodeId];
    const props = {
      ...node.styleProps,
      ...node.settingProps,
      ...node.eventProps,
    };
    return (
      <div key={nodeId}>
        <Component.template {...props}>
          {nodes[nodeId].childrenId.map((childId) => RenderChildren(childId))}
        </Component.template>
      </div>
    );
  };

  return <div>{RenderChildren("root")}</div>;
};

export default memo(Canvas);
