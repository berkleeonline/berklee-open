import React from 'react';
import Time from "../../components/time"
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

type UnitCardProps = {
  activity: {
	title: string;
	sections: Section[];
  };
};

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
	console.log("==================");
	
	const {unit_title} = unit.fields;
	
    return (
		<a href={`/units/${unit.sys.id}`} className="border border-gray-300 flex flex-col">
			<div className="border-t border-gray-300 p-4">
				<h4 className="text-xl font-bold mb-2">{unit_title}</h4>
			</div>
		</a>
    );
};

export default UnitCard;