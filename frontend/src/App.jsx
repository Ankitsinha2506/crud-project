import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    address: ''
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_BASE_URL, formData);
      setUsers([response.data, ...users]);
      setFormData({ name: '', email: '', phone: '', age: '', address: '' });
      setSuccess('User created successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Update user
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/${editingUser._id}`, formData);
      setUsers(users.map(user => user._id === editingUser._id ? response.data : user));
      setFormData({ name: '', email: '', phone: '', age: '', address: '' });
      setEditingUser(null);
      setSuccess('User updated successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        setUsers(users.filter(user => user._id !== id));
        setSuccess('User deleted successfully!');
        setError('');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete user');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  // Edit user
  const editUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      age: user.age || '',
      address: user.address || ''
    });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', phone: '', age: '', address: '' });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>User Management System</h1>
        <p>Create, Read, Update, and Delete users with ease</p>
      </div>

      {/* Alert Messages */}
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {/* User Form */}
      <div className="card">
        <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={editingUser ? updateUser : createUser}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="0"
              max="120"
              placeholder="Enter age"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
          </div>

          <div>
            {editingUser ? (
              <>
                <button type="submit" className="btn btn-success">
                  Update User
                </button>
                <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="card">
        <h2>Users List</h2>
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <h3>No users found</h3>
            <p>Add your first user using the form above!</p>
          </div>
        ) : (
          <div className="users-grid">
            {users.map(user => (
              <div key={user._id} className="user-card">
                <h3>{user.name}</h3>
                <div className="user-info">
                  <p><strong>Email:</strong> {user.email}</p>
                  {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                  {user.age && <p><strong>Age:</strong> {user.age}</p>}
                  {user.address && <p><strong>Address:</strong> {user.address}</p>}
                  <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 