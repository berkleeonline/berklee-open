const brandColors = {
  pink: '#fae6eb',    // Light pink
  blue: '#e6f4fb',    // Light blue
  purple: '#f7eef7',  // Light purple
  gray: '#f5f5f7'     // Light gray
};

const colorArray = [brandColors.pink, brandColors.blue, brandColors.purple];

export const generatePastelColor = (index: number) => {
  // Use modulo to cycle through colors deterministically
  return colorArray[index % colorArray.length];
};

export const generateGradientPlaceholder = (index: number) => {
  const color = generatePastelColor(index);
  
  // Ensure color is a string, fallback to a default
  const safeColor = typeof color === 'string' ? color : brandColors.blue;
  
  return `radial-gradient(circle at center, ${safeColor} 0%, ${brandColors.gray} 90%)`;
};