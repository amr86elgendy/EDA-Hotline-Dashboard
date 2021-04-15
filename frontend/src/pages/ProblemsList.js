import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "../context/appContext";
import Axios from "axios";
import PaginationSystem from "../components/layout/Pagination";
import Modal from "../components/layout/Modal";

const Problems = () => {
  const { sorted, problems, loadProblems } = useContext(AppContext);

  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [_id, set_id] = useState("");

  const handleClose = () => setShowModal(false);

  const handleDelete = async (id) => {
    await Axios.delete(`/delete/${id}`);
    await loadProblems();
    setShowModal(false);
    set_id("");
  };

  return (
    <>
      <Modal
        show={showModal}
        handleClose={handleClose}
        handleOK={() => handleDelete(_id)}
      />
      <Container className="container-pagination">
        <h1 className="text-center my-3">Problems List</h1>
        <Table responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Phone</th>
              <th>Sex</th>
              <th>Date</th>
              <th>problems</th>
              <th>Respone</th>
              <th>CreatedBy</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.length
              ? sorted[page].map((p, i) => (
                  <tr key={i}>
                    <td className="text-success">
                      {problems.findIndex((v) => v === p) + 1}
                    </td>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.city}</td>
                    <td>{p.phoneNumber}</td>
                    <td>{p.sex}</td>
                    <td>{p.date}</td>
                    <td>{JSON.stringify(p.problems)}</td>
                    <td className={p.response ? "text-success" : "text-danger"}>
                      {p.response ? p.response : "No response taken yet"}
                    </td>
                    <td>{p.createdBy.username}</td>
                    <td>
                      <OverlayTrigger overlay={<Tooltip>Edit!</Tooltip>}>
                        <LinkContainer to={`/response/${p._id}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit text-success"></i>
                          </Button>
                        </LinkContainer>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip>Delete!</Tooltip>}>
                        <Button
                          variant="light"
                          className="btn-sm"
                          onClick={() => {
                            setShowModal(true);
                            set_id(p._id);
                          }}
                        >
                          <i className="fas fa-trash text-danger"></i>
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>

        <Row className="mt-5 justify-content-center">
          <PaginationSystem sorted={sorted} page={page} setPage={setPage} />
        </Row>
      </Container>
    </>
  );
};

export default Problems;
