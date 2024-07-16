import React from 'react';
import Time from "../../components/time"
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-light-svg-icons';


type ModuleCardProps = {
  module: {
    fields: {
      module_title: string;
      module_short_description: any;
      module_level: string[];
      module_units: any[];
    };
    sys: {
      id: string;
    };
  };
  index: number;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index }) => {
  const { module_title, module_short_description, module_level, module_units } = module.fields;
	
  return (
    <a href={`/modules/${module.sys.id}`} className="no-underline h-full">
      <Card className="h-full w-full" shadow="0" key={index} isPressable>
        <CardBody className="overflow-visible p-0">
          <Image
            
            radius="lg"
            width="100%"
            alt={module_title}
            className="w-full object-cover h-[265px] opacity-100"
            src="https://placehold.co/290x150"
          />
        </CardBody>
        <CardFooter className="text-small flex-col h-full">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left">{module_title}</h3>
            <p className="text-default-500 w-4">
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>
          <div className="description mb-4 text-left">{module_short_description}</div>
          <div className="flex w-full justify-start items-center">
            <p className="text-xs gap-1 pr-2">
              {module_level?.map(level => level.charAt(0).toUpperCase() + level.slice(1)).join(', ')}
            </p>
            •
            <p className="text-xs gap-1 pr-2 pl-2">
              [2h, 30m]
            </p>
            •
            <p className="text-xs gap-1 pl-2">
              {module_units.length} {module_units.length === 1 ? 'Unit' : 'Units'}
            </p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default ModuleCard;