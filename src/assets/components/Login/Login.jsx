import { useState } from 'react';
import './Login.css';
import { supabase } from '../../../../src/Supabase/Client';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = "admin3256@gmail.com";

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const showTab = (tab) => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("⚠️ Please enter both email and password.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("❌ Your email or password is incorrect.");
      } else {
        setError(`❌ ${error.message}`);
      }
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const userEmail = userData?.user?.email;

    if (userEmail === ADMIN_EMAIL) {
      navigate('/admin');
    } else {
      navigate('/customer');
    }

    if (onClose) onClose();
  };

  return (
    <div className="container">
      <div className="card">
        <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 24 24"
            style={{ verticalAlign: 'middle', marginRight: '5px', marginBottom: '5px', cursor: 'pointer' }}
          >
            <path d="M12 1a5 5 0 0 0-5 5v4H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 5a3 3 0 1 1 6 0v4H9V6zm4 9.73V18a1 1 0 1 1-2 0v-2.27a2 2 0 1 1 2 0z" />
          </svg>
          Portal Login
        </h1>

        <p className="subtitle">Manage your automotive business with ease.</p>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => showTab('admin')}
          >
            Admin Login
          </button>
          <button
            className={`tab ${activeTab === 'customer' ? 'active' : ''}`}
            onClick={() => showTab('customer')}
          >
            Customer Login
          </button>
        </div>

        <div className="tab-content">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

        </div>

        {error && <div className="notification error">❌ {error}</div>}

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {/* <button
          className="logout-btn"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate('/');
          }}
        >
          Sign Out
        </button> */}

        {onClose && (
          <button
            onClick={onClose}
            className="close-btn"
            style={{
              marginTop: '1rem',
              background: 'transparent',
              border: 'none',
              color: '#555',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline'
            }}
          >
            Cancel Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
