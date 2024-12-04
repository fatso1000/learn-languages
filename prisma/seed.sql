--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ExerciseDifficulty; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ExerciseDifficulty" AS ENUM (
    'easy',
    'medium',
    'hard'
);


ALTER TYPE public."ExerciseDifficulty" OWNER TO postgres;

--
-- Name: ExerciseType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ExerciseType" AS ENUM (
    'Translation',
    'ChooseCorrect',
    'CompleteSentence',
    'Listening',
    'MultipleChoice',
    'WriteDown'
);


ALTER TYPE public."ExerciseType" OWNER TO postgres;

--
-- Name: Levels; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Levels" AS ENUM (
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2'
);


ALTER TYPE public."Levels" OWNER TO postgres;

--
-- Name: Types; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Types" AS ENUM (
    'Listening',
    'Exercise',
    'Reading'
);


ALTER TYPE public."Types" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Content" (
    id integer NOT NULL,
    title text NOT NULL,
    type public."Types" NOT NULL,
    level public."Levels" NOT NULL,
    language_id integer NOT NULL
);


ALTER TABLE public."Content" OWNER TO postgres;

--
-- Name: ContentDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContentDetails" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    text text[],
    stories jsonb,
    principal text,
    level public."Levels" NOT NULL,
    type public."Types" NOT NULL,
    content_id integer NOT NULL,
    tts text
);


ALTER TABLE public."ContentDetails" OWNER TO postgres;

--
-- Name: ContentDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContentDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ContentDetails_id_seq" OWNER TO postgres;

--
-- Name: ContentDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContentDetails_id_seq" OWNED BY public."ContentDetails".id;


--
-- Name: Content_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Content_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Content_id_seq" OWNER TO postgres;

--
-- Name: Content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Content_id_seq" OWNED BY public."Content".id;


--
-- Name: Courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Courses" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    languages_id integer NOT NULL
);


ALTER TABLE public."Courses" OWNER TO postgres;

--
-- Name: Courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Courses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Courses_id_seq" OWNER TO postgres;

--
-- Name: Courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Courses_id_seq" OWNED BY public."Courses".id;


--
-- Name: Exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Exercise" (
    id integer NOT NULL,
    difficulty public."ExerciseDifficulty" NOT NULL,
    type public."ExerciseType" NOT NULL,
    prompt text,
    choices jsonb[],
    compact_translations text[],
    solution_translations text,
    correct_solutions text[],
    correct_answers text[],
    display_tokens jsonb[],
    correct_indices integer[],
    correct_index integer,
    tts text NOT NULL,
    source_languages text NOT NULL,
    target_languages text NOT NULL,
    unit_id integer NOT NULL
);


ALTER TABLE public."Exercise" OWNER TO postgres;

--
-- Name: Exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Exercise_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Exercise_id_seq" OWNER TO postgres;

--
-- Name: Exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Exercise_id_seq" OWNED BY public."Exercise".id;


--
-- Name: Historical; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Historical" (
    id integer NOT NULL,
    user_id integer,
    last_watched timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content_id integer NOT NULL
);


ALTER TABLE public."Historical" OWNER TO postgres;

--
-- Name: Historical_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Historical_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Historical_id_seq" OWNER TO postgres;

--
-- Name: Historical_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Historical_id_seq" OWNED BY public."Historical".id;


--
-- Name: Languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Languages" (
    id integer NOT NULL,
    name text NOT NULL,
    short_name text NOT NULL,
    "coursesId" integer
);


ALTER TABLE public."Languages" OWNER TO postgres;

--
-- Name: LanguagesCombos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LanguagesCombos" (
    id integer NOT NULL,
    base_language_id integer NOT NULL,
    target_language jsonb NOT NULL,
    target_language_id integer NOT NULL
);


ALTER TABLE public."LanguagesCombos" OWNER TO postgres;

--
-- Name: LanguagesCombos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LanguagesCombos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LanguagesCombos_id_seq" OWNER TO postgres;

--
-- Name: LanguagesCombos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LanguagesCombos_id_seq" OWNED BY public."LanguagesCombos".id;


--
-- Name: Languages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Languages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Languages_id_seq" OWNER TO postgres;

--
-- Name: Languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Languages_id_seq" OWNED BY public."Languages".id;


--
-- Name: Level; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Level" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    difficulty public."ExerciseDifficulty" NOT NULL,
    unit_id integer NOT NULL,
    user_courses_id integer
);


ALTER TABLE public."Level" OWNER TO postgres;

--
-- Name: Level_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Level_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Level_id_seq" OWNER TO postgres;

--
-- Name: Level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Level_id_seq" OWNED BY public."Level".id;


--
-- Name: LivesAndStrikes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LivesAndStrikes" (
    id integer NOT NULL,
    lives integer DEFAULT 5 NOT NULL,
    last_live_date timestamp(3) without time zone,
    strikes_length integer DEFAULT 0 NOT NULL,
    last_strike_date timestamp(3) without time zone
);


ALTER TABLE public."LivesAndStrikes" OWNER TO postgres;

--
-- Name: LivesAndStrikes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LivesAndStrikes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LivesAndStrikes_id_seq" OWNER TO postgres;

--
-- Name: LivesAndStrikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LivesAndStrikes_id_seq" OWNED BY public."LivesAndStrikes".id;


--
-- Name: PendingContent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PendingContent" (
    id integer NOT NULL,
    marked_as_read boolean NOT NULL,
    is_completed boolean NOT NULL,
    user_content_id integer NOT NULL,
    pending_id integer NOT NULL
);


ALTER TABLE public."PendingContent" OWNER TO postgres;

--
-- Name: PendingContent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PendingContent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PendingContent_id_seq" OWNER TO postgres;

--
-- Name: PendingContent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PendingContent_id_seq" OWNED BY public."PendingContent".id;


--
-- Name: QuestionAndAnswer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."QuestionAndAnswer" (
    id integer NOT NULL,
    title text NOT NULL,
    options text[],
    correct_answer text NOT NULL,
    content_details_id integer NOT NULL
);


ALTER TABLE public."QuestionAndAnswer" OWNER TO postgres;

--
-- Name: QuestionAndAnswer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."QuestionAndAnswer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."QuestionAndAnswer_id_seq" OWNER TO postgres;

--
-- Name: QuestionAndAnswer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."QuestionAndAnswer_id_seq" OWNED BY public."QuestionAndAnswer".id;


--
-- Name: Ranks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ranks" (
    id integer NOT NULL,
    name text NOT NULL,
    distintive text NOT NULL
);


ALTER TABLE public."Ranks" OWNER TO postgres;

--
-- Name: Ranks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ranks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Ranks_id_seq" OWNER TO postgres;

--
-- Name: Ranks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ranks_id_seq" OWNED BY public."Ranks".id;


--
-- Name: Section; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Section" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    color text,
    img_src text,
    "courseId" integer NOT NULL
);


ALTER TABLE public."Section" OWNER TO postgres;

--
-- Name: Section_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Section_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Section_id_seq" OWNER TO postgres;

--
-- Name: Section_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Section_id_seq" OWNED BY public."Section".id;


--
-- Name: Unit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Unit" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    "sectionId" integer NOT NULL,
    color text NOT NULL
);


ALTER TABLE public."Unit" OWNER TO postgres;

--
-- Name: Unit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Unit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Unit_id_seq" OWNER TO postgres;

--
-- Name: Unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Unit_id_seq" OWNED BY public."Unit".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    active boolean,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    biography text,
    location text,
    profile_id integer NOT NULL,
    lives_and_strikes_id integer NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserContent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserContent" (
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE public."UserContent" OWNER TO postgres;

--
-- Name: UserContent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserContent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserContent_id_seq" OWNER TO postgres;

--
-- Name: UserContent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserContent_id_seq" OWNED BY public."UserContent".id;


--
-- Name: UserCourses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserCourses" (
    id integer NOT NULL,
    active boolean NOT NULL,
    course_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."UserCourses" OWNER TO postgres;

--
-- Name: UserCourses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserCourses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserCourses_id_seq" OWNER TO postgres;

--
-- Name: UserCourses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserCourses_id_seq" OWNED BY public."UserCourses".id;


--
-- Name: UserLanguages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserLanguages" (
    id integer NOT NULL,
    active boolean NOT NULL,
    details_id integer NOT NULL,
    user_profile_id integer NOT NULL
);


ALTER TABLE public."UserLanguages" OWNER TO postgres;

--
-- Name: UserLanguages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserLanguages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserLanguages_id_seq" OWNER TO postgres;

--
-- Name: UserLanguages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserLanguages_id_seq" OWNED BY public."UserLanguages".id;


--
-- Name: UserProfile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserProfile" (
    id integer NOT NULL,
    color text NOT NULL,
    animal_name text NOT NULL
);


ALTER TABLE public."UserProfile" OWNER TO postgres;

--
-- Name: UserProfile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserProfile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserProfile_id_seq" OWNER TO postgres;

--
-- Name: UserProfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserProfile_id_seq" OWNED BY public."UserProfile".id;


--
-- Name: UserRank; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserRank" (
    rank_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    user_experience integer NOT NULL
);


ALTER TABLE public."UserRank" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Content id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Content" ALTER COLUMN id SET DEFAULT nextval('public."Content_id_seq"'::regclass);


--
-- Name: ContentDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContentDetails" ALTER COLUMN id SET DEFAULT nextval('public."ContentDetails_id_seq"'::regclass);


--
-- Name: Courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses" ALTER COLUMN id SET DEFAULT nextval('public."Courses_id_seq"'::regclass);


--
-- Name: Exercise id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercise" ALTER COLUMN id SET DEFAULT nextval('public."Exercise_id_seq"'::regclass);


--
-- Name: Historical id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historical" ALTER COLUMN id SET DEFAULT nextval('public."Historical_id_seq"'::regclass);


--
-- Name: Languages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Languages" ALTER COLUMN id SET DEFAULT nextval('public."Languages_id_seq"'::regclass);


--
-- Name: LanguagesCombos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LanguagesCombos" ALTER COLUMN id SET DEFAULT nextval('public."LanguagesCombos_id_seq"'::regclass);


--
-- Name: Level id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Level" ALTER COLUMN id SET DEFAULT nextval('public."Level_id_seq"'::regclass);


--
-- Name: LivesAndStrikes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LivesAndStrikes" ALTER COLUMN id SET DEFAULT nextval('public."LivesAndStrikes_id_seq"'::regclass);


--
-- Name: PendingContent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PendingContent" ALTER COLUMN id SET DEFAULT nextval('public."PendingContent_id_seq"'::regclass);


--
-- Name: QuestionAndAnswer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionAndAnswer" ALTER COLUMN id SET DEFAULT nextval('public."QuestionAndAnswer_id_seq"'::regclass);


--
-- Name: Ranks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ranks" ALTER COLUMN id SET DEFAULT nextval('public."Ranks_id_seq"'::regclass);


--
-- Name: Section id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Section" ALTER COLUMN id SET DEFAULT nextval('public."Section_id_seq"'::regclass);


--
-- Name: Unit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unit" ALTER COLUMN id SET DEFAULT nextval('public."Unit_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserContent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserContent" ALTER COLUMN id SET DEFAULT nextval('public."UserContent_id_seq"'::regclass);


--
-- Name: UserCourses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourses" ALTER COLUMN id SET DEFAULT nextval('public."UserCourses_id_seq"'::regclass);


--
-- Name: UserLanguages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLanguages" ALTER COLUMN id SET DEFAULT nextval('public."UserLanguages_id_seq"'::regclass);


--
-- Name: UserProfile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfile" ALTER COLUMN id SET DEFAULT nextval('public."UserProfile_id_seq"'::regclass);


--
-- Data for Name: Content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Content" (id, title, type, level, language_id) FROM stdin;
1	Estudiantes	Reading	C1	1
2	Daily Routine	Reading	A2	1
3	Trip to Paris	Reading	B1	1
4	The History of Computing	Reading	C2	1
5	Team Meeting	Listening	B1	1
6	Moon Landing	Listening	C1	1
7	Airport Check-In	Listening	B2	2
8	En el Restaurante	Listening	A2	2
9	Reservación de Hotel	Listening	B1	2
10	En la Farmacia	Listening	A2	2
11	El Cambio Climático	Reading	B2	2
12	La Alimentación Saludable	Reading	A2	2
13	La Historia del Café	Reading	B1	2
\.


--
-- Data for Name: ContentDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContentDetails" (id, title, description, text, stories, principal, level, type, content_id, tts) FROM stdin;
1	Estudiantes	my mother and I	{"I live in a house near the mountains. I have two brothers and one sister, and I was born last. My father teaches mathematics, and my mother is a nurse at a big hospital. My brothers are very smart and work hard in school. My sister is a nervous girl, but she is very kind. My grandmother also lives with us. She came from Italy when I was two years old. She has grown old, but she is still very strong. She cooks the best food! "," My family is very important to me. We do lots of things together. My brothers and I like to go on long walks in the mountains. My sister likes to cook with my grandmother. On the weekends we all play board games together. We laugh and always have a good time. I love my family very much."}	[""]		C1	Reading	1	\N
2	Daily Routine	daily activities of John	{"John wakes up at 7 a.m. every day. He takes a shower, eats breakfast, and goes to work. He works at an office and finishes at 5 p.m. After work, he likes to go for a run in the park. In the evening, John watches TV or reads a book. On weekends, he spends time with his friends and family. He enjoys cooking and often tries new recipes."}	[""]		A2	Reading	2	\N
3	Trip to Paris	Sophia's trip to Paris	{"Last summer, Sophia visited Paris for the first time. She was amazed by the beautiful architecture and famous landmarks like the Eiffel Tower and the Louvre Museum. She stayed in a cozy hotel near the city center and enjoyed French cuisine, especially croissants and crepes. During her trip, Sophia took a boat ride on the Seine River and attended a French language class. She loved the experience and hopes to visit again soon."}	[""]		B1	Reading	3	\N
4	The History of Computing	An overview of early computing developments	{"The evolution of computing began long before the modern era of technology. In the early 19th century, Charles Babbage conceptualized the Analytical Engine, often considered the first mechanical computer. Ada Lovelace, a mathematician, worked closely with Babbage and is credited with writing the first algorithm intended for machine processing. Fast forward to the mid-20th century, when electronic computers like ENIAC emerged, transforming industries and research. Today, computers are integral to every aspect of life, from communication to scientific exploration."}	[""]		C2	Reading	4	\N
5	Team Meeting	A team meeting discussing project deadlines	{""}	[[["Manager", "Good morning, team! Let's talk about our project deadlines."], ["Team Member", "Sure, we need to discuss the marketing strategy."]], [["Manager", "Are we on track for the product launch next month?"], ["Team Member", "Yes, we are on schedule."]]]	Manager	B1	Listening	5	\N
6	Moon Landing	Discussion on the first moon landing	{""}	[[["Narrator", "In 1969, the world watched in awe as humanity landed on the moon."], ["Guest", "Yes, it was a pivotal moment in history."]], [["Narrator", "What made this mission special was the teamwork involved."], ["Guest", "Indeed, without teamwork, it would have been impossible."]]]	Narrator	C1	Listening	6	\N
7	Airport Check-In	A conversation at the airport check-in counter	{""}	[[["Agent", "Good afternoon! Can I see your ticket and passport, please?"], ["Traveler", "Sure, here they are."]], [["Agent", "Are you checking in any luggage?"], ["Traveler", "Yes, just one suitcase."]], [["Agent", "Do you have any liquids over 100 milliliters in your carry-on?"], ["Traveler", "No, everything follows the regulations."]]]	Agent	B2	Listening	7	\N
8	En el Restaurante	Una conversación típica al pedir comida en un restaurante	{""}	[[["Camarero", "Buenas tardes, ¿qué les gustaría pedir?"], ["Cliente", "Quisiera una ensalada y una sopa, por favor."]], [["Camarero", "¿Algo para beber?"], ["Cliente", "Sí, una limonada."]], [["Camarero", "Perfecto, en unos minutos estará listo."], ["Cliente", "Muchas gracias."]]]	Camarero	A2	Listening	8	\N
9	Reservación de Hotel	Una conversación para hacer una reserva en un hotel	{""}	[[["Recepcionista", "Buenas tardes, ¿en qué puedo ayudarle?"], ["Huésped", "Quisiera hacer una reservación para el próximo fin de semana."]], [["Recepcionista", "¿Para cuántas personas?"], ["Huésped", "Para dos, por favor."]], [["Recepcionista", "Perfecto, ¿desea una habitación doble o matrimonial?"], ["Huésped", "Matrimonial, gracias."]]]	Recepcionista	B1	Listening	9	\N
10	En la Farmacia	Conversación al comprar medicamentos en la farmacia	{""}	[[["Farmacéutico", "Buenas tardes, ¿en qué puedo ayudarle?"], ["Cliente", "Necesito algo para el dolor de cabeza."]], [["Farmacéutico", "¿Prefiere pastillas o jarabe?"], ["Cliente", "Pastillas, por favor."]], [["Farmacéutico", "Aquí tiene. ¿Necesita algo más?"], ["Cliente", "No, eso es todo. Muchas gracias."]]]	Farmacéutico	A2	Listening	10	\N
11	El Cambio Climático	Lectura sobre las causas y consecuencias del cambio climático.	{"El cambio climático es uno de los mayores desafíos que enfrenta la humanidad hoy en día. Se refiere a los cambios significativos y duraderos en los patrones del clima global. Las principales causas son las actividades humanas como la quema de combustibles fósiles y la deforestación. Esto ha llevado a un aumento en la concentración de gases de efecto invernadero en la atmósfera, provocando un calentamiento global. Las consecuencias incluyen el derretimiento de los glaciares, el aumento del nivel del mar y fenómenos climáticos extremos como huracanes y sequías."}	[""]		B2	Reading	11	\N
12	La Alimentación Saludable	Lectura sobre la importancia de llevar una dieta equilibrada.	{"Mantener una alimentación saludable es fundamental para el bienestar general. Una dieta equilibrada incluye frutas, verduras, proteínas, carbohidratos y grasas saludables. Evitar el consumo excesivo de azúcares y alimentos procesados ayuda a prevenir enfermedades como la obesidad, la diabetes y problemas cardíacos. Además, beber suficiente agua y hacer ejercicio regularmente son hábitos esenciales para una vida saludable."}	[""]		A2	Reading	12	\N
13	La Historia del Café	Un texto sobre el origen y la expansión del consumo de café en el mundo.	{"El café es una de las bebidas más populares del mundo. Se cree que su origen se remonta a Etiopía, donde se descubrieron los efectos estimulantes de los granos de café. A lo largo de los siglos, su consumo se extendió a Medio Oriente, Europa y América. Hoy en día, el café no solo es una bebida sino también parte de la cultura en muchos países. Su producción y comercio representan una fuente de ingresos para millones de personas en todo el mundo."}	[""]		B1	Reading	13	\N
\.


--
-- Data for Name: Courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Courses" (id, title, description, languages_id) FROM stdin;
1	English-Spanish	\N	2
2	Spanish-English	\N	1
\.


--
-- Data for Name: Exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Exercise" (id, difficulty, type, prompt, choices, compact_translations, solution_translations, correct_solutions, correct_answers, display_tokens, correct_indices, correct_index, tts, source_languages, target_languages, unit_id) FROM stdin;
2	easy	Translation	Dog	{"{\\"text\\": \\"Perro\\"}","{\\"text\\": \\"Gato\\"}","{\\"text\\": \\"Caballo\\"}","{\\"text\\": \\"Pájaro\\"}"}	{Dog}	\N	{Perro}	{Perro}	{}	{0}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/Dog-lTaMgAd11sc5FqPyOPSrEh2otpU8u8.mp3	en	es	1
4	easy	ChooseCorrect	What is the color of the sky?	{"{\\"text\\": \\"Blue\\"}","{\\"text\\": \\"Green\\"}","{\\"text\\": \\"Red\\"}","{\\"text\\": \\"Yellow\\"}"}	\N	\N	\N	\N	{}	{}	0	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/What%20is%20the%20color%20of%20the%20sky-sqozJgxcbpZg6ZM5wexMDGPMWU87XB	en	es	1
3	easy	CompleteSentence	I want to eat a icecream	{}	\N	\N	\N	\N	{"{\\"text\\": \\"Quiero\\", \\"isBlank\\": false}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"comer\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"helado\\", \\"isBlank\\": false}"}	{}	\N		en	es	1
1	easy	Translation	Hello	{"{\\"text\\": \\"Hola\\"}","{\\"text\\": \\"Adiós\\"}","{\\"text\\": \\"Gracias\\"}","{\\"text\\": \\"Casa\\"}"}	{Hello,Hi}	\N	{Hola}	{Hola}	{}	{0}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/Hello-EUc4HTpLsGevATfu4Totn5QCyu0uOJ.mp3	en	es	1
5	easy	Translation	Cat	{"{\\"text\\": \\"Gato\\"}","{\\"text\\": \\"Perro\\"}","{\\"text\\": \\"Caballo\\"}","{\\"text\\": \\"Pájaro\\"}"}	{Gato}	\N	{Gato}	{Gato}	{}	{0}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/Cat-ZHX0cgdubfvEl2bI29inDVNKbh5XrA.mp3	en	es	1
6	easy	WriteDown	Translate: 'I am hungry'	{}	{"Tengo hambre"}	Tengo hambre	\N	\N	{}	{}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/Translate:%20'I%20am%20hungry'-QyBqmajMhaSQTDGdgagU49ryLoT35S.mp3	en	es	1
14	easy	Translation	Ella siempre llega tarde al trabajo.	{"{\\"text\\": \\"She is always late to work.\\"}","{\\"text\\": \\"She always comes early to work.\\"}","{\\"text\\": \\"She never arrives late.\\"}","{\\"text\\": \\"She is on time.\\"}"}	{"She is always late to work."}	\N	{"She is always late to work."}	{"She is always late to work."}	{}	{0}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/Ella%20siempre%20llega%20tarde%20al%20trabajo.-JvlpRAsCRFCGBIHrh6lGBnQSzeynYC.mp3	es	en	2
10	medium	Translation	La casa es grande.	{"{\\"text\\": \\"The house is big.\\"}","{\\"text\\": \\"The house is small.\\"}","{\\"text\\": \\"The big house.\\"}","{\\"text\\": \\"A large house.\\"}"}	{"The house is big."}	\N	{"The house is big."}	{"The house is big"}	{}	{}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/La%20casa%20es%20grande.-E4TgWfOgUfKdCUJvkfDB6sIO6K0eHi.mp3	es	en	2
11	easy	ChooseCorrect	¿Cómo se dice 'gato' en inglés?	{"{\\"text\\": \\"Cat\\"}","{\\"text\\": \\"Dog\\"}","{\\"text\\": \\"Bird\\"}","{\\"text\\": \\"Fish\\"}"}	\N	\N	\N	\N	{}	{}	0	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/%C2%BFC%C3%B3mo%20se%20dice%20'gato'%20en%20ingl%C3%A9s-b5we52G0cevUV1ovYoGSSPf7Ohd0kj	es	en	2
12	medium	WriteDown	The sun is shining.	{}	{"El sol está brillando."}	El sol está brillando.	\N	\N	{}	{}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/The%20sun%20is%20shining.-jqGmoIC0wcKtUipvNLUZbUPVJTbVc5.mp3	es	en	2
13	medium	CompleteSentence	The %cat% is %sleeping% on the %sofa%.	{}	\N	\N	\N	\N	{"{\\"text\\": \\"The\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"cat\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"is\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"sleeping\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"on\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"the\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"sofa\\", \\"isBlank\\": true}"}	{}	\N		es	en	2
15	easy	ChooseCorrect	Good Morning	{"{\\"text\\": \\"Buenos Dias\\"}","{\\"text\\": \\"Buenas Noches\\"}","{\\"text\\": \\"Como estas?\\"}","{\\"text\\": \\"Gracias\\"}"}	\N	\N	\N	\N	{}	{}	0	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/%C2%BFQu%C3%A9%20escuchaste-Cmb6FVBz1foUfwPrYAIVRgt8TJtg5K	es	en	2
\.


--
-- Data for Name: Historical; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Historical" (id, user_id, last_watched, content_id) FROM stdin;
\.


--
-- Data for Name: Languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Languages" (id, name, short_name, "coursesId") FROM stdin;
1	spanish	es	\N
2	english	en	\N
\.


--
-- Data for Name: LanguagesCombos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LanguagesCombos" (id, base_language_id, target_language, target_language_id) FROM stdin;
1	1	{"name": "english"}	2
2	2	{"name": "spanish"}	1
\.


--
-- Data for Name: Level; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Level" (id, title, description, difficulty, unit_id, user_courses_id) FROM stdin;
1	Greetings	Introduction to greetings	easy	1	1
3	Items	Items	easy	1	1
2	Food	Food	easy	1	1
4	Saludos	Saludos	easy	2	\N
5	Comida	Comida	easy	2	\N
6	Cocina	Cocina	easy	2	\N
\.


--
-- Data for Name: LivesAndStrikes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LivesAndStrikes" (id, lives, last_live_date, strikes_length, last_strike_date) FROM stdin;
3	5	\N	0	\N
2	5	2024-12-02 16:08:36.324	1	2024-12-03 18:36:33.862
\.


--
-- Data for Name: PendingContent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PendingContent" (id, marked_as_read, is_completed, user_content_id, pending_id) FROM stdin;
1	f	t	2	3
2	f	t	2	2
3	t	f	2	1
\.


--
-- Data for Name: QuestionAndAnswer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."QuestionAndAnswer" (id, title, options, correct_answer, content_details_id) FROM stdin;
1	My mother is a...	{Doctor,Nurse,Writer,Waitress}	Nurse	1
2	My house is near the...	{City,Monastery,Mountains,Italy}	Mountains	1
3	How old was I when my grandmother came?	{"Three years old","Just born","Ten years old","Two years old"}	Ten years old	1
4	On the weekends, we...	{"Play board games together","Go to a movie","Clean the house","Cook pasta"}	Play board games together	1
5	What time does John wake up?	{"6 a.m.","7 a.m.","8 a.m.","9 a.m."}	7 a.m.	2
6	Where does John work?	{School,Office,Hospital,Factory}	Office	2
7	What does John like to do after work?	{"Cook dinner","Go running","Watch movies","Go shopping"}	Go running	2
8	What does John enjoy on weekends?	{"Playing video games",Cooking,Traveling,Painting}	Cooking	2
9	Which city did Sophia visit?	{London,Rome,Paris,Berlin}	Paris	3
10	What type of food did Sophia enjoy?	{Italian,French,Mexican,Japanese}	French	3
11	What river did Sophia take a boat ride on?	{Thames,Tiber,Seine,Danube}	Seine	3
12	What class did Sophia attend?	{Cooking,Painting,Language,Photography}	Language	3
13	Who conceptualized the Analytical Engine?	{"Alan Turing","Charles Babbage","Ada Lovelace","John von Neumann"}	Charles Babbage	4
14	What is Ada Lovelace known for?	{"Developing hardware","Writing algorithms","Inventing the internet","Creating databases"}	Writing algorithms	4
15	When did electronic computers like ENIAC emerge?	{"Early 19th century","Mid-20th century","Late 18th century","21st century"}	Mid-20th century	4
16	What is the significance of computers today?	{"Only used for gaming","Mainly for artistic purposes","Integral to modern life","Limited to military use"}	Integral to modern life	4
17	What is the main topic of the meeting?	{"Budget allocation","Project deadlines","Team performance","Customer feedback"}	Project deadlines	5
18	When is the product launch scheduled?	{"Next week","Next month","Next year",Tomorrow}	Next month	5
19	When did the first moon landing occur?	{1959,1969,1979,1989}	1969	6
20	What was key to the success of the mission?	{Funding,Teamwork,Technology,"Public support"}	Teamwork	6
21	What document did the agent ask for?	{"Driver's license",Passport,"Boarding pass","ID card"}	Passport	7
22	How many suitcases is the traveler checking in?	{None,One,Two,Three}	One	7
23	What is the maximum allowed liquid amount for carry-ons?	{"100 milliliters","200 milliliters","1 liter","500 milliliters"}	100 milliliters	7
24	¿Qué ordenó el cliente para comer?	{"Pizza y refresco","Ensalada y sopa","Sándwich y café","Tacos y agua"}	Ensalada y sopa	8
25	¿Qué bebida pidió el cliente?	{Refresco,Agua,Limonada,Cerveza}	Limonada	8
26	¿Cuándo quiere hacer la reservación el huésped?	{"Esta noche","El próximo fin de semana",Mañana,"La próxima semana"}	El próximo fin de semana	9
27	¿Para cuántas personas es la reservación?	{Una,Dos,Tres,Cuatro}	Dos	9
28	¿Qué tipo de habitación pidió el huésped?	{Individual,Doble,Matrimonial,Suite}	Matrimonial	9
29	¿Qué necesita el cliente?	{"Medicamento para la fiebre","Algo para el dolor de cabeza",Vitaminas,"Un jarabe para la tos"}	Algo para el dolor de cabeza	10
30	¿Qué forma de medicamento prefiere el cliente?	{Jarabe,Pastillas,Inyección,Cápsulas}	Pastillas	10
31	¿Qué es el cambio climático?	{"Una estación del año","Un cambio significativo en los patrones del clima global","Una disminución de las temperaturas","Un fenómeno local"}	Un cambio significativo en los patrones del clima global	11
32	¿Cuál es una de las principales causas del cambio climático?	{"La agricultura sostenible","La quema de combustibles fósiles","La preservación de bosques","El reciclaje de plástico"}	La quema de combustibles fósiles	11
33	¿Cuál es una consecuencia del cambio climático mencionada en el texto?	{"Menor consumo de energía","El derretimiento de los glaciares","Menos huracanes","Mayor estabilidad climática"}	El derretimiento de los glaciares	11
34	¿Qué es fundamental para el bienestar general?	{"Dormir menos","Tener una alimentación saludable","Consumir más azúcar","Evitar las frutas y verduras"}	Tener una alimentación saludable	12
35	¿Qué alimentos deben evitarse en exceso?	{"Frutas y verduras","Azúcares y alimentos procesados","Proteínas y carbohidratos","Grasas saludables"}	Azúcares y alimentos procesados	12
36	¿Qué hábito es esencial junto con una buena alimentación?	{"Hacer ejercicio regularmente","Comer solo carbohidratos","Dormir menos de 5 horas","Evitar beber agua"}	Hacer ejercicio regularmente	12
37	¿Dónde se originó el café según el texto?	{Brasil,Etiopía,Colombia,Italia}	Etiopía	13
38	¿En qué regiones se expandió el consumo de café primero?	{"África y Asia","Medio Oriente y Europa","Oceanía y América","Europa del Este"}	Medio Oriente y Europa	13
39	¿Qué representa el café para millones de personas?	{"Un pasatiempo","Una fuente de ingresos","Un deporte","Una tradición familiar"}	Una fuente de ingresos	13
\.


--
-- Data for Name: Ranks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ranks" (id, name, distintive) FROM stdin;
1	silver	
2	iron	
3	bronze	
\.


--
-- Data for Name: Section; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Section" (id, title, description, color, img_src, "courseId") FROM stdin;
1	Basics of Spanish	This is a sample text for you :)	success	\N	1
2	Intermediate Spanish	This is a sample text for you	error	\N	1
3	Fundamentos del Ingles	Texto de prueba para testear el comportamiento hola mundo	info	\N	2
4	Ingles intermedio	Texto de prueba para testear el comportamiento hola mundo	secondary	\N	2
\.


--
-- Data for Name: Unit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Unit" (id, title, description, "sectionId", color) FROM stdin;
2	1. Introduccion	Simple introduccion al ingles	3	info
1	1. Introduction	Simple introduction to spanish	1	success
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, active, created_at, email, password, name, biography, location, profile_id, lives_and_strikes_id) FROM stdin;
3	t	2024-12-02 19:00:14.941	admin@admin.com	$2b$08$OBzYbLTbu2uZwaLs5ofVFeA.j.J0yjaAJ.BXvKzSWlBoqCouYJTsu	Matias Benitez	\N	\N	3	3
2	t	2024-12-01 22:07:07.928	agustinbenitez81@gmail.com	$2b$08$jR8N1rTihp310gpOIrU/u.dwHrqF0DVluK6u.Otd3IWQa8TIGGV8W	Matias Benitez	Hi, my name is chupacabra	Buenos Aires	2	2
\.


--
-- Data for Name: UserContent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserContent" (id, user_id) FROM stdin;
2	2
3	3
\.


--
-- Data for Name: UserCourses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserCourses" (id, active, course_id, user_id) FROM stdin;
2	t	1	3
1	f	1	2
3	t	2	2
\.


--
-- Data for Name: UserLanguages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserLanguages" (id, active, details_id, user_profile_id) FROM stdin;
3	t	2	3
2	f	2	2
4	t	1	2
\.


--
-- Data for Name: UserProfile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserProfile" (id, color, animal_name) FROM stdin;
3	accent	wombat
2	error	chipmunk
\.


--
-- Data for Name: UserRank; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserRank" (rank_id, user_id, created_at, updated_at, user_experience) FROM stdin;
1	2	2024-12-01 22:07:07.928	2024-12-02 07:15:34.35	-78
1	3	2024-12-02 19:00:14.941	2024-12-02 19:00:14.939	0
\.


--
-- Name: ContentDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContentDetails_id_seq"', 13, true);


--
-- Name: Content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Content_id_seq"', 13, true);


--
-- Name: Courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Courses_id_seq"', 2, true);


--
-- Name: Exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Exercise_id_seq"', 15, true);


--
-- Name: Historical_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Historical_id_seq"', 1, false);


--
-- Name: LanguagesCombos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LanguagesCombos_id_seq"', 2, true);


--
-- Name: Languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Languages_id_seq"', 2, true);


--
-- Name: Level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Level_id_seq"', 6, true);


--
-- Name: LivesAndStrikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LivesAndStrikes_id_seq"', 3, true);


--
-- Name: PendingContent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PendingContent_id_seq"', 3, true);


--
-- Name: QuestionAndAnswer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."QuestionAndAnswer_id_seq"', 39, true);


--
-- Name: Ranks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ranks_id_seq"', 3, true);


--
-- Name: Section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Section_id_seq"', 4, true);


--
-- Name: Unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Unit_id_seq"', 2, true);


--
-- Name: UserContent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserContent_id_seq"', 3, true);


--
-- Name: UserCourses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserCourses_id_seq"', 3, true);


--
-- Name: UserLanguages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserLanguages_id_seq"', 4, true);


--
-- Name: UserProfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserProfile_id_seq"', 3, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- Name: ContentDetails ContentDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContentDetails"
    ADD CONSTRAINT "ContentDetails_pkey" PRIMARY KEY (id);


--
-- Name: Content Content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_pkey" PRIMARY KEY (id);


--
-- Name: Courses Courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY (id);


--
-- Name: Exercise Exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercise"
    ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY (id);


--
-- Name: Historical Historical_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historical"
    ADD CONSTRAINT "Historical_pkey" PRIMARY KEY (id);


--
-- Name: LanguagesCombos LanguagesCombos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LanguagesCombos"
    ADD CONSTRAINT "LanguagesCombos_pkey" PRIMARY KEY (id);


--
-- Name: Languages Languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Languages"
    ADD CONSTRAINT "Languages_pkey" PRIMARY KEY (id);


--
-- Name: Level Level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Level"
    ADD CONSTRAINT "Level_pkey" PRIMARY KEY (id);


--
-- Name: LivesAndStrikes LivesAndStrikes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LivesAndStrikes"
    ADD CONSTRAINT "LivesAndStrikes_pkey" PRIMARY KEY (id);


--
-- Name: PendingContent PendingContent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PendingContent"
    ADD CONSTRAINT "PendingContent_pkey" PRIMARY KEY (id);


--
-- Name: QuestionAndAnswer QuestionAndAnswer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionAndAnswer"
    ADD CONSTRAINT "QuestionAndAnswer_pkey" PRIMARY KEY (id);


--
-- Name: Ranks Ranks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ranks"
    ADD CONSTRAINT "Ranks_pkey" PRIMARY KEY (id);


--
-- Name: Section Section_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Section"
    ADD CONSTRAINT "Section_pkey" PRIMARY KEY (id);


--
-- Name: Unit Unit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_pkey" PRIMARY KEY (id);


--
-- Name: UserContent UserContent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserContent"
    ADD CONSTRAINT "UserContent_pkey" PRIMARY KEY (id);


--
-- Name: UserCourses UserCourses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_pkey" PRIMARY KEY (id);


--
-- Name: UserLanguages UserLanguages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLanguages"
    ADD CONSTRAINT "UserLanguages_pkey" PRIMARY KEY (id);


--
-- Name: UserProfile UserProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfile"
    ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY (id);


--
-- Name: UserRank UserRank_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRank"
    ADD CONSTRAINT "UserRank_pkey" PRIMARY KEY (rank_id, user_id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Courses_languages_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Courses_languages_id_key" ON public."Courses" USING btree (languages_id);


--
-- Name: Languages_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Languages_name_key" ON public."Languages" USING btree (name);


--
-- Name: UserRank_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UserRank_user_id_key" ON public."UserRank" USING btree (user_id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_lives_and_strikes_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_lives_and_strikes_id_key" ON public."User" USING btree (lives_and_strikes_id);


--
-- Name: User_profile_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_profile_id_key" ON public."User" USING btree (profile_id);


--
-- Name: ContentDetails ContentDetails_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContentDetails"
    ADD CONSTRAINT "ContentDetails_content_id_fkey" FOREIGN KEY (content_id) REFERENCES public."Content"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Content Content_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_language_id_fkey" FOREIGN KEY (language_id) REFERENCES public."Languages"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Courses Courses_languages_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_languages_id_fkey" FOREIGN KEY (languages_id) REFERENCES public."LanguagesCombos"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Exercise Exercise_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercise"
    ADD CONSTRAINT "Exercise_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Historical Historical_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historical"
    ADD CONSTRAINT "Historical_content_id_fkey" FOREIGN KEY (content_id) REFERENCES public."Content"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Historical Historical_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historical"
    ADD CONSTRAINT "Historical_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LanguagesCombos LanguagesCombos_base_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LanguagesCombos"
    ADD CONSTRAINT "LanguagesCombos_base_language_id_fkey" FOREIGN KEY (base_language_id) REFERENCES public."Languages"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Level Level_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Level"
    ADD CONSTRAINT "Level_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Level Level_user_courses_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Level"
    ADD CONSTRAINT "Level_user_courses_id_fkey" FOREIGN KEY (user_courses_id) REFERENCES public."UserCourses"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PendingContent PendingContent_pending_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PendingContent"
    ADD CONSTRAINT "PendingContent_pending_id_fkey" FOREIGN KEY (pending_id) REFERENCES public."ContentDetails"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PendingContent PendingContent_user_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PendingContent"
    ADD CONSTRAINT "PendingContent_user_content_id_fkey" FOREIGN KEY (user_content_id) REFERENCES public."UserContent"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: QuestionAndAnswer QuestionAndAnswer_content_details_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionAndAnswer"
    ADD CONSTRAINT "QuestionAndAnswer_content_details_id_fkey" FOREIGN KEY (content_details_id) REFERENCES public."ContentDetails"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Section Section_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Section"
    ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Courses"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Unit Unit_sectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES public."Section"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserContent UserContent_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserContent"
    ADD CONSTRAINT "UserContent_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserCourses UserCourses_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Courses"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserCourses UserCourses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserLanguages UserLanguages_details_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLanguages"
    ADD CONSTRAINT "UserLanguages_details_id_fkey" FOREIGN KEY (details_id) REFERENCES public."LanguagesCombos"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserLanguages UserLanguages_user_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLanguages"
    ADD CONSTRAINT "UserLanguages_user_profile_id_fkey" FOREIGN KEY (user_profile_id) REFERENCES public."UserProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserRank UserRank_rank_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRank"
    ADD CONSTRAINT "UserRank_rank_id_fkey" FOREIGN KEY (rank_id) REFERENCES public."Ranks"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserRank UserRank_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRank"
    ADD CONSTRAINT "UserRank_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_lives_and_strikes_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_lives_and_strikes_id_fkey" FOREIGN KEY (lives_and_strikes_id) REFERENCES public."LivesAndStrikes"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public."UserProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

