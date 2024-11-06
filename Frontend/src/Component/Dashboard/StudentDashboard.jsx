import React, { useState } from "react";

const studentData = [
  {
    id: 1,
    studentName: "Jessica Smith",
    email: "jessicasmith@gmail.com",
    idNumber: '12345',
    gender: "Female",
    age: "20",
    nationality: "American",
  },
  {
    id: 2,
    studentName: "John Doe",
    email: "johndoe.fr",
    gender: "Male",
    idNumber: '67890',
    age: "22",
    nationality: "British",
  },
  {
    id: 3,
    studentName: "Maria Garcia",
    email: "mariagarcia@gmall.com",
    gender: "Male",
    idNumber: '54321',
    age: "25",
    nationality: "Spanish",
  },
];

const StudentDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState(studentData);
    const [filteredData, updateFilteredData] = useState(studentData);
    const [isSideBarToggled, setIsSideBarToggled] = useState(false);

    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = students.filter((student) => 
            student.studentName.toLowerCase().includes(term) || student.email.toLowerCase().includes(term) || student.nationality.toLowerCase().includes(term) 
        )
        updateFilteredData(filtered)
    }

    const handleDelete = (studentId) => {
        const updatedUsers = students.filter((student) => student.id !== studentId)
        setStudents(updatedUsers);
        const updatedFilterData = filteredData.filter((student) => student.id !== studentId);
        updateFilteredData(updatedFilterData)
    }
  return (
    <div></div>
  )
};

export default StudentDashboard;
