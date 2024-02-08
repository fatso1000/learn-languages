import { IsBoolean, IsEmail, IsOptional, Length } from "class-validator";
import { HttpStatusCode } from "./httpStatusCode";
import { ExerciseType } from "@prisma/client";

export class BlogPOST {
  @Length(1)
  public title: string;
  @IsOptional()
  public sub_title?: string;
  @IsOptional()
  public description?: string;
  public reading_time: number;
  @IsBoolean()
  public verification: boolean = false;
  @Length(1)
  public author_name: string;
  @IsOptional()
  public tags?: string[];
  public content: string;

  constructor({
    title,
    author_name,
    description,
    reading_time,
    sub_title,
    tags,
    verification,
    content,
  }: IBlogAPI) {
    this.author_name = author_name;
    this.description = description;
    this.reading_time = reading_time;
    this.sub_title = sub_title;
    this.tags = tags;
    this.verification = verification;
    this.title = title;
    this.content = content;
  }
}

export interface IBlogAPI {
  title: string;
  sub_title?: string;
  description?: string;
  reading_time: number;
  verification: boolean;
  author_name: string;
  tags?: string[];
  content: string;
}

export class ReminderPOST {
  @Length(1)
  public title: string;
  @IsOptional()
  public info?: string;

  constructor({ title, info }: IReminderAPI) {
    this.info = info;
    this.title = title;
  }
}

export interface IReminderAPI {
  title: string;
  info?: string;
}
// LANGUAGE
export class LanguagePOST {
  public name: string;
  public short_name: string;

  constructor({ name, short_name }: ILanguage) {
    this.name = name;
    this.short_name = short_name;
  }
}

export interface ILanguage {
  name: string;
  short_name: string;
}
// RANK
export class RankPOST {
  public name: string;
  public distintive: string;

  constructor({ name, distintive }: IRank) {
    this.name = name;
    this.distintive = distintive;
  }
}

export interface IRank {
  name: string;
  distintive: string;
}

// READINGS
export class ReadingsPOST {
  public title: string;
  public description: string;
  public level: LevelsTypes;
  public text: string;
  public type: ContentTypes;
  public question_and_answer: APIQuestionAndAnswer[];
  public language_id: number;

  constructor({
    description,
    language_id,
    level,
    question_and_answer,
    text,
    title,
    type,
  }: APIContent) {
    this.title = title;
    this.description = description;
    this.text = text;
    this.type = type;
    this.level = level;
    this.language_id = language_id;
    this.question_and_answer = question_and_answer;
  }
}

export enum ContentTypes {
  Reading = "Reading",
  Listening = "Listening",
  Exercises = "Exercises",
}

export enum LevelsTypes {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export interface APIContent {
  title: string;
  description: string;
  text: string;
  language_id: number;
  type: ContentTypes;
  level: LevelsTypes;
  question_and_answer: APIQuestionAndAnswer[];
}

export interface APIQuestionAndAnswer {
  title: string;
  options: string[];
  correct_answer: string;
}

// AUTH

export class UserPATCH {
  public name: string;

  @IsOptional()
  public biography?: string;

  @IsOptional()
  public ubication?: string;

  @IsOptional()
  public profile?: { animal_name?: string; color?: string; language?: number };

  constructor({ name, biography, ubication, profile }: IUser) {
    this.name = name;
    this.biography = biography;
    this.ubication = ubication;
    this.profile = profile;
  }
}

export class UserLoginPOST {
  @IsEmail()
  public email: string;

  public password: string;

  constructor({ email, password }: IUserLogin) {
    this.email = email;
    this.password = password;
  }
}

export class UserSignUpPOST {
  @IsEmail()
  public email: string;

  @Length(6, 12)
  public password: string;

  @IsOptional()
  @Length(1)
  public name?: string;

  public profile_color: string;

  public language: number;

  constructor({ email, password, name, profile_color, language }: IUserSignUp) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.profile_color = profile_color;
    this.language = language;
  }
}

export interface IUser {
  name: string;
  biography?: string;
  ubication?: string;
  profile?: {
    animal_name?: string;
    color?: "red" | "blue" | "orange" | "yellow" | "green" | "purple" | "teal";
    language?: number;
  };
}
export interface IProfile {}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ITokenUser {
  time: Date;
  email: string;
  password: string;
  name: string;
  language: string;
  iat: number;
  exp: number;
}

export interface IUserSignUp {
  email: string;
  password: string;
  name?: string;
  language: number;
  profile_color:
    | string
    | "red"
    | "blue"
    | "orange"
    | "yellow"
    | "green"
    | "purple"
    | "teal";
}

export interface IUserLogout {
  token?: string;
}

export interface IUserLoginResponse {
  loggedIn: boolean;
  data: {
    id: number;
    created_at: Date;
    email: string;
    password: string;
    name: string | null;
  };
  randomKey: string;
}

export interface ILevelBody {
  id: number;
  difficulty: string;
  type: ExerciseType;
  unitId: number;
  prompt?: string;
  correctSolutions?: string[];
  correctAnswers?: string[];
  compactTranslations?: string[];
  choices?: string[];
  sourceLanguage: string;
  targetLanguage: string;
  solutionTranslation?: string;
}

export interface ILevelReturn {
  difficulty: string;
  type: ExerciseType;
  unitId: number;
  prompt?: string;
  correctSolutions?: string[];
  correctAnswers?: string[];
  compactTranslations?: string[];
  choices?: IChoice[];
  correctIndices?: number[];
  correctIndex?: number;
  sourceLanguage: string;
  targetLanguage: string;
  solutionTranslation?: string;
  tts: string;
  displayTokens?: IDisplayToken[];
}

export interface IChoice {
  text: string;
  tts?: string;
}

export interface IDisplayToken {
  text: string;
  isBlank: boolean;
}

// ERROR ----------------------

export class CustomError extends Error {
  private httpStatusCode: HttpStatusCode;
  private errors: any[];

  constructor({
    msg,
    httpStatusCode,
    errors = [],
  }: {
    msg: string;
    httpStatusCode: HttpStatusCode;
    errors?: any[];
  }) {
    super(msg);
    this.errors = errors;
    this.httpStatusCode = httpStatusCode;
  }

  public get errorData() {
    return {
      message: this.message,
      httpStatusCode: this.httpStatusCode,
      errors: this.errors,
    };
  }
}
