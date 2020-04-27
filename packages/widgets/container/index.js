import { Text } from "./Container";
import schema from "./schema";

const { styleProps, settingProps, eventProps } = schema;

const BasicContainer = {
  template: Text,
  styleProps,
  settingProps,
  eventProps,
};

export { BasicContainer };
