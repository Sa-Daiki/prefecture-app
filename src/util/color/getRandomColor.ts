export const getRandomColor = (): string => {
  const get256 = () => {
    return Math.floor(Math.random() * 256);
  };
  const [r, g, b] = [get256(), get256(), get256()];
  const color = `rgb(${r}, ${g}, ${b})`;

  return color;
};
