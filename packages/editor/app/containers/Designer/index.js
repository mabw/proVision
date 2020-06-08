import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import HTMLBackend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Widgets from "widgets";
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import { WidgetsPool } from "./components/WidgetsPool";
import Canvas from "./components/Canvas";
import SettingPanels from "./components/SettingPanels";
import { Root } from "./components/RootWidget";
import CanvasHeader from "./components/CanvasHeader";
import fetchData from "../../utils/fetch";
import designerActions from "./actions";

Widgets.Root = Root;
const key = "designer";

const DesignerPage = () => {
  useInjectReducer({ key, reducer });
  let { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSWR(`/api/v1/event/${id}/edit`, fetchData);
  useEffect(() => {
    if (data.nodes && data.nodes.length > 0) {
      dispatch(designerActions.inflate(data.nodes));
    }
  }, [data]);

  if (data) {
    return (
      <DndProvider backend={HTMLBackend}>
        <Container fluid>
          <Row>
            <Col>
              <CanvasHeader />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <WidgetsPool />
            </Col>
            <Col md={6}>
              <Canvas />
            </Col>
            <Col md={3}>
              <SettingPanels />
            </Col>
          </Row>
        </Container>
      </DndProvider>
    );
  }

  return <Spinner animation="border" variant="primary" />;
};

export default memo(DesignerPage);
