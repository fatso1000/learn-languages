import { SnailIcon, SpeakerIcon } from "src/components/Icons";

interface Props {
  ttsAudio?: HTMLAudioElement;
  slowTtsAudio?: HTMLAudioElement;
}

export default function TTSButtons({ ttsAudio, slowTtsAudio }: Props) {
  if (!ttsAudio && !slowTtsAudio) return <></>;
  return (
    <>
      <button
        type="button"
        onClick={() => ttsAudio && ttsAudio.play()}
        className={`btn btn-success ${slowTtsAudio ? "w-[49%]" : ""}`}
      >
        <SpeakerIcon />
      </button>
      {slowTtsAudio && (
        <button
          type="button"
          onClick={() => slowTtsAudio && slowTtsAudio.play()}
          className={"btn btn-success w-[49%]"}
        >
          <SnailIcon />
        </button>
      )}
    </>
  );
}
