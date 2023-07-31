import { Video } from './content-blocks/video'
import { Takeaways } from './content-blocks/takeaways'
import { LearningObjectives } from './content-blocks/learning-objectives'
import { PresentationOptions } from './content-blocks/presentation-options'

import type {
    VideoData,
    LearningObjectivesData,
    PresentationOptionsData,
    TakeawaysData
} from '../type/content-blocks'

type BlockProps = {
    block: VideoData | LearningObjectivesData | PresentationOptionsData | TakeawaysData;
}
  
const ContentBlock: React.FC<BlockProps> = ({ block }) => {
    if (block.hasOwnProperty('video')) {
        // Render VideoComponent when the object is VideoData
        return <Video {...(block as VideoData)} />;
    } else if (block.hasOwnProperty('learning_objectives')) {
        // Render LearningObjectivesComponent when the object is LearningObjectivesData
        return <LearningObjectives {...(block as LearningObjectivesData)} />;
    } else if (block.hasOwnProperty('takeaways')) {
        // Render TakeawaysComponent when the object is TakeawaysData
        return <Takeaways {...(block as TakeawaysData)} />;
    } else if (block.hasOwnProperty('presentation_options')) {
        // Render PresentationOptionsComponent when the object is PresentationOptionsData
        return <PresentationOptions {...(block as PresentationOptionsData)} />;
    } else {
        // Handle the case when the type is not recognized or provide a default component
        return <div>Unknown Block Type</div>;
    }
};

export default ContentBlock;
  