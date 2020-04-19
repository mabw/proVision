import { Text } from "./Text";
import schema from "./schema";

const { styleProps, settingProps, eventProps } = schema;

const BasicText = {
  template: Text,
  styleProps,
  settingProps,
  eventProps,
};

export { BasicText };
