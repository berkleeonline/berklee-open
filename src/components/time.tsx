import React from 'react';

type TimeProps = {
  totalMinutes: number;
};

const Time: React.FC<TimeProps> = ({ totalMinutes }) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return (
    <div>
      {`${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`}
    </div>
  );
};

export default Time;
