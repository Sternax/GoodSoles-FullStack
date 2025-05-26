import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      username: string;
      password: string;
    };

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString(),
      });

      const result = await response.json();
      if (result.success) {
        navigate('/login');
        toast.success('Registration successful! Please log in.');
      } else {
        toast.error(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} method="post">
        <div className="form-group">
          <label htmlFor="username">E-mail</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="**********"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default RegisterPage;
