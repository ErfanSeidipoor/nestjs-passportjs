import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
    fullName: string;
    picture: string;
  }>();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    fullName: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  useEffect(() => {
    const login = () => {
      axios
        .get('http://localhost:5000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          alert(error);
        });
    };

    if (token) login();
  }, [token]);

  const renderLoginForm = () => {
    return (
      <>
        <h1>login Form</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post('http://localhost:5000/auth/login', loginForm)
              .then((res) => {
                setToken(res.data.token);
                setUser(res.data.user);
              })
              .catch((error) => {
                alert(error);
              });
          }}
        >
          <label>username</label>
          <input
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm((loginForm) => ({
                ...loginForm,
                username: e.target.value,
              }))
            }
          />
          <br />
          <label>password</label>
          <input
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm((loginForm) => ({
                ...loginForm,
                password: e.target.value,
              }))
            }
          />
          <br />
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const renderRegisterForm = () => {
    return (
      <>
        <h1>Register Form</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post('http://localhost:5000/auth/register', registerForm)
              .then((res) => {
                setToken(res.data.token);
                setUser(res.data.user);
              })
              .catch((error) => {
                alert(error);
              });
          }}
        >
          <label>username</label>
          <input
            value={registerForm.username}
            onChange={(e) =>
              setRegisterForm((registerForm) => ({
                ...registerForm,
                username: e.target.value,
              }))
            }
          />
          <br />
          <label>password</label>
          <input
            value={registerForm.password}
            onChange={(e) =>
              setRegisterForm((registerForm) => ({
                ...registerForm,
                password: e.target.value,
              }))
            }
          />
          <br />
          <label>full name</label>
          <input
            value={registerForm.fullName}
            onChange={(e) =>
              setRegisterForm((registerForm) => ({
                ...registerForm,
                fullName: e.target.value,
              }))
            }
          />
          <br />
          <button type="submit">register</button>
        </form>
      </>
    );
  };

  const renderGoogle = () => {
    return (
      <button
        onClick={() =>
          window.open('http://localhost:5000/auth/login/google', '_self')
        }
      >
        Login with google
      </button>
    );
  };

  const renderDiscord = () => {
    return (
      <button
        onClick={() =>
          window.open('http://localhost:5000/auth/login/discord', '_self')
        }
      >
        Login with discord
      </button>
    );
  };

  const renderProfile = () => {
    return (
      <>
        <h1>{'User Information:'}</h1>
        <h3>token:{token}</h3>
        <h3>id:{user?.id}</h3>
        <h3>username:{user?.username}</h3>
        <h3>email:{user?.email}</h3>
        <h3>fullName:{user?.fullName}</h3>
        <img
          src={user?.picture}
          alt={user?.fullName}
          width={120}
          height={120}
        />
      </>
    );
  };

  return (
    <div className="App">
      {renderDiscord()}
      {renderGoogle()}
      {renderLoginForm()}
      {renderRegisterForm()}
      {renderProfile()}
    </div>
  );
}

export default App;
