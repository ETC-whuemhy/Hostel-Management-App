import React, { useContext, useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";


const BASE_URL = import.meta.env.VITE_BASE_URL;

const override = {
    display: "block",
    margin: "100px auto",
  };


  

const StudentReg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    nationality: "",
    g_name: "",
    g_email: "",
    gender: "",
    roomNum: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        email,
        name,
        age,
        nationality,
        g_name,
        g_email,
        gender,
        roomNum,
      } = formData;

      if (
        !name ||
        !email ||
        !gender ||
        !nationality ||
        !age ||
        !g_name ||
        !g_email ||
        !roomNum
      ) {
        toast.error("oops! All fields are required");
        return;
      }

      setIsSubmitting(true);

      const response = await axios.post(
        `${BASE_URL}/student/register-student`,
        formData,
        { withCredentials: true }
      );

      if (response.data) {
        setIsSubmitting(false);
        toast.success("Registration successful");
        setIsLoading(true);
        navigate("/student-dash");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
      setIsLoading;
    }
  };

  
  return (
    <>
      {isLoading ? (
        <ClipLoader color="" cssOverride={override} loading={isLoading} />
      ) : (
        <div className="container form__ --100vh">
          <div className="form-container">
            <p className="title">Register a new student</p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="--dir-column">
                <label htmlFor="name">Student's Name:</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="email">Age:</label>
                <input
                  type="number"
                  className="input"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter Your Age"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="email">Room Number:</label>
                <input
                  type="number"
                  className="input"
                  name="roomNum"
                  value={formData.roomNum}
                  onChange={handleInputChange}
                  placeholder="Enter Your Room Number"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="email">Contact Email:</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="--dir-column">
                <label htmlFor="email">Nationality:</label>
                <input
                  type="text"
                  className="input"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="email">Gender:</label>
                <select
                  type="text"
                  className="input"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  required
                >
                  <option value={"select"}>select</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Other"}>Other</option>
                </select>
              </div>

              <div className="--dir-column">
                <label htmlFor="name">Guardian's Name:</label>
                <input
                  type="name"
                  className="input"
                  name="g_name"
                  value={formData.g_name}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="email">Guardian's Contact Email:</label>
                <input
                  type="email"
                  className="input"
                  name="g_email"
                  value={formData.g_email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <button disabled={isSubmitting} className="--btn">
                {isSubmitting ? "Adding..." : "Add student"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentReg;
