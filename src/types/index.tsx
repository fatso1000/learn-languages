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

export interface CarouselCardProps {
  href: string;
  title: string;
  level: string;
  language: string;
  type: string;
  description: string;
}

export interface DashboardProps {
  historical: any[];
  pendingContent: Content[];
  savedContent: Content[];
}

export interface Content {
  id: number;
  user_id: number;
  content: ContentElement[];
}

export interface ContentElement {
  id: number;
  marked_as_read: boolean;
  user_content_id: number;
  pending_id: number;
  pending_content: PendingContent;
}

export interface PendingContent {
  id: number;
  title: string;
  description: string;
  text: any[];
  level: string;
  type: string;
  content_id: number;
  content: PendingContentContent;
}

export interface PendingContentContent {
  id: number;
  title: string;
  type: string;
  level: string;
  language_id: number;
  language: Language;
}

export interface Language {
  id: number;
  name: string;
}
