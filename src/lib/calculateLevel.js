export const calculateLevel = (levels) => {
  if (levels.includes('Beginner')) {
    return 'Beginner';
  }
  
  return 'Unknown';
}
