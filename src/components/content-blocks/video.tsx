import type { VideoData } from "../../type/content-blocks";

export const Video: React.FC<VideoData> = ({ video }) => {
    return (
        <div className={`aspect-w-16 aspect-h-9`}>
            <iframe 
                id="kaltura_player_1691106631"
                src={`https://cdnapisec.kaltura.com/p/2588802/sp/258880200/embedIframeJs/uiconf_id/44413892/partner_id/2588802?iframeembed=true&playerId=kaltura_player_1691106631&entry_id=${video.kaltura_id}`}
                width="800"
                height="450"
                allowFullScreen={true}
                allow="autoplay *; fullscreen *; encrypted-media *" 
                frameBorder="0" 
            />
        </div>
    )
};
