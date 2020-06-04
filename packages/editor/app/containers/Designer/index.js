import React, { memo } from "react";

import { Container, Row, Col } from "react-bootstrap";
import HTMLBackend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useParams } from "react-router-dom";
import Widgets from "widgets";

import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import { WidgetsPool } from "./components/WidgetsPool";
import Canvas from "./components/Canvas";
import SettingPanels from "./components/SettingPanels";
import { Root } from "./components/RootWidget";

Widgets.Root = Root;
const key = "designer";

const DesignerPage = () => {
  useInjectReducer({ key, reducer });
  const { id } = useParams();

  return (
    <DndProvider backend={HTMLBackend}>
      <Container fluid>
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
};

export default memo(DesignerPage);
