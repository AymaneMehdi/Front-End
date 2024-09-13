'use client';
import { useState } from 'react';

// Define types for the starship data
interface Starship {
  name: string;
  url: string;
  // Add other properties as needed
}

interface StarshipData {
  results: Starship[];
  next?: string;
  previous?: string;
}

// Type the props to ensure proper usage
interface StarshipListProps {
  initialData: StarshipData;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://swapi.dev/api';

function StarshipList({ initialData }: StarshipListProps) {
  const [data, setData] = useState<StarshipData>(initialData);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/starships/?search=${search}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const newData = await res.json();
      setData(newData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (data.next) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(data.next);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const newData = await res.json();
        setData(newData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrevious = async () => {
    if (data.previous) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(data.previous);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const newData = await res.json();
        setData(newData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg border border-white mt-20">
      <h1 className="text-4xl font-bold text-base-content mb-6 text-center">Starship List</h1>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search starships"
          className="input input-bordered w-full md:w-80 border-base-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className={`btn ${loading ? 'btn-disabled' : 'btn-primary'} w-full md:w-auto rounded-lg py-2 px-4 text-white transition duration-300 ease-in-out`}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-error text-center mb-4 font-medium">{error}</p>}

      <ul className="list-disc pl-5 mb-6 space-y-3">
        {data.results.length > 0 ? (
          data.results.map((starship) => (
            <li key={starship.name} className="hover:bg-base-200 rounded-lg p-2">
              <a
                href={`/starship/${starship.url.split('/').slice(-2, -1)[0]}`}
                className="text-primary hover:text-secondary font-medium transition duration-300"
              >
                {starship.name}
              </a>
            </li>
          ))
        ) : (
          <p className="text-base-content text-center">No starships found.</p>
        )}
      </ul>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={!data.previous}
          className={`btn ${!data.previous ? 'btn-disabled' : 'btn-primary'} rounded-lg py-2 px-4 text-white transition duration-300 ease-in-out`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!data.next}
          className={`btn ${!data.next ? 'btn-disabled' : 'btn-primary'} rounded-lg py-2 px-4 text-white transition duration-300 ease-in-out`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StarshipList;
