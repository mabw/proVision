import React from "react";
import Widgets from "widgets";
import { useDrag } from "react-dnd";
import { WrapHolder, WidgetContainer } from "./widgetsPool.styles";

const WidgetHolder = ({ widgetName }) => {
  const [, drag] = useDrag({
    item: { type: "box", widgetType: widgetName, from: "pool" },
  });

  return <WrapHolder ref={drag}>{widgetName}</WrapHolder>;
};

const WidgetsPool = () => (
  <WidgetContainer>
    {Object.keys(Widgets).map((item) => {
      if (item === "Root") return null;
      return <WidgetHolder key={item} widgetName={item} />;
    })}
  </WidgetContainer>
);

export { WidgetsPool };
