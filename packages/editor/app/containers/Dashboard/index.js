import React, { useState, memo } from "react";
import useSWR from "swr";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import fetch from "../../utils/fetch";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, error } = useSWR("/api/v1/event", fetch);

  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <Row>
          <Col>
            <Button onClick={() => setShowModal(true)}>Create + </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {data ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Created by</th>
                    <th>Created time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr>
                      <td>{item.eventName}</td>
                      <td>{item.createdBy}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <Link to={`/editor/${item._id}`}>edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div>loading...</div>
            )}
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Event name
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder="event name" />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Create and go editor
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(Dashboard);
