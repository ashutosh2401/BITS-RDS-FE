"use client";
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    position: "",
    orgId: "",
    verticalId: ""
  });

  const [organizations, setOrganizations] = useState([]);
  const [verticals, setVerticals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/v1/organizations");
        setOrganizations(response.data);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    };
    fetchOrganizations();
  }, []);

  const fetchVerticals = async (orgId: string) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/verticals/by-org/${orgId}`);
      setVerticals(response.data);
    } catch (error) {
      console.error("Failed to fetch verticals:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === "orgId") {
      setFormData(prev => ({ ...prev, verticalId: "" })); // reset vertical
      fetchVerticals(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const requestBody = {
      firstName: formData.fullName.split(" ")[0] || "",
      lastName: formData.fullName.split(" ").slice(1).join(" ") || "",
      email: formData.email,
      password: formData.password,
      employeeId: formData.employeeId,
      orgId: formData.orgId,
      verticalId: formData.verticalId,
    };

    try {
      const response = await axios.post("http://localhost:8081/api/v1/auth/register", requestBody, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      alert("Registration successful!");
      console.log("Server Response:", response.data);
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
            { label: "Employee ID", name: "employeeId", type: "text" },
            { label: "Position", name: "position", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
          ))}

          {/* Organization Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization</label>
            <select
              name="orgId"
              value={formData.orgId}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">Select Organization</option>
              {organizations.map((org: any) => (
                <option key={org.orgId} value={org.orgId}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          {/* Vertical Dropdown - only show if org is selected */}
          {formData.orgId && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Vertical</label>
              <select
                name="verticalId"
                value={formData.verticalId}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="">Select Vertical</option>
                {verticals.map((vert: any) => (
                  <option key={vert.verticalId} value={vert.verticalId}>
                    {vert.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
