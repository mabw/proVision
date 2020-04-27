import Widgets from "widgets";
import { isEmpty } from "lodash";

const setDefaultProps = (widgetType) => {
  const styleProps = isEmpty(Widgets[widgetType].styleProps.formData)
    ? {}
    : { ...Widgets[widgetType].styleProps.formData };
  const settingProps = isEmpty(Widgets[widgetType].settingProps.formData)
    ? {}
    : { ...Widgets[widgetType].settingProps.formData };
  const eventProps = isEmpty(Widgets[widgetType].eventProps.formData)
    ? {}
    : { ...Widgets[widgetType].eventProps.formData };
  return { styleProps, settingProps, eventProps };
};

export const nodesOperator = { setDefaultProps };
