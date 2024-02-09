import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function App() {
  return (
    <div>
      hello , my name is NAVo montoia , you killed my father , prepare to die
      <br></br>
      or use the nav bar to navigate , ur choice
      <Nav></Nav>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
