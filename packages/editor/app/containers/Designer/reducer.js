import produce from "immer";

import CONSTANTS from "./constants";

export const initialState = {
  nodes: {
    root: {
      type: "Root",
      displayName: "root",
      parentId: null,
      childrenId: ["abc123", "cde123"],
      index: 0,
      styleProps: {},
      settingProps: {},
      eventProps: {},
    },
    abc123: {
      type: "BasicText",
      displayName: "textDemo1",
      parentId: "root",
      childrenId: [],
      index: 0,
      styleProps: {},
      settingProps: {},
      eventProps: {},
    },
    cde123: {
      type: "BasicText",
      displayName: "textDemo2",
      parentId: "root",
      childrenId: [],
      index: 1,
      styleProps: {},
      settingProps: {},
      eventProps: {},
    },
  },
  selectedNodeId: "root",
};

/* eslint-disable default-case, no-param-reassign */
const designerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.CREATE_NODE:
        draft.locale = action.locale;
        break;
      case CONSTANTS.SELECT_NODE:
        draft.selectedNodeId = action.nodeId;
        break;
      case CONSTANTS.SET_STYLE_PROPS:
        draft.nodes[state.selectedNodeId].styleProps = action.props;
        break;
      case CONSTANTS.SET_SETTING_PROPS:
        draft.nodes[state.selectedNodeId].settingProps = action.props;
        break;
      case CONSTANTS.SET_EVENT_PROPS:
        draft.nodes[state.selectedNodeId].eventProps = action.props;
        break;
    }
  });

export default designerReducer;
