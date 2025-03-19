import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyPets = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const { user, token } = useSelector((state) => state.auth); // Get user and token

useEffect(() => {
 
  if (!token) {
    console.error("No user token found, cannot fetch pets.");
    return;
  }

  const fetchMyPets = async () => {
    try {
      console.log("Using token:", token); // Debugging

      const response = await axios.get("http://localhost:5000/api/adoptions/my-pets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdoptedPets(response.data);
    } catch (error) {
      console.error("Error fetching adopted pets:", error.response?.data?.message || error.message);
    }
  };

  fetchMyPets();
}, [token]);

  return (
    <div>
      <h2>My Adopted Pets</h2>
      {adoptedPets.length > 0 ? (
        adoptedPets.map((adoption) => (
          <div key={adoption.pet._id}>
            <h3>{adoption.pet.name}</h3>
            <img src={`http://localhost:5000${adoption.pet.image}`} alt={adoption.pet.name} width="200" />
          </div>
        ))
      ) : (
        <p>No adopted pets yet.</p>
      )}
    </div>
  );
};

export default MyPets;
