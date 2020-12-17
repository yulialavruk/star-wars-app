import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile/:id" component={Profile} />
      </Container>
    </BrowserRouter>
  );
};

export default App;
