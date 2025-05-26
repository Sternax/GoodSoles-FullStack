import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import './ProfilePage.css';

const ProfilePage = () => {
  const userId = localStorage.getItem('userId') || '';

  const [form, setForm] = useState({
    id: userId,
    firstname: '',
    lastname: '',
    dateofbirth: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/profile/${userId}`);
        const result = await response.json();
        if (result.success) {
          setForm({
            id: userId,
            firstname: result.data.firstname || '',
            lastname: result.data.lastname || '',
            dateofbirth: result.data.dateofbirth || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(
          'An error occurred while fetching the profile. Please try again.',
        );
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log('Form submitted:', form);

    try {
      const response = await fetch('http://localhost:8080/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(form).toString(),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error(
          result.message || 'Profile update failed. Please try again.',
        );
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('An error occurred while updating the profile. Please try again.');
    }
  };

  if (loading) return <p>Loading Profile...</p>;

  return (
    <div className="profilePageContainer">
      <h1>Profile Page</h1>
      <Avatar />
      {!isEditing ? (
        <div>
          <p>
            <strong>First Name:</strong>
            {form.firstname}
          </p>
          <p>
            <strong>Last Name:</strong>
            {form.lastname}
          </p>
          <p>
            <strong>Date of Birth:</strong>
            {form.dateofbirth}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            {' '}
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            {' '}
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            {' '}
            <label htmlFor="dateofbirth">Date of Birth:</label>
            <input
              type="date"
              id="dateofbirth"
              name="dateofbirth"
              value={form.dateofbirth}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel Edit
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
