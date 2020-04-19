import React from "react";
import Widgets from "widgets";
import { useDrag } from "react-dnd";
import { WrapHolder } from "./widgetsPool.styles";

const WidgetHolder = ({ widgetName }) => {
  const [, drag] = useDrag({ item: { type: "box", widgetType: widgetName } });

  return <WrapHolder ref={drag}>{widgetName}</WrapHolder>;
};

const WidgetsPool = () => {
  return Object.keys(Widgets).map((item) => {
    if (item === "Root") return null;
    return <WidgetHolder key={item} widgetName={item} />;
  });
};

export { WidgetsPool };
