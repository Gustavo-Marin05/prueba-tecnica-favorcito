import { create } from 'zustand';
import { Weather } from '../api/weatherService';


export const useWeatherStore = create((set) => ({
  weather: null,
  city: '',
  loading: false,
  error: null,

  getWeather: async (cityName, countryName) => {
    set({ loading: true, error: null });

    try {
      const data = await Weather(cityName, countryName);
      set({ weather: data, city: data.city, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
