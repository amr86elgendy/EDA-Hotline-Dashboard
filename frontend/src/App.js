import { useContext, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import { Route, Switch, useHistory } from "react-router-dom";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import { UserContext } from "./context/userContext";
import Problems from "./pages/ProblemsList";
import Profile from "./pages/Profile";
import Response from "./pages/Response";

const App = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    // console.log('useEffect App run');
    if (!user.token) {
      history.push("/login");
    } else {
      if (user.isAdmin) {
        history.push("/dashboard")
      } else {
        history.push("/create")
      }
    }
  }, [history, user]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create">
          <Form />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/problems">
          <Problems />
        </PrivateRoute>
        <PrivateRoute path="/response/:id" >
          <Response />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default App;
