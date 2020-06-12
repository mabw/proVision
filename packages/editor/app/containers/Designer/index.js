import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import HTMLBackend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Widgets from "widgets";
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import { WidgetsPool } from "./components/WidgetsPool";
import Canvas from "./components/Canvas";
import SettingPanels from "./components/SettingPanels";
import { Root } from "./components/RootWidget";
import CanvasHeader from "./components/CanvasHeader";
import fetchData from "../../utils/fetch";
import designerActions from "./actions";

const Wrapper = styled.div`
  background-color: #444444;
  color: #b9a5a6;
  user-select: none;
  font-size: 0.75rem;
  font-weight: lighter;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
`;

Widgets.Root = Root;
const key = "designer";

const DesignerPage = ({ inflateNode }) => {
  useInjectReducer({ key, reducer });
  let { id } = useParams();
  const { data } = useSWR(`/api/v1/event/${id}/edit`, fetchData);
  useEffect(() => {
    if (data && data.nodes !== "{}") {
      inflateNode(data.nodes);
    }
  }, [data]);

  if (data) {
    return (
      <DndProvider backend={HTMLBackend}>
        <Wrapper>
          <CanvasHeader eventName={data.eventName} />
          <WidgetsPool />
          <Canvas />
          <SettingPanels />
        </Wrapper>
      </DndProvider>
    );
  }

  return <Spinner animation="border" variant="primary" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    inflateNode: (nodes) => dispatch(designerActions.inflateNodes(nodes)),
  };
};

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(DesignerPage);
