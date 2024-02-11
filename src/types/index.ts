import { StaticImageData } from "next/image";
import { InputHTMLAttributes, RefObject, TextareaHTMLAttributes } from "react";
import { IChoice } from "./apiTypes";
import { ExerciseDifficulty } from "@prisma/client";

export enum Languages {
  spanish = "spanish",
  english = "english",
  italian = "italian",
  japanese = "japanese",
  german = "german",
  french = "french",
}

export interface ModalProps {
  title: string;
  children: JSX.Element;
  onSuccess?: () => void;
  onClose?: () => void;
  modalRef: RefObject<HTMLDialogElement>;
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
  languages: SelectedLanguageElement[];
}

export interface IQuestionAndAnswer {
  id: number;
  title: string;
  options: Option[];
  correct_answer: string;
  content_details_id: number;
}

export interface Option {
  title: string;
  status: string;
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

export interface LanguageSelectProps {
  selectedLanguage: SelectedLanguageElement;
  languages: SelectedLanguageElement[];
}

export interface SelectedLanguageElement {
  id: number;
  active: boolean;
  language_id: number;
  user_profile_id: number;
  details: SelectedLanguageDetail;
}

export interface SelectedLanguageDetail {
  id: number;
  name: string;
}

export interface IconProps {
  animal: string;
  color: string[];
}

export interface IUserCourse {
  id: number;
  course_id: number;
  user_id: number;
  completed_levels: ILevel[];
  course: ICourse;
}

export interface ILevel {
  id: number;
  title: string;
  description: string | null;
  unitId: number;
  userCoursesId: number | null;
  difficulty: ExerciseDifficulty;
  color: string;
  state: LevelState;
}

export interface IExercise {
  id: number;
  difficulty: ExerciseDifficulty;
  type: string;
  prompt: null | string;
  choices: IChoice[];
  compactTranslations: string[];
  solutionTranslation: null | string;
  correctSolutions: string[];
  correctAnswers: string[];
  displayTokens: DisplayToken[];
  correctIndices: number[];
  correctIndex: number | null;
  tts: string;
  sourceLanguage: Languages;
  targetLanguage: Languages;
  unit_id: number;
  hasPreviousError?: boolean;
}

export interface DisplayToken {
  text: string;
  isBlank: boolean;
}

export enum ExercisesType {
  TRANSLATION = "Translation",
  CHOOSE_CORRECT = "ChooseCorrect",
  COMPLETE_SENTENCE = "CompleteSentence",
  WRITE_DOWN = "WriteDown",
  MULTIPLE_CHOICE = "MultipleChoice",
  LISTENING = "Listening",
}

export interface onCheckAnswerProps {
  type: string;
  correctAnswers: string[];
  selectedOption: any;
  compactTranslations?: string[];
  solutionTranslation?: string;
  correctSolutions?: string[];
  prompt?: string;
  correctIndices?: number[];
}

export interface ICourse {
  id: number;
  title: string;
  description: string;
  language_id: number;
  sections: ISection[];
}

export interface ISection {
  id: number;
  title: string;
  description: string | null;
  bg_color: "success" | "accent" | "primary" | "info" | "secondary" | "error";
  img_src: string | null;
  courseId: number;
  user_courses_id: null;
  units: IUnit[];
}

export interface IUnit {
  id: number;
  title: string;
  description: string | null;
  sectionId: number;
  user_courses_id: number | null;
  levels: ILevel[];
  completed: boolean;
  completed_levels: number;
}

export interface ExercisesProps {
  data: IExercise;
  onCheckAnswer: (values: onCheckAnswerProps) => void;
  isMessageActive: boolean;
  onExerciseFail: (correct_answer?: string, translationText?: string) => void;
}

export enum LevelState {
  COMPLETED = "completed",
  STUDYING = "studying",
  FIRST_BLOCKED = "first_blocked",
  BLOCKED = "blocked",
}

export interface LevelIconProps {
  state: LevelState;
}

export interface LevelProps {
  level: ILevel;
  sectionId: string;
  unitId: number;
  row: number;
  state: LevelState;
  color: colors;
}

export enum colors {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ACCENT = "accent",
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export interface UnitProps {
  sectionId: string;
  unit: IUnit;
  color: colors;
}

export interface LevelBubbleProps {
  state: LevelState;
  href: string;
  difficulty?: ExerciseDifficulty;
}
