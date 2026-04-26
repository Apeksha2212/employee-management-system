import React, { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../services/api";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const loadEmployees = () => {
    getEmployees().then(res => setEmployees(res.data));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = () => {
    if (!name || !email || !department || !salary) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      name,
      email,
      department,
      salary: Number(salary)
    };

    addEmployee(data).then(() => {
      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
      loadEmployees();
    });
  };

  const handleDelete = (id: number) => {
    deleteEmployee(id).then(() => loadEmployees());
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Employee Management</h2>

      {/* FORM CARD */}
      <div style={cardStyle}>
        <h3>Add Employee</h3>

        <input
          style={inputStyle}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter Name"
        />

        <input
          style={inputStyle}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter Email"
        />

        <input
          style={inputStyle}
          value={department}
          onChange={e => setDepartment(e.target.value)}
          placeholder="Enter Department"
        />

        <input
          style={inputStyle}
          value={salary}
          onChange={e => setSalary(e.target.value)}
          placeholder="Enter Salary"
        />

        <button style={buttonStyle} onClick={handleAdd}>
          Add Employee
        </button>
      </div>

      {/* TABLE */}
      <div style={{ marginTop: "30px" }}>
        <table style={tableStyle}>
          <thead style={tableHeader}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp: any) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>₹{emp.salary}</td>
                <td>
                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const cardStyle: React.CSSProperties = {
  maxWidth: "500px",
  margin: "auto",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse"
};

const tableHeader: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "white"
};

const deleteBtn: React.CSSProperties = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer"
};
