import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./Dashboard.css";
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import UpdateStudentProfile from "../Modal/UpdateStudentProfile";
import ChangeStudentRoom from "../Modal/ChangeStudentRoom";
import UpdateCheckin from "../Modal/UpdateCheckin";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";

const override = {
  display: "block",
  margin: "100px auto",
};


const BASE_URL = import.meta.env.VITE_BASE_URL;

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSideBarToggled, setIsSideBarToggled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentRoomNumber, setCurrentRooomNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/student/`, {
          withCredentials: true,
        });
        const data = response.data;
        setFilteredData(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch students");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, [filteredData]);

  const filtered = filteredData?.filter(
    (student) =>
      student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student.nationality.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleDelete = async (studentId) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/student/delete/${studentId}`,
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      const updatedFilterData = filteredData.filter(
        (student) => student._id !== studentId
      );
      setFilteredData(updatedFilterData);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };

  const handleModalOpen = (students) => {
    setSelectedStudent(students);
    setCurrentRooomNumber(students?.room?.roomNumber);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedModal("");
    setSelectedStudent(null);
  };

  const handleModalSelect = (modalType) => {
    setSelectedModal(modalType);
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This Student",
      message: "You really wanna delete this student? 🤔",
      buttons: [
        { label: "Delete", onClick: () => handleDelete(id) },
        { label: "Cancel", onClick: () => alert("Deletion Cancelled") },
      ],
    });
  };

  if (isLoading)
    return (
      <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
    );

  return (
    <div>
      {isSideBarToggled && (
        <div className="mobile-side-nav">
          <SideBar />
        </div>
      )}
      <div className="--flex --overflow-hidden">
        <div className="desktop-side-nav">
          <SideBar />
        </div>
        <div className="--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden">
          <main className="--flex-justify-center w-full">
            <div className="right dash-main">
              <div className="--flex-justify-between">
                <p>Students</p>
                {isSideBarToggled ? (
                  <IoCloseOutline
                    className="sidebar-toggle-icon"
                    onClick={() => setIsSideBarToggled(false)}
                  />
                ) : (
                  <IoMenu
                    className="sidebar-toggle-icon"
                    onClick={() => setIsSideBarToggled(true)}
                  />
                )}
              </div>
              <p>Search Students</p>
              <input
                type="text"
                placeholder="Search by name, email or ID Number"
                className="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="table">
                <table className="table_wrapper room-table">
                  <thead className="table__head">
                    <tr className="table__row">
                      <th className="same_class">Student's Name</th>
                      <th className="same_class">Email</th>
                      <th className="same_class">ID Number</th>
                      <th className="same_class">Gender</th>
                      <th className="same_class">Age</th>
                      <th className="same_class">Nationality</th>
                      <th className="same_class">Room No</th>
                      <th className="same_class">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table__body">
                    {filtered.map((student, index) => (
                      <tr key={index} className="table__row">
                        <td className="same_class">{student.name}</td>
                        <td className="same_class">{student.email}</td>
                        <td className="same_class">{student._id}</td>
                        <td className="same_class">{student.gender}</td>
                        <td className="same_class">{student.age}</td>
                        <td className="same_class">{student.nationality}</td>
                        <td className="same_class">
                          {student?.room?.roomNumber}
                        </td>
                        <td className="same_class">
                          <RiDeleteBin6Line
                            size={20}
                            color="red"
                            onClick={() => confirmDelete(student._id)}
                          />
                          &nbsp;&nbsp;
                          <FaPen
                            size={20}
                            color="blue"
                            onClick={() => handleModalOpen(student)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to="/studentreg">
                <button className="btn-secondary">Add a student</button>
              </Link>
            </div>
          </main>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select An Option</h2>
            <button
              className="one"
              onClick={() => handleModalSelect("UpdateStudentProfile")}
            >
              Update Student's Profile
            </button>
            <button
              className="two"
              onClick={() => handleModalSelect("ChangeStudentRoom")}
            >
              Change Student's Room
            </button>
            <button
              className="three"
              onClick={() => handleModalSelect("UpdateCheckin")}
            >
              Update Check In
            </button>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
      {selectedModal === "UpdateStudentProfile" && (
        <UpdateStudentProfile
          student={selectedStudent}
          updateFilteredData={setFilteredData}
          onClose={handleModalClose}
        />
      )}
      {selectedModal === "ChangeStudentRoom" && (
        <ChangeStudentRoom
          student={selectedStudent}
          onClose={handleModalClose}
        />
      )}
      {selectedModal === "UpdateCheckin" && (
        <UpdateCheckin
          student={selectedStudent}
          onClose={handleModalClose}
          currentRoomNumber={currentRoomNumber}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
