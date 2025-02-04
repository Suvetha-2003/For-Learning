import React from 'react';
import "./Task1.css";
import { useState } from 'react';

function Task1() {
    const [name, setName] = useState("");
      const [age, setAge] = useState("");
      const [sub, setSub] = useState("");
      const [students, setStudents] = useState([]); 
      const [editingIndex, setEditingIndex] = useState(null); 
      function handleSubmit(e) {
        e.preventDefault();
        if (editingIndex !== null) {
          const updatedStudents = [...students];
          updatedStudents[editingIndex] = { name, age, sub };
          setStudents(updatedStudents);
          setEditingIndex(null); 
        } else {
          setStudents([...students, { name, age, sub }]);
        }
        setName("");
        setAge("");
        setSub("");
      }
      function handleEdit(index) {
        const student = students[index];
        setName(student.name);
        setAge(student.age);
        setSub(student.sub);
        setEditingIndex(index); 
      }
      function handleDelete(index) {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
      }
  return (
    <div><h2>Student Details</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="text" placeholder="Enter your Subject name" value={sub} onChange={(e) => setSub(e.target.value)} required />
      <button type="submit">{editingIndex !== null ? "Update" : "Submit"}</button>
    </form>
    {students.length > 0 && (
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.sub}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)} style={{ marginLeft: "10px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </div>
  );
}

export default Task1