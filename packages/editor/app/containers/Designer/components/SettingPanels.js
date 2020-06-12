import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Widgets from "widgets";
import Form from "react-jsonschema-form";
import { isEmpty } from "lodash";

import {
  makeSelectStyleFormData,
  makeSelectSettingFormData,
  makeSelectEventFormData,
  makeSelectNodes,
  makeSelectSelectedNodeId,
} from "../selectors";
import designerActions from "../actions";
import { PanelContainer } from "./settingPanles.style";

const SettingPanels = ({
  styleFormData,
  settingFormData,
  eventFormData,
  selectedNodeId,
  onChangeStyleForm,
  onChangeSettingForm,
  onChangeEventForm,
  nodes,
}) => {
  const selectedNodeType = nodes[selectedNodeId].type;
  const styleProps = Widgets[selectedNodeType].styleProps;
  const settingProps = Widgets[selectedNodeType].settingProps;
  const eventProps = Widgets[selectedNodeType].eventProps;

  return (
    <PanelContainer>
      <section>
        <div className="section-title">Widget information</div>
        <p>Widget id: {selectedNodeId} </p>
      </section>
      {!isEmpty(styleProps) && (
        <section>
          <div className="section-title">Style setting</div>
          <Form
            tagName="div"
            schema={styleProps.schema}
            uiSchema={styleProps.uiSchema}
            formData={styleFormData}
            onChange={(dateSet) => onChangeStyleForm(dateSet.formData)}
          >
            <button type="submit" className="d-none" />
          </Form>
        </section>
      )}
      {!isEmpty(settingProps) && (
        <section>
          <div className="section-title">Props setting</div>
          <Form
            schema={settingProps.schema}
            formData={settingFormData}
            uiSchema={settingProps.uiSchema}
            onChange={(dateSet) => onChangeSettingForm(dateSet.formData)}
          >
            <button type="submit" className="d-none" />
          </Form>
        </section>
      )}
      {!isEmpty(eventProps) && (
        <section>
          <div className="section-title">Event setting</div>
          <Form
            schema={eventProps.schema}
            formData={eventFormData}
            uiSchema={eventProps.uiSchema}
            onChange={(dateSet) => onChangeEventForm(dateSet.formData)}
          >
            <button type="submit" className="d-none" />
          </Form>
        </section>
      )}
    </PanelContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  styleFormData: makeSelectStyleFormData(),
  settingFormData: makeSelectSettingFormData(),
  eventFormData: makeSelectEventFormData(),
  selectedNodeId: makeSelectSelectedNodeId(),
  nodes: makeSelectNodes(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeStyleForm: (props) =>
      dispatch(designerActions.setStyleProps(props)),
    onChangeSettingForm: (props) =>
      dispatch(designerActions.setSettingProps(props)),
    onChangeEventForm: (props) =>
      dispatch(designerActions.setEventProps(props)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(SettingPanels);
