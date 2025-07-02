import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const id = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      const res = await axios.get(`https://shop-backend-svqa.onrender.com/api/auth/me/${id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 mt-10 rounded">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
