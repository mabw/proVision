import CONSTANTS from "./constants";

const inflateNodes = (nodes) => {
  return { type: CONSTANTS.INFLATE_NODES, nodes };
};

const createNode = (widgetType, nodeId) => {
  return {
    type: CONSTANTS.CREATE_NODE,
    widgetType,
    nodeId,
  };
};

const deleteNode = (nodeId) => {
  return {
    type: CONSTANTS.DELETE_NODE,
    nodeId,
  };
};

const moveNode = (nodeId, targetId, direction) => {
  return {
    type: CONSTANTS.MOVE_NODE,
    nodeId,
    targetId,
    direction,
  };
};

const setStyleProps = (props) => {
  return {
    type: CONSTANTS.SET_STYLE_PROPS,
    props,
  };
};

const setSettingProps = (props) => {
  return {
    type: CONSTANTS.SET_SETTING_PROPS,
    props,
  };
};

const setEventProps = (props) => {
  return {
    type: CONSTANTS.SET_EVENT_PROPS,
    props,
  };
};

const toggleHidden = (nodeId) => {
  return {
    type: CONSTANTS.TOGGLE_HIDDEN,
    nodeId,
  };
};

const selectNode = (nodeId) => {
  return {
    type: CONSTANTS.SELECT_NODE,
    nodeId,
  };
};

const hoverNode = (nodeId) => {
  return {
    type: CONSTANTS.HOVER_NODE,
    nodeId,
  };
};

export default {
  inflateNodes,
  createNode,
  deleteNode,
  moveNode,
  setStyleProps,
  setSettingProps,
  setEventProps,
  toggleHidden,
  selectNode,
  hoverNode,
};
