"use client";
import UserForm from "./UserForm";
import { useState, useEffect } from "react";

const UserCreate = () => {
  const [userData, setUserData] = useState({
    avatar: "",
    firstname: "",
    lastname: "",
    department: "",
    email: "",
    role: ""
  });
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    department: "",
    email: "",
    password: "",
    role: ""
  });
  return (
    <div className="m-5 p-16 bg-base-100 rounded-lg shadow">
      <div className="flex flex-col gap-10">
        
      </div>
    </div>
  )
}

export default UserCreate