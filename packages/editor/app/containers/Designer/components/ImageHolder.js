import React from "react";
import { useDrag } from "react-dnd";

import { ImageBlock } from "../styles";

export const ImageHolder = ({ id }) => {
  const [, drag] = useDrag({ item: { type: "box", id } });

  return <ImageBlock ref={drag}>Image</ImageBlock>;
};
