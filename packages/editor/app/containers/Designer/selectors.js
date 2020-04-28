import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectDesigner = (state) => state.designer || initialState;

const makeSelectNodes = () =>
  createSelector(
    selectDesigner,
    (designerState) => designerState.nodes
  );

const makeSelectSelectedNodeId = () =>
  createSelector(
    selectDesigner,
    (designerState) => designerState.selectedNodeId
  );

const makeSelectHoveredNodeId = () =>
  createSelector(
    selectDesigner,
    (designerState) => designerState.hoveredNodeId
  );

const makeSelectRoot = () =>
  createSelector(
    selectDesigner,
    (designerState) => designerState.nodes.root
  );

const makeSelectStyleFormData = () =>
  createSelector(
    selectDesigner,
    (designerState) =>
      designerState.nodes[designerState.selectedNodeId].styleProps
  );
const makeSelectSettingFormData = () =>
  createSelector(
    selectDesigner,
    (designerState) =>
      designerState.nodes[designerState.selectedNodeId].settingProps
  );
const makeSelectEventFormData = () =>
  createSelector(
    selectDesigner,
    (designerState) =>
      designerState.nodes[designerState.selectedNodeId].eventProps
  );

export {
  selectDesigner,
  makeSelectNodes,
  makeSelectSelectedNodeId,
  makeSelectRoot,
  makeSelectStyleFormData,
  makeSelectSettingFormData,
  makeSelectEventFormData,
  makeSelectHoveredNodeId,
};
