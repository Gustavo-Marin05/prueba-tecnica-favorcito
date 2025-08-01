import { useState } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';



//componente que solo me permite la busqueda de un pais y ciudad
export default function Search() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  //solo nos direcciona a getweather
  const getWeather = useWeatherStore((state) => state.getWeather);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && country.trim()) {
      getWeather(city.trim(), country.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 p-4">
      <input
        type="text"
        placeholder="Ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full md:w-1/3"
      />
      <input
        type="text"
        placeholder="País"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full md:w-1/3"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Buscar
      </button>
    </form>
  );
}

