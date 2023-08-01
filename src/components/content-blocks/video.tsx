import type { VideoData } from "../../type/content-blocks";

export const Video: React.FC<VideoData> = ({ video }) => {
    return <div className={`aspect-w-16 aspect-h-9`} dangerouslySetInnerHTML={{__html: video.kaltura_embed_code}} />
};
