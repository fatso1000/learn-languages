import { SnailIcon, SpeakerIcon } from "src/components/Icons";

interface Props {
  ttsAudio?: HTMLAudioElement;
  slowTtsAudio?: HTMLAudioElement;
}

export default function TTSButtons({ ttsAudio, slowTtsAudio }: Props) {
  if (!ttsAudio && !slowTtsAudio) return <></>;
  return (
    <div
      className={`flex flex-row flex-wrap ${
        slowTtsAudio ? "w-full" : ""
      } gap-2`}
    >
      <button
        type="button"
        onClick={() => ttsAudio && ttsAudio.play()}
        className={`btn btn-success ${slowTtsAudio ? "flex-1" : ""}`}
      >
        <SpeakerIcon />
      </button>
      {slowTtsAudio && (
        <button
          type="button"
          onClick={() => slowTtsAudio && slowTtsAudio.play()}
          className={"btn btn-success flex-1"}
        >
          <SnailIcon />
        </button>
      )}
    </div>
  );
}
