// import React, { useState } from 'react';
// import { Box, Typography, TextField, Button, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import reg from "../assets/img2.jpeg"; 

// function Register({ setUser }) {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3001/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setUser({ id: data.userId, email: form.email, name: form.name });
//         navigate("/feed");
//       } else {
//         alert(data.error || "Registration failed");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("Registration error");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: '100vw', height: '100vh', backgroundImage: url(${reg}),backgroundSize: 'cover',backgroundPosition: 'center',display: 'flex',alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           width: '100',
//           p: 4,
//           bgcolor: 'rgba(255, 255, 255, 0.9)',
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h4" gutterBottom align="center"> Register</Typography>
// <form onSubmit={handleSubmit} autoComplete="off">
//     <TextField fullWidth margin="normal" label="Username" name="username" value={form.username} onChange={handleChange} required
//             autoComplete="off"
//           />
//           <TextField fullWidth margin="normal" label="Email" type="email" name="email" value={form.email} onChange={handleChange} required
//             autoComplete="off"
//           />
//           <TextField fullWidth margin="normal" label="Password" type="password" name="password" value={form.password} onChange={handleChange} required
//             autoComplete="new-password" />
//           <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}> Register</Button>
//         </form>

//         <Typography variant="body2" align="center" sx={{ mt: 2 }}>  Already have an account?{' '}
//           <Link href="/login" underline="hover"> Login here</Link>
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import reg from "../assets/img2.jpeg"; 

function Register({ setUser }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({ id: data.userId, email: form.email, name: form.username });
        navigate("/feed");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration error");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
         backgroundImage:`url(${reg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          minWidth: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Register</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#007BFF", textDecoration: "none" }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;