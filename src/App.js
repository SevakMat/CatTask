import HomePage from "./components/homePage/homePage";
import { Route } from "react-router-dom";

function App() {
  return (
    <Route path = '/'>
      <HomePage/>
    </Route>
  );
}

export default App;
