import type { VideoData } from "../../type/content-blocks";

export const Video: React.FC<VideoData> = ({ video }) => {
    return <div dangerouslySetInnerHTML={{__html: video.kaltura_embed_code}} />
};
