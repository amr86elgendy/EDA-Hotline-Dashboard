import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Loader from "../components/layout/Loading";
import { Container, Row, Table } from "react-bootstrap";
import PaginationSystem from "../components/layout/Pagination";
import { paginate } from "../functions";

const Profile = () => {
  const { id } = useParams();
  
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const arr = problems.reduce((total, item) => {
    total = [...total, ...item];
    return total;
  }, []);
  // console.log(arr);

  useEffect(() => {
    const LoadProblemsByUser = async () => {
      setLoading(true);
      const { data } = await Axios.get(`/get-by-user/${id}`);
      setProblems(paginate(data));
      setLoading(false);
    };

    LoadProblemsByUser();
    //Clean up
    return () => setProblems([]);
  }, [id]);


  if (loading) {
    return <Loader />;
  }
  return (
    <Container className="container-pagination">
      <h1 className="text-center my-3">My Problems List</h1>

      <Table responsive bordered hover className="text-center">
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
            <th>CreatedBy</th>
          </tr>
        </thead>
        <tbody>
          {problems.length
            ? problems[page].map((p, i) => (
                <tr key={i}>
                  <td>{arr.findIndex((v) => v === p) + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.city}</td>
                  <td>{p.phoneNumber}</td>
                  <td>{p.sex}</td>
                  <td>{p.date}</td>
                  <td>{JSON.stringify(p.problems)}</td>
                  <td>{p.createdBy.username}</td>
                  {/* <td>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit text-success"></i>
                      </Button>
                      <Button
                        variant="light"
                        className="btn-sm"
                      >
                        <i className="fas fa-trash text-danger"></i>
                      </Button>
                    </td> */}
                </tr>
              ))
            : null}
        </tbody>
      </Table>

      <Row className="mt-5 justify-content-center">
        <PaginationSystem sorted={problems} page={page} setPage={setPage} />
      </Row>
    </Container>
  );
};

export default Profile;
