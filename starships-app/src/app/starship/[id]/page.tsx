import { fetchStarships } from '../../lib/api';

// Define the type for the params
interface Params {
  id: string;
}

// Define the type for the starship data
interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  // Add other properties as needed
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://swapi.dev/api';

// Define the component with typed params
export default async function Starship({ params }: { params: Params }) {
  const { id } = params;
  const starship: Starship = await fetchStarships(`${API_BASE_URL}/starships/${id}/`);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg mt-20">
      <h1 className="text-2xl font-bold mb-2">{starship.name}</h1>
      <p className="text-lg mb-1">Model: <span className="font-semibold">{starship.model}</span></p>
      <p className="text-lg">Manufacturer: <span className="font-semibold">{starship.manufacturer}</span></p>
    </div>
  );
}
