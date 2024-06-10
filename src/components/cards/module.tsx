import React from 'react';
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';


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

//console.log(Astro.props.fields);

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index }) => {
  const { module_title, module_short_description, module_level, module_units } = module.fields;
  
  console.log(module.fields);
	
  return (
    <a href={`/modules/${module.sys.id}`} className="no-underline flex flex-col">
      <Card shadow="sm" key={index} isPressable>
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={module_title}
            className="w-full object-cover h-[140px] opacity-100"
            src="https://picsum.photos/200/300"
          />
        </CardBody>
        <CardFooter className="text-small flex-col">
          <div class="flex flex-row">
            <h3 className="font-bold text-lg text-left">{module_title}</h3>
            <p className="text-default-500 w-4">
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>
          <div className="description mb-2 text-left">{module_short_description}</div>
          <p className="text-sm">
            <strong>Level:</strong> {module_level.join(', ')}
          </p>
          <p className="text-sm">
            <strong>Units:</strong> {module_units.length}
          </p>
        </CardFooter>
      </Card>
    </a>
  );
};

export default ModuleCard;