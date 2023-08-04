import React from 'react';

type TimeProps = {
  totalMinutes: number;
};

const Time: React.FC<TimeProps> = ({ totalMinutes, showIcon }) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return (
      <div className="flex gap-1">
        {showIcon !== false && (
          <svg xmlns="http://www.w3.org/2000/svg" width="22.195" height="22.195" viewBox="0 0 22.195 22.195">
            <g id="MDI_clock-time-five-outline" data-name="MDI / clock-time-five-outline" opacity="0.6">
              <g id="Boundary" stroke="rgba(0,0,0,0)" strokeWidth="1" opacity="0">
                <rect width="22.195" height="22.195" stroke="none"/>
                <rect x="0.5" y="0.5" width="21.195" height="21.195" fill="none"/>
              </g>
              <path id="Path_clock-time-five-outline" data-name="Path / clock-time-five-outline" d="M11.248,18.646a7.4,7.4,0,1,0-7.4-7.4,7.42,7.42,0,0,0,7.4,7.4M11.248,2A9.248,9.248,0,1,1,2,11.248,9.275,9.275,0,0,1,11.248,2M14.3,15.132l-1.2.74-2.774-4.809V6.624H11.71v4.069Z" transform="translate(-0.15 -0.15)"/>
            </g>
          </svg>
        )}
        {`${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`}
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      {showIcon !== false && (
        <svg xmlns="http://www.w3.org/2000/svg" width="22.195" height="22.195" viewBox="0 0 22.195 22.195">
          <g id="MDI_clock-time-five-outline" data-name="MDI / clock-time-five-outline" opacity="0.6">
            <g id="Boundary" stroke="rgba(0,0,0,0)" strokeWidth="1" opacity="0">
              <rect width="22.195" height="22.195" stroke="none"/>
              <rect x="0.5" y="0.5" width="21.195" height="21.195" fill="none"/>
            </g>
            <path id="Path_clock-time-five-outline" data-name="Path / clock-time-five-outline" d="M11.248,18.646a7.4,7.4,0,1,0-7.4-7.4,7.42,7.42,0,0,0,7.4,7.4M11.248,2A9.248,9.248,0,1,1,2,11.248,9.275,9.275,0,0,1,11.248,2M14.3,15.132l-1.2.74-2.774-4.809V6.624H11.71v4.069Z" transform="translate(-0.15 -0.15)"/>
          </g>
        </svg>
      )}
      {`${minutes} minute${minutes !== 1 ? 's' : ''}`}
    </div>
  );
};

export default Time;
