import { fetchStarships } from './lib/api';
import StarshipList from './components/StarshipList';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://swapi.dev/api';

export default async function Home() {
  const data = await fetchStarships(`${API_BASE_URL}/starships/`);
  return <StarshipList initialData={data} />;
}