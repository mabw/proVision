import CONSTANTS from "./constants";

const createNode = (widgetType, parentId) => {
  return {
    type: CONSTANTS.CREATE_NODE,
    widgetType,
    parentId,
  };
};

const deleteNode = (nodeId) => {
  return {
    type: CONSTANTS.DELETE_NODE,
    nodeId,
  };
};

const moveNode = (nodeId, targetParentId) => {
  return {
    type: CONSTANTS.MOVE_NODE,
    nodeId,
    targetParentId,
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

export default {
  createNode,
  deleteNode,
  moveNode,
  setStyleProps,
  setSettingProps,
  setEventProps,
  toggleHidden,
  selectNode,
};
