--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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

DROP DATABASE IF EXISTS auth_db;
--
-- Name: auth_db; Type: DATABASE; Schema: -; Owner: surojit
--

CREATE DATABASE auth_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE auth_db OWNER TO surojit;

\connect auth_db

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: GeneralUserCredentials; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."GeneralUserCredentials"
(
    id                integer                NOT NULL,
    password          character varying(255) NOT NULL,
    last_login_device character varying(255),
    last_login_time   timestamp with time zone,
    otp_code          character varying(255),
    user_id           integer                NOT NULL
);


ALTER TABLE public."GeneralUserCredentials"
    OWNER TO surojit;

--
-- Name: GeneralUserCredentials_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."GeneralUserCredentials_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."GeneralUserCredentials_id_seq"
    OWNER TO surojit;

--
-- Name: GeneralUserCredentials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."GeneralUserCredentials_id_seq" OWNED BY public."GeneralUserCredentials".id;


--
-- Name: GeneralUsers; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."GeneralUsers"
(
    id          integer                                               NOT NULL,
    first_name  character varying(255)                                NOT NULL,
    last_name   character varying(255)                                NOT NULL,
    middle_name character varying(255),
    email       character varying(255)                                NOT NULL,
    status      character varying(255) DEFAULT 'A'::character varying NOT NULL,
    user_id     uuid                                                  NOT NULL
);


ALTER TABLE public."GeneralUsers"
    OWNER TO surojit;

--
-- Name: GeneralUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."GeneralUsers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."GeneralUsers_id_seq"
    OWNER TO surojit;

--
-- Name: GeneralUsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."GeneralUsers_id_seq" OWNED BY public."GeneralUsers".id;


--
-- Name: GeneralUserCredentials id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralUserCredentials"
    ALTER COLUMN id SET DEFAULT nextval('public."GeneralUserCredentials_id_seq"'::regclass);


--
-- Name: GeneralUsers id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralUsers"
    ALTER COLUMN id SET DEFAULT nextval('public."GeneralUsers_id_seq"'::regclass);


--
-- Data for Name: GeneralUserCredentials; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."GeneralUserCredentials" (id, password, last_login_device, last_login_time, otp_code, user_id) FROM stdin;
6	$2b$05$dr72IrlaYPukWrTA0gcd/ODSLLLiDqHGxLRohJvTx7s17fKu6QTnW	\N	\N	\N	6
\.


--
-- Data for Name: GeneralUsers; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."GeneralUsers" (id, first_name, last_name, middle_name, email, status, user_id) FROM stdin;
6	Rita	Paul		surojit99923@gmail.com	A	4887d860-78cb-4c07-9ae2-261c822ce825
\.


--
-- Name: GeneralUserCredentials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."GeneralUserCredentials_id_seq"', 6, true);


--
-- Name: GeneralUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."GeneralUsers_id_seq"', 6, true);


--
-- Name: GeneralUserCredentials GeneralUserCredentials_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralUserCredentials"
    ADD CONSTRAINT "GeneralUserCredentials_pkey" PRIMARY KEY (id);


--
-- Name: GeneralUsers GeneralUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralUsers"
    ADD CONSTRAINT "GeneralUsers_pkey" PRIMARY KEY (id);


--
-- Name: GeneralUserCredentials GeneralUserCredentials_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralUserCredentials"
    ADD CONSTRAINT "GeneralUserCredentials_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."GeneralUsers" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

