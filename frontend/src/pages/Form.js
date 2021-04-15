import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router";
import { problemType, cities } from "../data";
import Axios from "axios";
import { AppContext } from "../context/appContext";

const initialState = {
  name: "",
  age: "",
  sex: "",
  city: "Cairo",
  phoneType: "",
  phoneNumber: "",
  problems: [],
};

const CreateProblem = () => {
  const { user } = useContext(UserContext);
  const { loadProblems } = useContext(AppContext);
  const history = useHistory();

  const [problem, setProblem] = useState(initialState);

  useEffect(() => {
    if (!user.token) {
      history.push("/login");
    }
  }, [history, user]);

  const handleChange = (e) => {
    setProblem({ ...problem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProblem = {
      name: problem.name,
      age: problem.age,
      city: problem.city,
      sex: problem.sex,
      phoneNumber: problem.phoneNumber,
      phoneType: problem.phoneType,
      problems: problem.problems, // problems.map((p) => p.name)
      createdBy: user._id,
      date: new Date().toLocaleString(),
    };
    console.log(newProblem);
    await Axios.post("/create", newProblem);
    await loadProblems();
    if (user.isAdmin) {
      history.push("/dashboard");
    } else {
      history.push(`/profile/${user._id}`);
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-3">Create a Problem!</h1>
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
                  value={problem.name}
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
                  value={problem.age}
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
                value="female"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>City :</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter Client Age"
                name="city"
                value={problem.city}
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
                value={problem.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Label>problems :</Form.Label>
            <Multiselect
              options={problemType}
              onSelect={(v) => setProblem({ ...problem, problems: v })}
              onRemove={(v) => setProblem({ ...problem, problems: v })}
              displayValue="name"
              closeIcon="cancel"
            />

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProblem;
