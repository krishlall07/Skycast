// src/api.js

export const fetchCitySuggestions = async (searchQuery) => {
  // If the user hasn't typed anything, return an empty list
  if (!searchQuery.trim()) return [];

  // Your existing WeatherAPI key
  const API_KEY = 'e1abb96ddbc642c9aab212743260804'; 
  
  // WeatherAPI's special search endpoint for autocomplete!
  const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchQuery}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch suggestions");
    
    const data = await response.json();
    return data; // This returns an array of matching cities
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return []; 
  }
};