import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangeStudentRoom = ({ student, onClose }) => {
  const [newRoomNum, setNewRoomNum] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setNewRoomNum(e.target.value);
  };


  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const studentId = student?._id;
      const res = await axios.put(
        `${BASE_URL}/student/change-room/`,
        { studentId: studentId, newRoomNum },
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res?.data?.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
      toast.error(res?.data?.message)
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Change Student&apos;s Room</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>New Room Number</label>
            <input type="text" value={newRoomNum} onChange={handleChange} />
          </div>
          <button type="submit">
            {isSubmitting ? "Changing..." : "Change Room"}
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeStudentRoom;
