import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import BoListPlayer from '../../players/BoListPlayer';

interface EmbeddedAudio {
  sys: { id: string };
  fields?: { title?: string; file?: { url?: string; fileName?: string } };
}

interface SlideEmbedAudioProps {
  title: string;
  embed: string;
  slide_embedded_audio: EmbeddedAudio[];
}

export const SlideEmbedAudio: React.FC<SlideEmbedAudioProps> = ({ title, embed, slide_embedded_audio }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("slide_embedded_audio:", JSON.stringify(slide_embedded_audio, null, 2));

    const container = document.getElementById('video-embed-container');
    if (container) {
      const iframes = container.getElementsByTagName('iframe');
      for (let i = 0; i < iframes.length; i++) {
        iframes[i].onload = () => setLoading(false);
        if (i === 1) {
          iframes[i].classList.add('second-iframe');
        }
      }
    }
  }, [embed, slide_embedded_audio]);

  return (
    <div className="flex flex-1 flex-col items-center w-screen py-10">
      <h1 className="font-sans text-[3vw] font-bold mb-8">{title}</h1>
      
      {loading && <LoadingIndicator />}
      
      <div id="video-embed-container" style={{ display: loading ? 'none' : 'block' }} dangerouslySetInnerHTML={{ __html: embed }} />
      <BoListPlayer />

      <div className="audio-list mt-8">
        <h2 className="text-xl font-bold mb-4">Embedded Audio Files:</h2>
        {slide_embedded_audio && slide_embedded_audio.length > 0 ? (
          <ul className="list-disc pl-5">
            {slide_embedded_audio.map((audio, index) => (
              <li key={audio.sys.id} className="mb-2">
                <strong>ID:</strong> {audio.sys.id}
                {audio.fields && audio.fields.title && (
                  <span>, <strong>Title:</strong> {audio.fields.title}</span>
                )}
                {audio.fields && audio.fields.audio_file && (
                  <span>, <strong>File Name:</strong> {audio.fields.audio_file}</span>
                )}
                {audio.fields && audio.fields.time && (
                  <span>, <strong>File Name:</strong> {audio.fields.time}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No audio data available.</p>
        )}
      </div>
    </div>
  );
};