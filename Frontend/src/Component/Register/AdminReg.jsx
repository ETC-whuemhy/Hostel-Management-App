import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All, BsDisplay } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const override = {
  display: "block",
  margin: "100px auto",
};


const BASE_URL = import.meta.env.VITE_BASE_URL;


const AdminReg = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValidMessage, setformValidMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const timesIcon = <FaTimes color="red" size={20} />;
  const checkIcon = <BsCheck2All color="green" size={20} />;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const password = formData.password;
    setUCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password));
    setNum(/([0-9])/.test(password));
    setSChar(/([!,%,&,@,#,_,*])/.test(password));
    setPasswordLength(password.length > 5);
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { fullname, email, password, password2 } = formData;

      if (!fullname || !email || !password || !password2) {
        setformValidMessage("oops! All fields are required");
        return;
      }

      if (password != password2) {
        setformValidMessage("oops! password does not match");
        return;
      }

      setIsSubmitting(true);
      setLoading(true)

      const response = await axios.post(
        `${BASE_URL}/admin/register`,
        formData,
        { withCredentials: true }
      );

      if (response.data) {
        const adminInfo = response.data;
        setLoading(false)
        setUser(adminInfo);
        setIsSubmitting(false);
        setFormCompleted(true);
        toast.success("Registration successful");
        navigate("/home-dash", { state: { user: response.data } });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error?.response?.data.msg)
      const message =
        error?.response?.data?.msg?
        `${error.response.data.msg}` : "internal server error"

          setformValidMessage(message)
          setLoading(false)
    }
  };

  const handlePastePassword = (e) => {
    e.preventDefault();
    toast.error("cannot paste into this field")
    return;
  }

  return (
    
    <>
    {loading ? (<ClipLoader color="" cssOverride={override} loading={loading}/>) : (
          <div className="container form__ --100vh">
          <div className="form-container">
            <p className="title">Create an Account</p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="--dir-column">
                <label htmlFor="fullname">Full Name:</label>
                <input
                  type="text"
                  className="input"
                  name="fullname"
                  placeholder="Enter Your Full Name"
                  value={formData.value}
                  onChange={handleInputChange}
                  required
                />
              </div>
    
              <div className="--dir-column">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
    
              <div className="--dir-column">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={handleInputChange}
                  required
                />
              </div>
    
              <div className="--dir-column">
                <label htmlFor="password">Confirm Password:</label>
                <input
                  type="password"
                  className="input"
                  name="password2"
                  placeholder="Comfirm Password"
                  value={formData.password2}
                  onPaste={handlePastePassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
    
              <div className="card">
                <ul>
                  <li className="indicator">
                    <span> {switchIcon(uCase)} &nbsp; Lowercase & Uppercase</span>
                  </li>
                  <li className="indicator">
                    <span> {switchIcon(num)} &nbsp; Number (0 - 9)</span>
                  </li>
                  <li className="indicator">
                    <span>
                      {" "}
                      {switchIcon(sChar)} &nbsp; Special Characters (!"£$^&*@~#)
                    </span>
                  </li>
                  <li className="indicator">
                    <span>
                      {" "}
                      {switchIcon(passwordLength)} &nbsp; Minimum of 6 characters
                    </span>
                  </li>
                </ul>
              </div>
              <button className="--btn" disabled={isSubmitting}>
                {isSubmitting ? "signing you up" : "Create Account"}
              </button>
            </form>

            {formValidMessage && <p> {formValidMessage} </p>}


            <p className="account">
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
    )}
    
    </>
  );
};

export default AdminReg;
