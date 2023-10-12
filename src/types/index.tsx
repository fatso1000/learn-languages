import { StaticImageData } from "next/image";

export enum Languages {
  spanish = "Spanish",
  english = "English",
  italian = "Italian",
  japanese = "Japanese",
  german = "German",
  french = "French",
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
  title: string;
  reading_texts: IReadingTexts[];
  locked_texts: number;
}

export interface IReadingTexts {
  title: string;
  id: string;
  description: string;
}

export interface IUser {
  name: string;
  email: string;
  profile: Profile;
  id: number;
  password: string;
}

export interface Profile {
  id: number;
  color: string;
  animal_name: string;
}

export interface IReadings {
  id: number;
  title: string;
  description: string;
  text: string[];
  reading_id: number;
  pendingsReadingTextsId: null;
  question_and_answer: IQuestionAndAnswer[];
}

export interface IQuestionAndAnswer {
  id: number;
  title: string;
  options: string[];
  correct_answer: string;
  reading_texts_id: number;
}
