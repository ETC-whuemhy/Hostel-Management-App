import React, { useEffect, useState } from "react";
import "./AdminPreview.css";
import UserTable from "./UserTable";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

// const adminData = [
//   { id: 1, name: "Muby", email: "muby@gmail.com", role: "Admin" },
//   { id: 2, name: "Teddy", email: "teddy@gmail.com", role: "Admin" },
//   { id: 3, name: "OG", email: "og@gmail.com", role: "Member" },
//   { id: 4, name: "Chapo", email: "chapo@gmail.com", role: "Admin" },
//   { id: 5, name: "Opera", email: "opera@gmail.com", role: "Admin" },
//   { id: 6, name: "Rodiyat", email: "rodiyat@gmail.com", role: "Member" },
// ];


const BASE_URL =import.meta.env.VITE_BASE_URL;


const AdminPreview = () => {
  const [search, setSearch] = useState("");
    const [admins, setAdmins] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/`, {
          withCredentials: true,
        });
        const data = response.data;
        setFilteredData(data);
        setAdmins(data)
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
      } finally {
        setIsLoading(false);
        toast.error(error?.response?.data?.msg);
      }
    };
    fetchAdmins();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filtered = admins.filter(
      (admin) =>
        admin.fullname.toLowerCase().includes(term) ||
        admin.email.toLowerCase().includes(term) ||
        admin.role.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (adminId) => {
    
    try {
        await axios.delete( `${BASE_URL}/admin/${adminId}`, {withCredentials: true})
        
        const updatedFilterData = filteredData.filter(
            (admin) => admin._id !== adminId
          );
          setFilteredData(updatedFilterData);
          toast.success("Admin deleted successfully")
    } catch (error) {
        console.log(object);
        toast.error(error?.response?.data?.msg);
    }
  };

  const handleUpdateRole = async (adminId, newRole) => {
    try {
       await axios.patch(
        `${BASE_URL}/admin/${adminId}`,
        { role: newRole },
        { withCredentials: true }
      );

      const updatedFilteredRole = filteredData.map((admin) =>
        admin._id === adminId ? { ...admin, role: newRole } : admin
      );
      setFilteredData(updatedFilteredRole);
      toast.success("Admin updated successfully")
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
    }
  };

  if (isLoading)
    return (
      <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
    );

  return (
    <>
      <div className="__prevCon">
        <h2 className="__prevHeader">Admins</h2>
        <div className="__prevSearchCon">
          <CiSearch className="__prevSearchIcon" />
          <input
            type="text"
            className="__prevSearch"
            placeholder="Search by name, email or role"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="__prevList">
          <UserTable
            data={filteredData}
            onDelete={handleDelete}
            onUpdateRole={handleUpdateRole}
          />
        </div>
        <div className="__inviteBtnCon">
          <button className="__inviteBtn">Invite Admin</button>
        </div>
      </div>
    </>
  );
};

export default AdminPreview;
