import React from 'react';
import Time from "../../components/time"

type UnitCardProps = {
  activity: {
	title: string;
	sections: Section[];
  };
};

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
	console.log(unit);
	
    return (
		<a href={`/units/${unit.sys.id}`} className="border border-gray-300 flex flex-col">
	    	<div></div>
			<div className="border-t border-gray-300 p-4">
				<h4 className="text-xl font-bold mb-2">{unit.title}</h4>
				<div className="mb-1">{unit.intro}</div>
				<div className="flex gap-2">
					<div className="text-sm capitalize">{unit.level}</div>
					<div className="text-sm capitalize">{unit.grade_level}</div>
					<div className="text-sm capitalize"><Time showIcon={false} totalMinutes={unit.time_to_completion} /></div>
				</div>
			</div>
		</a>
    );
};

export default UnitCard;