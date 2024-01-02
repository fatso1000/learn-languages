import { StaticImageData } from "next/image";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

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
  id: number;
  name: string;
  biography?: string;
  ubication?: string;
  email: string;
  profile: Profile;
  password: string;
  rank: UserRank;
}

export interface UserRank {
  user_experience: number;
  rank_id: number;
  rank: Rank;
  user: IUser;
  user_id: number;
}

export interface Rank {
  id: number;
  name: number;
  experience: number;
  distintive: string;
}

export interface Profile {
  id: number;
  color: string;
  animal_name: string;
  language_id: number;
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
  question_and_answer: IQuestionAndAnswer[];
}

export interface PendingContentContent {
  id: number;
  title: string;
  type: string;
  level: string;
  details?: PendingContent[];
  language_id: number;
  language: Language;
}

export interface ContentByLevel {
  level: string;
  data: PendingContentContent[];
}

export interface Language {
  id: number;
  name: string;
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}
export interface IColorsObject {
  [key: string]: string;
}
