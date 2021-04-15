import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { problemType, cities } from "../data";
import { Multiselect } from "multiselect-react-dropdown";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import Loader from "../components/layout/Loading";
import { AppContext } from "../context/appContext";

const initialState = {
  name: "",
  age: "",
  city: "",
  sex: "",
  phoneNumber: "",
  phoneType: "",
  problems: [],
  response: "",
};

const Response = () => {
  const { id } = useParams();
  const history = useHistory();

  const { loadProblems } = useContext(AppContext);

  const [problem, setProblem] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProblem = async () => {
      setLoading(true);
      const { data } = await Axios.get(`/get-one/${id}`);
      setLoading(false);
      setProblem(data);
    };

    loadProblem();
    // Clean up
    return () => setProblem(initialState);
  }, [id]);

  const handleChange = (e) => {
    setProblem({ ...problem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.put(`/add-response/${id}`, problem);
    await loadProblems();
    history.push("/problems");
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <h1 className="text-center mt-3">Add Response</h1>
      <Row className="justify-content-md-center mt-5">
        <Col lg={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Client Name"
                  name="name"
                  defaultValue={problem.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Age :</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter Client Age"
                  name="age"
                  defaultValue={problem.age}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Check
                required
                type="radio"
                name="sex"
                id="1"
                inline
                label="Male"
                checked={problem.sex === "male"}
                value="male"
                onChange={handleChange}
              />
              <Form.Check
                required
                type="radio"
                name="sex"
                id="2"
                inline
                label="Female"
                checked={problem.sex === "female"}
                value="female"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>City :</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter Client City"
                name="city"
                defaultValue={problem.city}
                onChange={handleChange}
              >
                {cities.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group aria-required>
              <Form.Check
                required
                type="radio"
                name="phoneType"
                id="12"
                inline
                label="Land Line"
                checked={problem.phoneType === "Land Line"}
                value="Land Line"
                onChange={handleChange}
              />
              <Form.Check
                required
                type="radio"
                name="phoneType"
                id="21"
                inline
                label="Mobile"
                checked={problem.phoneType === "Mobile"}
                value="Mobile"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>PhoneNumber :</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                defaultValue={problem.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <FormGroup>
              <Form.Label>problems :</Form.Label>
              <Multiselect
                options={problemType}
                onSelect={(v) => setProblem({ ...problem, problems: v })}
                onRemove={(v) => setProblem({ ...problem, problems: v })}
                displayValue="name"
                // disable={true}
                closeIcon="cancel"
                selectedValues={problem.problems}
              />
            </FormGroup>

            <Form.Group controlId="response">
              <Form.Label>Add Response :</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Response"
                name="response"
                defaultValue={problem.response}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="my-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Response;
