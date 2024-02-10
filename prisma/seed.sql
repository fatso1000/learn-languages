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
-- Name: public; Type: SCHEMA; Schema: -; Owner: "default"
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "default";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: "default"
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ExerciseDifficulty; Type: TYPE; Schema: public; Owner: "default"
--

CREATE TYPE public."ExerciseDifficulty" AS ENUM (
    'easy',
    'medium',
    'hard'
);


ALTER TYPE public."ExerciseDifficulty" OWNER TO "default";

--
-- Name: ExerciseType; Type: TYPE; Schema: public; Owner: "default"
--

CREATE TYPE public."ExerciseType" AS ENUM (
    'Translation',
    'ChooseCorrect',
    'CompleteSentence',
    'Listening',
    'MultipleChoice',
    'WriteDown'
);


ALTER TYPE public."ExerciseType" OWNER TO "default";

--
-- Name: Levels; Type: TYPE; Schema: public; Owner: "default"
--

CREATE TYPE public."Levels" AS ENUM (
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2'
);


ALTER TYPE public."Levels" OWNER TO "default";

--
-- Name: Types; Type: TYPE; Schema: public; Owner: "default"
--

CREATE TYPE public."Types" AS ENUM (
    'Listening',
    'Exercise',
    'Reading'
);


ALTER TYPE public."Types" OWNER TO "default";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Content; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."Content" (
    id integer NOT NULL,
    title text NOT NULL,
    type public."Types" NOT NULL,
    level public."Levels" NOT NULL,
    language_id integer NOT NULL
);


ALTER TABLE public."Content" OWNER TO "default";

--
-- Name: ContentDetails; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."ContentDetails" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    text text[],
    level public."Levels" NOT NULL,
    type public."Types" NOT NULL,
    content_id integer NOT NULL,
    tts text
);


ALTER TABLE public."ContentDetails" OWNER TO "default";

--
-- Name: ContentDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."ContentDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ContentDetails_id_seq" OWNER TO "default";

--
-- Name: ContentDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."ContentDetails_id_seq" OWNED BY public."ContentDetails".id;


--
-- Name: Content_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Content_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Content_id_seq" OWNER TO "default";

--
-- Name: Content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Content_id_seq" OWNED BY public."Content".id;


--
-- Name: Courses; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."Courses" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    language_id integer NOT NULL,
    target_language jsonb NOT NULL,
    target_language_id integer NOT NULL
);


ALTER TABLE public."Courses" OWNER TO "default";

--
-- Name: Courses_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Courses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Courses_id_seq" OWNER TO "default";

--
-- Name: Courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Courses_id_seq" OWNED BY public."Courses".id;


--
-- Name: Exercise; Type: TABLE; Schema: public; Owner: "default"
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


ALTER TABLE public."Exercise" OWNER TO "default";

--
-- Name: Exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Exercise_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Exercise_id_seq" OWNER TO "default";

--
-- Name: Exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Exercise_id_seq" OWNED BY public."Exercise".id;


--
-- Name: Historical; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."Historical" (
    id integer NOT NULL,
    user_id integer,
    last_watched timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content_id integer NOT NULL
);


ALTER TABLE public."Historical" OWNER TO "default";

--
-- Name: Historical_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Historical_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Historical_id_seq" OWNER TO "default";

--
-- Name: Historical_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Historical_id_seq" OWNED BY public."Historical".id;


--
-- Name: Languages; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."Languages" (
    id integer NOT NULL,
    name text NOT NULL,
    short_name text NOT NULL
);


ALTER TABLE public."Languages" OWNER TO "default";

--
-- Name: Languages_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Languages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Languages_id_seq" OWNER TO "default";

--
-- Name: Languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Languages_id_seq" OWNED BY public."Languages".id;


--
-- Name: Level; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."Level" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    difficulty public."ExerciseDifficulty" NOT NULL,
    unit_id integer NOT NULL,
    user_courses_id integer
);


ALTER TABLE public."Level" OWNER TO "default";

--
-- Name: Level_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Level_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Level_id_seq" OWNER TO "default";

--
-- Name: Level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Level_id_seq" OWNED BY public."Level".id;


--
-- Name: PendingContent; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."PendingContent" (
    id integer NOT NULL,
    marked_as_read boolean NOT NULL,
    is_completed boolean NOT NULL,
    user_content_id integer NOT NULL,
    pending_id integer NOT NULL
);


ALTER TABLE public."PendingContent" OWNER TO "default";

--
-- Name: PendingContent_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."PendingContent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PendingContent_id_seq" OWNER TO "default";

--
-- Name: PendingContent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."PendingContent_id_seq" OWNED BY public."PendingContent".id;


--
-- Name: QuestionAndAnswer; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."QuestionAndAnswer" (
    id integer NOT NULL,
    title text NOT NULL,
    options text[],
    correct_answer text NOT NULL,
    content_details_id integer NOT NULL
);


ALTER TABLE public."QuestionAndAnswer" OWNER TO "default";

--
-- Name: QuestionAndAnswer_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."QuestionAndAnswer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."QuestionAndAnswer_id_seq" OWNER TO "default";

--
-- Name: QuestionAndAnswer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."QuestionAndAnswer_id_seq" OWNED BY public."QuestionAndAnswer".id;


--
-- Name: Ranks; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."Ranks" (
    id integer NOT NULL,
    name text NOT NULL,
    distintive text NOT NULL
);


ALTER TABLE public."Ranks" OWNER TO "default";

--
-- Name: Ranks_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Ranks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Ranks_id_seq" OWNER TO "default";

--
-- Name: Ranks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Ranks_id_seq" OWNED BY public."Ranks".id;


--
-- Name: Section; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."Section" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    color text,
    img_src text,
    "courseId" integer NOT NULL
);


ALTER TABLE public."Section" OWNER TO "default";

--
-- Name: Section_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Section_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Section_id_seq" OWNER TO "default";

--
-- Name: Section_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Section_id_seq" OWNED BY public."Section".id;


--
-- Name: Unit; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."Unit" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    "sectionId" integer NOT NULL,
    color text NOT NULL
);


ALTER TABLE public."Unit" OWNER TO "default";

--
-- Name: Unit_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."Unit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Unit_id_seq" OWNER TO "default";

--
-- Name: Unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."Unit_id_seq" OWNED BY public."Unit".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    active boolean,
    biography text,
    profile_id integer NOT NULL,
    location text
);


ALTER TABLE public."User" OWNER TO "default";

--
-- Name: UserContent; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."UserContent" (
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE public."UserContent" OWNER TO "default";

--
-- Name: UserContent_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."UserContent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserContent_id_seq" OWNER TO "default";

--
-- Name: UserContent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."UserContent_id_seq" OWNED BY public."UserContent".id;


--
-- Name: UserCourses; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."UserCourses" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."UserCourses" OWNER TO "default";

--
-- Name: UserCourses_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."UserCourses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserCourses_id_seq" OWNER TO "default";

--
-- Name: UserCourses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."UserCourses_id_seq" OWNED BY public."UserCourses".id;


--
-- Name: UserLanguages; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."UserLanguages" (
    id integer NOT NULL,
    active boolean DEFAULT false NOT NULL,
    language_id integer NOT NULL,
    user_profile_id integer NOT NULL
);


ALTER TABLE public."UserLanguages" OWNER TO "default";

--
-- Name: UserLanguages_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."UserLanguages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserLanguages_id_seq" OWNER TO "default";

--
-- Name: UserLanguages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."UserLanguages_id_seq" OWNED BY public."UserLanguages".id;


--
-- Name: UserProfile; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."UserProfile" (
    id integer NOT NULL,
    color text NOT NULL,
    animal_name text NOT NULL
);


ALTER TABLE public."UserProfile" OWNER TO "default";

--
-- Name: UserProfile_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."UserProfile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserProfile_id_seq" OWNER TO "default";

--
-- Name: UserProfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."UserProfile_id_seq" OWNED BY public."UserProfile".id;


--
-- Name: UserRank; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public."UserRank" (
    rank_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    user_experience integer NOT NULL
);


ALTER TABLE public."UserRank" OWNER TO "default";

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: "default"
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO "default";

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "default"
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: "default"
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "default";

--
-- Name: Content id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Content" ALTER COLUMN id SET DEFAULT nextval('public."Content_id_seq"'::regclass);


--
-- Name: ContentDetails id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."ContentDetails" ALTER COLUMN id SET DEFAULT nextval('public."ContentDetails_id_seq"'::regclass);


--
-- Name: Courses id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Courses" ALTER COLUMN id SET DEFAULT nextval('public."Courses_id_seq"'::regclass);


--
-- Name: Exercise id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Exercise" ALTER COLUMN id SET DEFAULT nextval('public."Exercise_id_seq"'::regclass);


--
-- Name: Historical id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Historical" ALTER COLUMN id SET DEFAULT nextval('public."Historical_id_seq"'::regclass);


--
-- Name: Languages id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Languages" ALTER COLUMN id SET DEFAULT nextval('public."Languages_id_seq"'::regclass);


--
-- Name: Level id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Level" ALTER COLUMN id SET DEFAULT nextval('public."Level_id_seq"'::regclass);


--
-- Name: PendingContent id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."PendingContent" ALTER COLUMN id SET DEFAULT nextval('public."PendingContent_id_seq"'::regclass);


--
-- Name: QuestionAndAnswer id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."QuestionAndAnswer" ALTER COLUMN id SET DEFAULT nextval('public."QuestionAndAnswer_id_seq"'::regclass);


--
-- Name: Ranks id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Ranks" ALTER COLUMN id SET DEFAULT nextval('public."Ranks_id_seq"'::regclass);


--
-- Name: Section id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Section" ALTER COLUMN id SET DEFAULT nextval('public."Section_id_seq"'::regclass);


--
-- Name: Unit id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Unit" ALTER COLUMN id SET DEFAULT nextval('public."Unit_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserContent id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserContent" ALTER COLUMN id SET DEFAULT nextval('public."UserContent_id_seq"'::regclass);


--
-- Name: UserCourses id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserCourses" ALTER COLUMN id SET DEFAULT nextval('public."UserCourses_id_seq"'::regclass);


--
-- Name: UserLanguages id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserLanguages" ALTER COLUMN id SET DEFAULT nextval('public."UserLanguages_id_seq"'::regclass);


--
-- Name: UserProfile id; Type: DEFAULT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserProfile" ALTER COLUMN id SET DEFAULT nextval('public."UserProfile_id_seq"'::regclass);


--
-- Data for Name: Content; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Content" (id, title, type, level, language_id) FROM stdin;
\.


--
-- Data for Name: ContentDetails; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."ContentDetails" (id, title, description, text, level, type, content_id, tts) FROM stdin;
\.


--
-- Data for Name: Courses; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Courses" (id, title, description, language_id, target_language, target_language_id) FROM stdin;
1	English-Spanish	\N	1	{"id": 2, "name": "spanish", "short_name": "es"}	2
2	Spanish-English	\N	2	{"id": 1, "name": "english", "short_name": "en"}	1
\.


--
-- Data for Name: Exercise; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Exercise" (id, difficulty, type, prompt, choices, compact_translations, solution_translations, correct_solutions, correct_answers, display_tokens, correct_indices, correct_index, tts, source_languages, target_languages, unit_id) FROM stdin;
1	easy	ChooseCorrect	Niño	{"{\\"text\\": \\"Kid\\"}","{\\"text\\": \\"Children\\"}","{\\"text\\": \\"Table\\"}"}	\N	\N	\N	\N	{}	{}	0	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/Ni%C3%B1o-KwR97ozmIoGwm2eVDMXNgApC9OZO1F.mp3	en	es	1
2	easy	Translation	I'm fine	{"{\\"text\\": \\"Estoy\\"}","{\\"text\\": \\"salvo\\"}","{\\"text\\": \\"encuentro\\"}","{\\"text\\": \\"bien\\"}"}	{"Estoy bien","Me encuentro bien"}	\N	{"Estoy bien"}	{Estoy,bien}	{}	{0,3}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/I'm%20fine-SCRpCUj9lObyR09DcSSfbQbCeNzu2p.mp3	en	es	1
3	easy	ChooseCorrect	El	{"{\\"text\\": \\"Boy\\"}","{\\"text\\": \\"The\\"}","{\\"text\\": \\"Clever\\"}"}	\N	\N	\N	\N	{}	{}	1	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/El-7FWCuqFaSA1GVnZNTjnLBCXJYiSj9t.mp3	es	en	1
4	easy	Translation	The woman eats bread	{"{\\"text\\": \\"La\\"}","{\\"text\\": \\"persona\\"}","{\\"text\\": \\"El\\"}","{\\"text\\": \\"mujer\\"}","{\\"text\\": \\"mira\\"}","{\\"text\\": \\"come\\"}","{\\"text\\": \\"pan\\"}"}	{"La mujer come pan"}	\N	{"La mujer come pan"}	{La,mujer,come,pan}	{}	{0,3,5,6}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/The%20woman%20eats%20bread-gzcn3E7dDQuH21CIlYyzzPoKdT0BlO.mp3	en	es	1
5	easy	Translation	A man trinkt water	{"{\\"text\\": \\"Un\\"}","{\\"text\\": \\"hombre\\"}","{\\"text\\": \\"Tu\\"}","{\\"text\\": \\"bebe\\"}","{\\"text\\": \\"mira\\"}","{\\"text\\": \\"agua\\"}","{\\"text\\": \\"espejo\\"}"}	{"Un hombre bebe agua"}	\N	{"Un hombre bebe agua"}	{Un,hombre,bebe,agua}	{}	{0,1,3,5}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/A%20man%20trinkt%20water-NSiz6wVFz65xLoYiTEK7ZmHsB8y70X.mp3	en	es	1
6	easy	CompleteSentence	I drink the milk	{}	\N	\N	\N	\N	{"{\\"text\\": \\"I\\", \\"isBlank\\": false}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"drink\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"the\\", \\"isBlank\\": false}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"milk\\", \\"isBlank\\": false}"}	{}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/I%20drink%20the%20milk-0yqM4dktJtrjWQ1j45wPBP3PAUkOKQ.mp3	en	es	1
7	easy	CompleteSentence	The woman eats	{}	\N	\N	\N	\N	{"{\\"text\\": \\"The\\", \\"isBlank\\": false}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"woman\\", \\"isBlank\\": true}","{\\"text\\": \\" \\", \\"isBlank\\": false}","{\\"text\\": \\"eats\\", \\"isBlank\\": false}"}	{}	\N	https://fwatxxx8tbyll9nt.public.blob.vercel-storage.com/tts/La%20mujer%20come-ogmME473lHtDIRFy0HGZ8DgtOlsZ6C.mp3	en	es	1
\.


--
-- Data for Name: Historical; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Historical" (id, user_id, last_watched, content_id) FROM stdin;
\.


--
-- Data for Name: Languages; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Languages" (id, name, short_name) FROM stdin;
1	english	en
2	spanish	es
3	italian	it
4	japanese	ja
5	german	de
6	french	fr
\.


--
-- Data for Name: Level; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Level" (id, title, description, difficulty, unit_id, user_courses_id) FROM stdin;
1	Usa frases básicas	Demuestra tus conocimientos y alcanza el nivel Legendario	easy	1	\N
2	Usa frases básicas	\N	medium	1	\N
3	Habla de la comida	\N	easy	1	\N
4	Habla de la comida	\N	medium	1	\N
\.


--
-- Data for Name: PendingContent; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."PendingContent" (id, marked_as_read, is_completed, user_content_id, pending_id) FROM stdin;
\.


--
-- Data for Name: QuestionAndAnswer; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."QuestionAndAnswer" (id, title, options, correct_answer, content_details_id) FROM stdin;
\.


--
-- Data for Name: Ranks; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Ranks" (id, name, distintive) FROM stdin;
1	Iron	
2	Bronze	
3	Silver	
4	Gold	
5	Platinum	
6	Emerald	
7	Diamond	
\.


--
-- Data for Name: Section; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Section" (id, title, description, color, img_src, "courseId") FROM stdin;
1	Fundamentos del Ingles	\N	success	\N	1
2	Explorar el mismo	\N	secondary	\N	1
3	Conversaciones complejas	\N	accent	\N	1
\.


--
-- Data for Name: Unit; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."Unit" (id, title, description, "sectionId", color) FROM stdin;
1	Sección 1	Usa frases básicas, habla de la comida	1	success
2	Sección 2	Saluda y despídete, describe la comida	1	secondary
3	Sección 3	Habla de animales, forma el plural	1	accent
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."User" (id, created_at, email, password, name, active, biography, profile_id, location) FROM stdin;
4	2024-02-08 15:29:05.636	admin@admin.com	$2b$08$jrU3NNePSdykK0ymbFc7P.U8bgo5.0px/OKBDobaxKbwmsiJBQw7a	admin	t	\N	4	\N
\.


--
-- Data for Name: UserContent; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."UserContent" (id, user_id) FROM stdin;
4	4
\.


--
-- Data for Name: UserCourses; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."UserCourses" (id, course_id, user_id) FROM stdin;
2	1	4
\.


--
-- Data for Name: UserLanguages; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."UserLanguages" (id, active, language_id, user_profile_id) FROM stdin;
4	t	1	4
\.


--
-- Data for Name: UserProfile; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."UserProfile" (id, color, animal_name) FROM stdin;
4	#00B5FF	wolf
\.


--
-- Data for Name: UserRank; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public."UserRank" (rank_id, user_id, created_at, updated_at, user_experience) FROM stdin;
1	4	2024-02-08 15:29:05.636	2024-02-08 15:29:05.634	0
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: "default"
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
55565b8b-08a2-454b-b0f9-40e6570c95a8	27357d7735888f2b0f0f2cdf5339094c582c2f07a2b74088d98cc138a349e86b	2024-02-08 14:29:56.479811+00	20231009003623_dev	\N	\N	2024-02-08 14:29:56.456955+00	1
\.


--
-- Name: ContentDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."ContentDetails_id_seq"', 1, false);


--
-- Name: Content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Content_id_seq"', 1, false);


--
-- Name: Courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Courses_id_seq"', 2, true);


--
-- Name: Exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Exercise_id_seq"', 7, true);


--
-- Name: Historical_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Historical_id_seq"', 1, false);


--
-- Name: Languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Languages_id_seq"', 6, true);


--
-- Name: Level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Level_id_seq"', 4, true);


--
-- Name: PendingContent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."PendingContent_id_seq"', 1, false);


--
-- Name: QuestionAndAnswer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."QuestionAndAnswer_id_seq"', 1, false);


--
-- Name: Ranks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Ranks_id_seq"', 7, true);


--
-- Name: Section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Section_id_seq"', 3, true);


--
-- Name: Unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."Unit_id_seq"', 3, true);


--
-- Name: UserContent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."UserContent_id_seq"', 4, true);


--
-- Name: UserCourses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."UserCourses_id_seq"', 2, true);


--
-- Name: UserLanguages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."UserLanguages_id_seq"', 4, true);


--
-- Name: UserProfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."UserProfile_id_seq"', 4, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: "default"
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- Name: ContentDetails ContentDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."ContentDetails"
    ADD CONSTRAINT "ContentDetails_pkey" PRIMARY KEY (id);


--
-- Name: Content Content_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_pkey" PRIMARY KEY (id);


--
-- Name: Courses Courses_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY (id);


--
-- Name: Exercise Exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Exercise"
    ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY (id);


--
-- Name: Historical Historical_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Historical"
    ADD CONSTRAINT "Historical_pkey" PRIMARY KEY (id);


--
-- Name: Languages Languages_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Languages"
    ADD CONSTRAINT "Languages_pkey" PRIMARY KEY (id);


--
-- Name: Level Level_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Level"
    ADD CONSTRAINT "Level_pkey" PRIMARY KEY (id);


--
-- Name: PendingContent PendingContent_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."PendingContent"
    ADD CONSTRAINT "PendingContent_pkey" PRIMARY KEY (id);


--
-- Name: QuestionAndAnswer QuestionAndAnswer_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."QuestionAndAnswer"
    ADD CONSTRAINT "QuestionAndAnswer_pkey" PRIMARY KEY (id);


--
-- Name: Ranks Ranks_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Ranks"
    ADD CONSTRAINT "Ranks_pkey" PRIMARY KEY (id);


--
-- Name: Section Section_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Section"
    ADD CONSTRAINT "Section_pkey" PRIMARY KEY (id);


--
-- Name: Unit Unit_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_pkey" PRIMARY KEY (id);


--
-- Name: UserContent UserContent_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserContent"
    ADD CONSTRAINT "UserContent_pkey" PRIMARY KEY (id);


--
-- Name: UserCourses UserCourses_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_pkey" PRIMARY KEY (id);


--
-- Name: UserLanguages UserLanguages_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserLanguages"
    ADD CONSTRAINT "UserLanguages_pkey" PRIMARY KEY (id);


--
-- Name: UserProfile UserProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserProfile"
    ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY (id);


--
-- Name: UserRank UserRank_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserRank"
    ADD CONSTRAINT "UserRank_pkey" PRIMARY KEY (rank_id, user_id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Courses_language_id_key; Type: INDEX; Schema: public; Owner: "default"
--

CREATE UNIQUE INDEX "Courses_language_id_key" ON public."Courses" USING btree (language_id);


--
-- Name: Languages_name_key; Type: INDEX; Schema: public; Owner: "default"
--

CREATE UNIQUE INDEX "Languages_name_key" ON public."Languages" USING btree (name);


--
-- Name: UserRank_user_id_key; Type: INDEX; Schema: public; Owner: "default"
--

CREATE UNIQUE INDEX "UserRank_user_id_key" ON public."UserRank" USING btree (user_id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: "default"
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_profile_id_key; Type: INDEX; Schema: public; Owner: "default"
--

CREATE UNIQUE INDEX "User_profile_id_key" ON public."User" USING btree (profile_id);


--
-- Name: ContentDetails ContentDetails_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."ContentDetails"
    ADD CONSTRAINT "ContentDetails_content_id_fkey" FOREIGN KEY (content_id) REFERENCES public."Content"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Content Content_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_language_id_fkey" FOREIGN KEY (language_id) REFERENCES public."Languages"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Courses Courses_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_language_id_fkey" FOREIGN KEY (language_id) REFERENCES public."Languages"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Exercise Exercise_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Exercise"
    ADD CONSTRAINT "Exercise_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Historical Historical_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Historical"
    ADD CONSTRAINT "Historical_content_id_fkey" FOREIGN KEY (content_id) REFERENCES public."Content"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Historical Historical_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Historical"
    ADD CONSTRAINT "Historical_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Level Level_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Level"
    ADD CONSTRAINT "Level_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Level Level_user_courses_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Level"
    ADD CONSTRAINT "Level_user_courses_id_fkey" FOREIGN KEY (user_courses_id) REFERENCES public."UserCourses"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PendingContent PendingContent_pending_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."PendingContent"
    ADD CONSTRAINT "PendingContent_pending_id_fkey" FOREIGN KEY (pending_id) REFERENCES public."ContentDetails"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PendingContent PendingContent_user_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."PendingContent"
    ADD CONSTRAINT "PendingContent_user_content_id_fkey" FOREIGN KEY (user_content_id) REFERENCES public."UserContent"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: QuestionAndAnswer QuestionAndAnswer_content_details_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."QuestionAndAnswer"
    ADD CONSTRAINT "QuestionAndAnswer_content_details_id_fkey" FOREIGN KEY (content_details_id) REFERENCES public."ContentDetails"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Section Section_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Section"
    ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Courses"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Unit Unit_sectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES public."Section"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserContent UserContent_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserContent"
    ADD CONSTRAINT "UserContent_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserCourses UserCourses_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Courses"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserCourses UserCourses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserLanguages UserLanguages_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserLanguages"
    ADD CONSTRAINT "UserLanguages_language_id_fkey" FOREIGN KEY (language_id) REFERENCES public."Languages"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserLanguages UserLanguages_user_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserLanguages"
    ADD CONSTRAINT "UserLanguages_user_profile_id_fkey" FOREIGN KEY (user_profile_id) REFERENCES public."UserProfile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserRank UserRank_rank_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserRank"
    ADD CONSTRAINT "UserRank_rank_id_fkey" FOREIGN KEY (rank_id) REFERENCES public."Ranks"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserRank UserRank_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."UserRank"
    ADD CONSTRAINT "UserRank_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "default"
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public."UserProfile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: "default"
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

