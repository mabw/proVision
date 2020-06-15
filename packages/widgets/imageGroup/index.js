import { Images } from "./ImageGroup";
import schema from "./schema";

const { styleProps, settingProps, eventProps } = schema;

const ImageGroup = {
  template: Images,
  styleProps,
  settingProps,
  eventProps,
};

export { ImageGroup };
