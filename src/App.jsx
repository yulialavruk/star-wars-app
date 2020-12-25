import { BrowserRouter, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Route exact path="/" component={Home} />
        <Route path="/profile/:id" component={Profile} />
      </Container>
    </BrowserRouter>
  );
};

export default App;
