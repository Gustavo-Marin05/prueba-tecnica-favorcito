import { useWeatherStore } from "./store/useWeatherStore";
import Search from "./components/search";

function App() {
  const { city, weather, loading, error } = useWeatherStore();

  return (
    <div className="min-h-screen bg-blue-100 text-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {" "}
        Pronostico del Clima
      </h1>

      <Search />

      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {weather && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">{city}</h2>
          <p>
            <b>temperatura actual:</b> {weather.current?.temperature_2m} °C
          </p>
          <p>
            <b>viento:</b> {weather.current?.wind_speed_10m} km/h
          </p>
          <p>
            <b>coordenadas:</b> <h1>la</h1>{weather.latitude}, <h1>lon</h1>{weather.longitude}
          </p>
          <p>
             <b>Códigos:</b> {weather.daily.weathercode[0]}
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            Pronóstico para 7 días:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weather.daily?.time?.map((date, index) => (
              <li key={index} className="bg-blue-50 p-4 rounded shadow">
                <p>fecha: {date}</p>
                <p>max: {weather.daily.temperature_2m_max[index]}°C</p>
                <p>min: {weather.daily.temperature_2m_min[index]}°C</p>
                <p>clima: Código {weather.daily.weathercode[index]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
