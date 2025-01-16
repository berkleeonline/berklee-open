// placeholder gradients until we understand the visual design / photography
// stragey for cards and respective pages
// utils/gradients.ts
// utils/gradients.ts
const brandColors = {
  pink: '#fae6eb',    // Light pink
  blue: '#e6f4fb',    // Light blue
  purple: '#f7eef7',  // Light purple
  gray: '#f5f5f7'     // Light gray
};

export const generatePastelColor = () => {
  // Get random brand color (excluding gray)
  const colors = [brandColors.pink, brandColors.blue, brandColors.purple];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateGradientPlaceholder = (index: number) => {
  const color = generatePastelColor();
  
  return `radial-gradient(circle at center,
    ${color} 0%,
    ${brandColors.gray} 90%)`;
};