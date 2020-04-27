import produce from "immer";
import Widgets from "widgets";
import cryptoRandomString from "crypto-random-string";

import { nodesOperator } from "../../utils/nodesOperator";
import { Root } from "./components/RootWidget";
import CONSTANTS from "./constants";

export const initialState = {
  nodes: {
    root: {
      type: "Root",
      displayName: "root",
      parentId: null,
      childrenId: ["abc123", "cde123"],
      index: 0,
      styleProps: { ...Root.styleProps.formData },
      settingProps: { ...Root.settingProps.formData },
      eventProps: { ...Root.eventProps.formData },
    },
    abc123: {
      type: "BasicText",
      displayName: "textDemo1",
      parentId: "root",
      childrenId: [],
      index: 0,
      styleProps: { ...Widgets.BasicText.styleProps.formData },
      settingProps: { ...Widgets.BasicText.settingProps.formData },
      eventProps: { ...Widgets.BasicText.eventProps.formData },
    },
    cde123: {
      type: "BasicText",
      displayName: "textDemo2",
      parentId: "root",
      childrenId: [],
      index: 1,
      styleProps: { ...Widgets.BasicText.styleProps.formData },
      settingProps: { ...Widgets.BasicText.settingProps.formData },
      eventProps: { ...Widgets.BasicText.eventProps.formData },
    },
  },
  selectedNodeId: "root",
};

/* eslint-disable default-case, no-param-reassign */
const designerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.CREATE_NODE:
        const newNodeId = "n" + cryptoRandomString({ length: 9 });
        draft.nodes[newNodeId] = {
          type: action.widgetType,
          displayName: action.widgetType,
          parentId: "root",
          childrenId: [],
          index: 1,
          ...nodesOperator.setDefaultProps(action.widgetType),
        };
        draft.nodes["root"].childrenId.push(newNodeId);
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
