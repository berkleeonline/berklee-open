export const calculateDuration = (durations) => {
  const totalMinutes = durations.reduce((acc, duration) => {
    const parts = duration.split(' ');
    const value = parseInt(parts[0], 10);

    if (parts.length > 1) {
        const unit = parts[1].toLowerCase();
        if (unit.startsWith('minute')) {
        return acc + value;
        } else if (unit.startsWith('hour')) {
        return acc + value * 60;
        }
        return acc;
    }
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let result = '';

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    if (result.length > 0) result += ', ';
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return result;
}
