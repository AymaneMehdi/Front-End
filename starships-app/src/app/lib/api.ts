export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://swapi.dev/api';

export async function fetchStarships(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}