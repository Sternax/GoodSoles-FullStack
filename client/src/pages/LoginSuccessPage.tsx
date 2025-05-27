import { Link } from 'react-router-dom';
import './LoginSuccessPage.css';

const LoginSuccessPage = () => {
  return (
    <div className="loginSuccess">
      <h1>LOGIN SUCCESSFULL</h1>
      <Link to="/login">
        <button>SIGN IN</button>
      </Link>
    </div>
  );
};

export default LoginSuccessPage;
