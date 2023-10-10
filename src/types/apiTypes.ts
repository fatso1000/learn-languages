import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  Length,
} from "class-validator";
import { HttpStatusCode } from "./httpStatusCode";

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

  constructor({ name }: ILanguage) {
    this.name = name;
  }
}

export interface ILanguage {
  name: string;
}

// READINGS
export class ReadingsPOST {
  public title: string;
  public reading_texts: IReadingTexts[];
  public qa: IQuestionAndAnswer[];
  public language_id: number;

  constructor({ qa, reading_texts, title, language_id }: IReadings) {
    this.qa = qa;
    this.reading_texts = reading_texts;
    this.title = title;
    this.language_id = language_id;
  }
}

export interface IReadings {
  title: string;
  language_id: number;
  reading_texts: IReadingTexts[];
  qa: IQuestionAndAnswer[];
}

export interface IReadingTexts {
  title: string;
  description: string;
  text: string;
  question_and_answer: IQuestionAndAnswer[];
}

export interface IQuestionAndAnswer {
  title: string;
  options: string[];
  correct_answer: string;
}

// AUTH

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

  constructor({ email, password, name }: IUserSignUp) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserSignUp {
  email: string;
  password: string;
  name?: string;
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
