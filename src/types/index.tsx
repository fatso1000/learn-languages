import { StaticImageData } from "next/image";

export enum Languages {
  spanish = "spanish",
  english = "english",
  italian = "italian",
  japanese = "japanese",
  german = "german",
  french = "french",
}

export interface ModalProps {
  props: {
    title: string;
    content: any;
    onSuccess?: () => void;
    onClose?: () => void;
    ref: React.MutableRefObject<any>;
  };
}

export interface IFlags {
  language: Languages;
  flagUrl: StaticImageData;
  displayName: string;
}

export interface LanguagesSelectionProps {
  props: {
    flags: IFlags[];
    onClick: (value: IFlags) => void;
  };
}

export interface IReadingSections {
  section: string;
  readingTexts: IReadingTexts[];
  lockedTexts: number;
}

export interface IReadingTexts {
  title: string;
  id: string;
  description: string;
}
