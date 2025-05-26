import { Link, useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      username: string;
      password: string;
    };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString(),
      });

      const result = await response.json();
      if (result.success) {
        navigate('/login-success');
        toast.success('Login successful!');
      } else {
        // alert(result.message || 'Login failed. Please try again.');
        toast.error(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          E-mail
          <input
            type="username"
            id="username"
            name="username"
            placeholder="example@example.com"
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">REGISTER HERE</Link>.
      </p>
    </div>
  );
};

export default LoginPage;
