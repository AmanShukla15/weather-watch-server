export const convertKelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

export const convertKelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
};
