
  
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ name, skills, duration, price }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${name}`, { state: { name, skills, duration, price } });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h3 className="text-xl font-semibold mb-4">{name}</h3>
      <p className="text-gray-600 mb-6">
        Skills to Offer: {skills}
      </p>
      <div className="mb-4">
        <p>{duration}</p>
        <p>${price}</p>
      </div>
      <button
        onClick={handleBookNow}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
      >
        Book Now
      </button>
    </div>
  );
}

  