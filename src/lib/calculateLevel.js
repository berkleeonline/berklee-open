export const calculateLevel = (levels) => {
  if (levels.includes('beginner')) {
    return 'Beginner';
  }
  
  return 'Unknown';
}
