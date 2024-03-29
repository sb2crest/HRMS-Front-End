import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/user-list/UserList";
import SingleUser from "./pages/single-user/SingleUser";
import User from "./pages/new-user/User";
import PayrollForm from "./pages/payroll/PayrollForm";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import OfferLetter from "./pages/offer-letter/OfferLetter";
import HikeForm from "./pages/hike-letter/HikeForm";
import AddEmployee from "./pages/add-employee/AddEmployee";
import Appointment from "./pages/appointment/Appointment";
import PaySlip from "./pages/payroll/PaySlip";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/newuser" element={<User />} />
          <Route path="/singleuser" element={<SingleUser />} />
          <Route path="/payroll" element={<PayrollForm />} />
          <Route path="/offerletter" element={<OfferLetter />} />
          <Route path="/hikeletter" element={<HikeForm />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/payslip" element={<PaySlip />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
