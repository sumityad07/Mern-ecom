import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { isAuthenticate, token, user, userProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticate) {
      navigate("/login");
    } else {
      (async () => {
        await userProfile();
        setLoading(false);
      })();
    }
  }, [isAuthenticate, navigate, userProfile]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card p-4 shadow-lg" style={{ backgroundColor: "#1c1c1c", borderRadius: "1rem", width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "yellow" }}>User Profile</h2>
        <div className="mb-3">
          <h5 >Name: <span style={{ color: "white" }}>{user?.name}</span></h5>
          <h5>Email: <span style={{ color: "white" }}>{user?.email}</span></h5>
        </div>
        <button className="btn btn-warning w-100 fw-bold" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
