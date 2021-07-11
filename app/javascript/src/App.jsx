import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";
import { setAuthHeaders } from "apis/axios";
import Container from "components/Container";
import NavBar from "./components/NavBar";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <>
      <Container />
    </>
    // <Router>
    //   <Switch>
    //     <Route exact path="/" render={() => <div>Home</div>} />
    //     <Route exact path="/about" render={() => <div>About</div>} />
    //   </Switch>
    // </Router>
  );
};

export default App;
