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
      parentId: "",
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
  hoveredNodeId: "",
};

/* eslint-disable default-case, no-param-reassign */
const designerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.INFLATE_NODES:
        draft.nodes = action.nodes;
        break;
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
      case CONSTANTS.HOVER_NODE:
        draft.hoveredNodeId = action.nodeId;
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
      case CONSTANTS.DELETE_NODE:
        if (action.nodeId === "root") break;
        const nodeParentId = state.nodes[action.nodeId].parentId;
        draft.nodes[nodeParentId].childrenId = draft.nodes[
          nodeParentId
        ].childrenId.filter((node) => node !== action.nodeId);
        delete draft.nodes[action.nodeId];
        if (state.selectedNodeId === action.nodeId) {
          draft.selectedNodeId = "root";
        }
        if (state.hoveredNodeId === action.nodeId) {
          draft.hoveredNodeId = "";
        }
        break;
      case CONSTANTS.MOVE_NODE:
        // If the node and target are in the same parent, update the position of the children array in parent node
        // otherwise update the parentId and add the children to its array.
        if (action.targetId === action.nodeId) break;
        if (action.targetId === "root") break;
        const targetParentId = state.nodes[action.targetId].parentId;
        const currentNodeParentId = state.nodes[action.nodeId].parentId;
        const targetParentChildrenList = Array.from(
          state.nodes[targetParentId].childrenId
        );
        const targetIndex = targetParentChildrenList.indexOf(action.targetId);
        if (targetParentId === currentNodeParentId) {
          const currentNodeIndex = targetParentChildrenList.indexOf(
            action.nodeId
          );
          targetParentChildrenList.splice(currentNodeIndex, 1); // remove the node id from the children array;
        }
        if (targetParentId !== currentNodeParentId) {
          draft.nodes[action.nodeId].parentId = targetParentId; // reset the parent id.
          const nodeParentChildrenList = Array.from(
            state.nodes[currentNodeParentId].childrenId
          );
          const nodeIndex = nodeParentChildrenList.indexOf(action.nodeId);
          nodeParentChildrenList.splice(nodeIndex, 1); // update the children in its parent
          draft.nodes[currentNodeParentId].childrenId = nodeParentChildrenList;
        }
        if (action.direction === "before") {
          targetParentChildrenList.splice(targetIndex, 0, action.nodeId); // insert the node id into the children of its parent
        }
        if (action.direction === "after") {
          targetParentChildrenList.splice(targetIndex + 1, 0, action.nodeId); // insert the node id into the children of its parent
        }
        draft.nodes[targetParentId].childrenId = targetParentChildrenList;
        break;
    }
  });

export default designerReducer;
