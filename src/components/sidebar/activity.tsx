import React from 'react';

type Section = {
  section_title: string;
  section_content: string;
};

type ActivityProps = {
  activity: {
    title: string;
    section: Section[];
  };
};

const Activity: React.FC<ActivityProps> = ({ activity }) => {
  return (
    <div className="mb-6">
      <h4 className="mb-2 font-bold text-sm uppercase">{activity.title}</h4>
      {activity.section.map((section, index) => (
        <div className="border-b border-gray-300 pb-2 mb-2" key={index}>{section.section_title}</div>
      ))}
    </div>
  );
};

export default Activity;