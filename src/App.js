
import './App.css';
import {Route, Routes} from "react-router-dom";
import OrderAdd from "./components/MenuComponents/OrderAdd";
import OrderList from "./components/MenuComponents/OrderList";

function App() {
  return (
      <Routes>
        <Route path={"/list"} element={<OrderList/>}></Route>
        <Route path={"/add"} element={<OrderAdd/>}></Route>
      </Routes>
  );
}

export default App;
