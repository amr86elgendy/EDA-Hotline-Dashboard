import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import Axios from "axios";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await Axios.post("/login", { email, password });
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      if (data.token && !data.isAdmin) {
        history.push("/create");
      }
      if (data.token && data.isAdmin) {
        history.push("/dashboard");
      }
      setUser(data);
    } catch (error) {
      console.log(error.response.data.err);
      setLoading(false);
      setError(error.response.data.err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          {!loading && <h1 className="mb-5"><i className="fas fa-user"></i> Log In</h1>}
          {error && <Error variant="danger">{error}</Error>}
          {loading ? (
            <Loading />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Log In
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
