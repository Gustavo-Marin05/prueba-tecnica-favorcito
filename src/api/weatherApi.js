import axios from "axios";

// con esto estamos obteniendo las coordenadas de la ciudad y su pais con  Nominatim
export const getCoordinates = async (cityName, countryName) => {
  const res = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      city: cityName,
      country: countryName,
      format: "json",
      limit: 1,
    },
  });

  const data = res.data;

  if (!data || data.length === 0) {
    throw new Error("La ciudad no se encontro");
  }

  const { lat, lon} = data[0];

  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
    city: `${cityName}, ${countryName}`,
  };
};

// es el clima actual
export const getWeatherData = async (lat, lon) => {
  const res = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      timezone: 'auto',
      current: "temperature_2m,wind_speed_10m",
      daily: "temperature_2m_max,temperature_2m_min,weathercode", 

      
    },
  });

  return res.data;
};

//obtiene las coordenadas y luego el clima
export const Weather = async (city, country) => {
  const { latitude, longitude, city: fullName } = await getCoordinates(city, country);
  const weatherData = await getWeatherData(latitude, longitude);

  return {
    city: fullName,
    latitude,
    longitude,
    current: weatherData.current,
    daily: weatherData.daily,
  };
};