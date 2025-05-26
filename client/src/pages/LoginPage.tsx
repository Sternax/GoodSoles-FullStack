const LoginPage = () => {
  return (
    <div>
      <form action="http://localhost:8080/login" method="post">
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            name="email"
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
    </div>
  );
};

export default LoginPage;
