import React from 'react';

type ModuleCardProps = {
  activity: {
	title: string;
	sections: Section[];
  };
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
	const {module_title} = module.fields;
	
    return (
		<a href={`/modules/${module.sys.id}`} className="border border-gray-300 flex flex-col">
			<div className="border-t border-gray-300 p-4">
				<h4 className="text-xl font-bold mb-2">{module_title}</h4>
			</div>
		</a>
    );
};

export default ModuleCard;