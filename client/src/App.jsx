import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './Components/LoginSignUp/SignIn';
import SignUp from './Components/LoginSignUp/SignUp';
import ForgotPassword from './Components/LoginSignUp/ForgotPassword';
import Employeemgmt from './Homepage/Employeemgmt';
import PrivateRoute from './PrivateRoute';
import SignOut from './Components/LoginSignUp/SignOut';
import UserProfile from './Homepage/SidebarComp/UserProfile';
import HomeInstructions from './Homepage/SidebarComp/HomeInst';
import MyEmployees from './Homepage/SidebarComp/MyEmployees';
import AllEmployees from './Homepage/SidebarComp/AllEmployees';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/signin" />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        {/* <Route path='/homepage' element= {<Employeemgmt/>}/> */}
        <Route path="/homepage" element={<PrivateRoute><Employeemgmt /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><HomeInstructions /></PrivateRoute>} />
        <Route path="/user/employees" element={<PrivateRoute><MyEmployees /></PrivateRoute>} />
        <Route path="/allemployees" element={<PrivateRoute><AllEmployees /></PrivateRoute>} />
      </Routes>
    </>
  );
}
export default App;
