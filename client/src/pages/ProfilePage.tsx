import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
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

  const signOut = () => {
    localStorage.removeItem('userId');
    navigate('/login');
    toast.success('You have been signed out successfully.');
  };

  if (loading)
    return (
      <div className="loadingContainer">
        <h3>YOU MUST SIGN IN TO VIEW YOUR PROFILE</h3>
        <Link to="/login">
          <button>SIGN IN</button>
        </Link>
      </div>
    );

  return (
    <div className="profilePageContainer">
      <h1>PROFILE</h1>
      <Avatar className="profileAvatar" sx={{ width: 60, height: 60 }}>
        {form.firstname ? form.firstname.charAt(0).toUpperCase() : ''}
      </Avatar>
      {!isEditing ? (
        <div className="profileDetails">
          <h3>NAME</h3>
          <p>{form.firstname + ' ' + form.lastname}</p>
          <h3>DATE OF BIRTH:</h3>
          <p>{form.dateofbirth}</p>
          <button onClick={() => setIsEditing(true)}>
            EDIT <span>&#9998;</span>
          </button>
          <button onClick={signOut}>SIGN OUT</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="formDiv">
            {' '}
            <label htmlFor="firstname">FIRST NAME</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formDiv">
            {' '}
            <label htmlFor="lastname">LAST NAME</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formDiv">
            {' '}
            <label htmlFor="dateofbirth">DATE OF BIRTH</label>
            <input
              type="date"
              id="dateofbirth"
              name="dateofbirth"
              value={form.dateofbirth}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">SAVE</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            CANCEL EDIT
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
