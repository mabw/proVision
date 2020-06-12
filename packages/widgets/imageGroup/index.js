import { Image } from "./Image";
import schema from "./schema";

const { styleProps, settingProps, eventProps } = schema;

const BasicImage = {
  template: Image,
  styleProps,
  settingProps,
  eventProps,
};

export { BasicImage };
