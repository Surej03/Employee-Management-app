import React, { useEffect, useContext, useState } from "react";
import UserContext from '../../Context/Context'
import Sidebar from "./Sidebar";
import axios from "axios";
import "./UserProfile.css";
import user_profile from "../SidebarComp/userprofile.png";
import SignOut from "../../Components/LoginSignUp/SignOut";

const UserProfile = () => {
  const {user, setUser} = useContext(UserContext);

  const getuser = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"))
      if (!token) {
        console.log("No token found");
        return;
      }

      // const response = await axios.get("/profile", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      setUser(user);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      getuser();
    }
  }, [user]);

  return (
    <div>
      <Sidebar />
      <div className="userprofile">
        <div className="userprofile-img">
          <img src={user_profile} alt="User profile" />
        </div>
        {user ? (
          <div className="userdataentry">
            {/* <p>Name: {user.firstName} {user.lastName}</p> */}
            <p>Email: {user.email}</p>
            <p>Username: {user.userName}</p>
            <p>
              <button onClick={SignOut} className="signout-btn">
                Sign out
              </button>
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;