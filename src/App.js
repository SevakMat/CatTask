import HomePage from "./components/homePage";
import { Route } from "react-router-dom";

function App() {
  return (
    <Route path = '/homepage/:category?'>
      <HomePage/>
    </Route>
  );
}

export default App;
