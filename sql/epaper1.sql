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

DROP DATABASE IF EXISTS "ePaper_db";
--
-- Name: ePaper_db; Type: DATABASE; Schema: -; Owner: surojit
--

CREATE DATABASE "ePaper_db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE "ePaper_db" OWNER TO surojit;

\connect "ePaper_db"

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
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: enum_AccountTemplateDetails_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AccountTemplateDetails_status" AS ENUM (
    'active',
    'deactive'
    );


ALTER TYPE public."enum_AccountTemplateDetails_status" OWNER TO surojit;

--
-- Name: enum_AccountsOfOrganizations_account_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AccountsOfOrganizations_account_type" AS ENUM (
    'group',
    'account_type',
    'account'
    );


ALTER TYPE public."enum_AccountsOfOrganizations_account_type" OWNER TO surojit;

--
-- Name: enum_AccountsOfOrganizations_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AccountsOfOrganizations_status" AS ENUM (
    'active',
    'inactive',
    'deleted'
    );


ALTER TYPE public."enum_AccountsOfOrganizations_status" OWNER TO surojit;

--
-- Name: enum_AccountsOfOrganizations_statusN; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AccountsOfOrganizations_statusN" AS ENUM (
    'active',
    'inactive',
    'deleted'
    );


ALTER TYPE public."enum_AccountsOfOrganizations_statusN" OWNER TO surojit;

--
-- Name: enum_AccountsOfTemplates_account_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AccountsOfTemplates_account_type" AS ENUM (
    'group',
    'account_type',
    'account'
    );


ALTER TYPE public."enum_AccountsOfTemplates_account_type" OWNER TO surojit;

--
-- Name: enum_Contacts_contact_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Contacts_contact_type" AS ENUM (
    'customer',
    'vendor'
    );


ALTER TYPE public."enum_Contacts_contact_type" OWNER TO surojit;

--
-- Name: enum_Contacts_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Contacts_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_Contacts_status" OWNER TO surojit;

--
-- Name: enum_CurrencyExchangeRate_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_CurrencyExchangeRate_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_CurrencyExchangeRate_status" OWNER TO surojit;

--
-- Name: enum_Currency_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Currency_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_Currency_status" OWNER TO surojit;

--
-- Name: enum_GeneralPreferences_discountType; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_GeneralPreferences_discountType" AS ENUM (
    'item_level',
    'entity_level',
    'no_discount'
    );


ALTER TYPE public."enum_GeneralPreferences_discountType" OWNER TO surojit;

--
-- Name: enum_GeneralPreferences_sales_tax_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_GeneralPreferences_sales_tax_type" AS ENUM (
    'inclusive',
    'exclusive',
    'entity_level'
    );


ALTER TYPE public."enum_GeneralPreferences_sales_tax_type" OWNER TO surojit;

--
-- Name: enum_GeneralPreferences_tax_rounding_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_GeneralPreferences_tax_rounding_type" AS ENUM (
    'item_level',
    'entity_level'
    );


ALTER TYPE public."enum_GeneralPreferences_tax_rounding_type" OWNER TO surojit;

--
-- Name: enum_InvoiceLineItems_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_InvoiceLineItems_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_InvoiceLineItems_status" OWNER TO surojit;

--
-- Name: enum_InvoicePaymentTerms_interval; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_InvoicePaymentTerms_interval" AS ENUM (
    'regular',
    'end_of_month',
    'end_of_day'
    );


ALTER TYPE public."enum_InvoicePaymentTerms_interval" OWNER TO surojit;

--
-- Name: enum_Invoices_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Invoices_status" AS ENUM (
    'active',
    'deactive',
    'deleted'
    );


ALTER TYPE public."enum_Invoices_status" OWNER TO surojit;

--
-- Name: enum_Invoices_transaction_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Invoices_transaction_status" AS ENUM (
    'sent',
    'draft',
    'void'
    );


ALTER TYPE public."enum_Invoices_transaction_status" OWNER TO surojit;

--
-- Name: enum_ItemUnits_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_ItemUnits_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_ItemUnits_status" OWNER TO surojit;

--
-- Name: enum_OrganizationsUsers_job_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_OrganizationsUsers_job_status" AS ENUM (
    'working',
    'suspended'
    );


ALTER TYPE public."enum_OrganizationsUsers_job_status" OWNER TO surojit;

--
-- Name: enum_OrganizationsUsers_role_id; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_OrganizationsUsers_role_id" AS ENUM (
    'admin',
    'staff'
    );


ALTER TYPE public."enum_OrganizationsUsers_role_id" OWNER TO surojit;

--
-- Name: enum_OrganizationsUsers_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_OrganizationsUsers_status" AS ENUM (
    'active',
    'deactive',
    'invited'
    );


ALTER TYPE public."enum_OrganizationsUsers_status" OWNER TO surojit;

--
-- Name: enum_PaymentTerms_interval; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_PaymentTerms_interval" AS ENUM (
    'regular',
    'end_of_month',
    'end_of_day'
    );


ALTER TYPE public."enum_PaymentTerms_interval" OWNER TO surojit;

--
-- Name: enum_PaymentTerms_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_PaymentTerms_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_PaymentTerms_status" OWNER TO surojit;

--
-- Name: enum_RegularItems_item_for; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_RegularItems_item_for" AS ENUM (
    'sales',
    'purchase',
    'sales_and_purchase'
    );


ALTER TYPE public."enum_RegularItems_item_for" OWNER TO surojit;

--
-- Name: enum_RegularItems_product_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_RegularItems_product_type" AS ENUM (
    'service',
    'goods'
    );


ALTER TYPE public."enum_RegularItems_product_type" OWNER TO surojit;

--
-- Name: enum_TaxRates_tax_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_TaxRates_tax_type" AS ENUM (
    'direct_tax',
    'tax'
    );


ALTER TYPE public."enum_TaxRates_tax_type" OWNER TO surojit;

--
-- Name: enum_Users_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Users_status" AS ENUM (
    'active',
    'deactive'
    );


ALTER TYPE public."enum_Users_status" OWNER TO surojit;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AccountGroups; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."AccountGroups"
(
    id             integer                     NOT NULL,
    name           character varying(255)      NOT NULL,
    code           character varying(255)      NOT NULL,
    name_formatted character varying(255)      NOT NULL,
    created_at     timestamp(6) with time zone NOT NULL,
    updated_at     timestamp(6) with time zone NOT NULL
);


ALTER TABLE public."AccountGroups"
    OWNER TO surojit;

--
-- Name: AccountGroups_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."AccountGroups_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AccountGroups_id_seq"
    OWNER TO surojit;

--
-- Name: AccountGroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."AccountGroups_id_seq" OWNED BY public."AccountGroups".id;


--
-- Name: AccountTemplateDetails; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."AccountTemplateDetails"
(
    id              integer                                                                                                   NOT NULL,
    name            character varying(255)                                                                                    NOT NULL,
    country_code    character varying(255)                                                                                    NOT NULL,
    sector          character varying(255),
    status          public."enum_AccountTemplateDetails_status" DEFAULT 'active'::public."enum_AccountTemplateDetails_status" NOT NULL,
    is_default      boolean,
    created_at      timestamp(6) with time zone                                                                               NOT NULL,
    updated_at      timestamp(6) with time zone                                                                               NOT NULL,
    origin_template_id integer,
    created_by      integer                                                                                                   NOT NULL,
    organization_id integer                                                                                                   NOT NULL
);


ALTER TABLE public."AccountTemplateDetails"
    OWNER TO surojit;

--
-- Name: AccountTemplateDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."AccountTemplateDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AccountTemplateDetails_id_seq"
    OWNER TO surojit;

--
-- Name: AccountTemplateDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."AccountTemplateDetails_id_seq" OWNED BY public."AccountTemplateDetails".id;


--
-- Name: AccountTypes; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."AccountTypes"
(
    id               integer                     NOT NULL,
    name             character varying(255)      NOT NULL,
    code             character varying(255)      NOT NULL,
    name_formatted   character varying(255)      NOT NULL,
    created_at       timestamp(6) with time zone NOT NULL,
    updated_at       timestamp(6) with time zone NOT NULL,
    account_group_id integer                     NOT NULL
);


ALTER TABLE public."AccountTypes"
    OWNER TO surojit;

--
-- Name: AccountTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."AccountTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AccountTypes_id_seq"
    OWNER TO surojit;

--
-- Name: AccountTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."AccountTypes_id_seq" OWNED BY public."AccountTypes".id;


--
-- Name: AccountsConfigs; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."AccountsConfigs"
(
    id                  integer                                                    NOT NULL,
    status              character varying(255) DEFAULT 'active'::character varying NOT NULL,
    created_at          timestamp(6) with time zone                                NOT NULL,
    updated_at          timestamp(6) with time zone                                NOT NULL,
    account_template_id integer                                                    NOT NULL
);


ALTER TABLE public."AccountsConfigs"
    OWNER TO surojit;

--
-- Name: AccountsConfigs_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."AccountsConfigs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AccountsConfigs_id_seq"
    OWNER TO surojit;

--
-- Name: AccountsConfigs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."AccountsConfigs_id_seq" OWNED BY public."AccountsConfigs".id;


--
-- Name: AccountsOfOrganizations; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."AccountsOfOrganizations"
(
    id                  integer                                                                                                     NOT NULL,
    name                character varying(255)                                                                                      NOT NULL,
    code                character varying(255)                                                                                      NOT NULL,
    parent_code         character varying(255),
    depth               smallint,
    created_at          timestamp(6) with time zone                                                                                 NOT NULL,
    updated_at          timestamp(6) with time zone                                                                                 NOT NULL,
    account_parent_id   integer,
    account_group_id    integer                                                                                                     NOT NULL,
    account_type_id     integer,
    account_template_id integer                                                                                                     NOT NULL,
    created_by          integer                                                                                                     NOT NULL,
    organization_id     integer                                                                                                     NOT NULL,
    origin_account_id   integer,
    origin_account_parent_id integer,
    description         character varying(255),
    status              public."enum_AccountsOfOrganizations_status" DEFAULT 'active'::public."enum_AccountsOfOrganizations_status" NOT NULL
);


ALTER TABLE public."AccountsOfOrganizations"
    OWNER TO surojit;

--
-- Name: AccountsOfOrganizations_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."AccountsOfOrganizations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AccountsOfOrganizations_id_seq"
    OWNER TO surojit;

--
-- Name: AccountsOfOrganizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."AccountsOfOrganizations_id_seq" OWNED BY public."AccountsOfOrganizations".id;


--
-- Name: AccountsOfTemplates; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."AccountsOfTemplates"
(
    id                  integer                                                    NOT NULL,
    name                character varying(255)                                     NOT NULL,
    code                character varying(255)                                     NOT NULL,
    parent_code         character varying(255),
    status              character varying(255) DEFAULT 'active'::character varying NOT NULL,
    depth               smallint,
    created_at          timestamp(6) with time zone                                NOT NULL,
    updated_at          timestamp(6) with time zone                                NOT NULL,
    account_parent_id   integer,
    account_group_id    integer                                                    NOT NULL,
    account_type_id     integer                                                    NOT NULL,
    account_template_id integer                                                    NOT NULL,
    created_by          integer                                                    NOT NULL
);


ALTER TABLE public."AccountsOfTemplates"
    OWNER TO surojit;

--
-- Name: AccountsOfTemplates_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."AccountsOfTemplates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AccountsOfTemplates_id_seq"
    OWNER TO surojit;

--
-- Name: AccountsOfTemplates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."AccountsOfTemplates_id_seq" OWNED BY public."AccountsOfTemplates".id;


--
-- Name: Contacts; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."Contacts"
(
    id              integer                                                                       NOT NULL,
    contact_name    public.citext                                                                 NOT NULL,
    contact_type    public."enum_Contacts_contact_type"                                           NOT NULL,
    created_at      timestamp(6) with time zone                                                   NOT NULL,
    updated_at      timestamp(6) with time zone                                                   NOT NULL,
    organization_id integer                                                                       NOT NULL,
    status          public."enum_Contacts_status" DEFAULT 'active'::public."enum_Contacts_status" NOT NULL,
    created_by      integer                                                                       NOT NULL,
    currency_id     integer                                                                       NOT NULL
);


ALTER TABLE public."Contacts"
    OWNER TO surojit;

--
-- Name: Contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."Contacts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Contacts_id_seq"
    OWNER TO surojit;

--
-- Name: Contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."Contacts_id_seq" OWNED BY public."Contacts".id;


--
-- Name: Currency; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."Currency"
(
    id              integer                                                                       NOT NULL,
    currency_name   public.citext,
    currency_symbol character varying(255)                                                        NOT NULL,
    currency_code   character varying(255)                                                        NOT NULL,
    status          public."enum_Currency_status" DEFAULT 'active'::public."enum_Currency_status" NOT NULL,
    created_by      integer                                                                       NOT NULL,
    organization_id integer                                                                       NOT NULL
);


ALTER TABLE public."Currency"
    OWNER TO surojit;

--
-- Name: CurrencyExchangeRate; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."CurrencyExchangeRate"
(
    id              integer                                                                                               NOT NULL,
    effective_date  date                                                                                                  NOT NULL,
    rate            real                                                                                                  NOT NULL,
    status          public."enum_CurrencyExchangeRate_status" DEFAULT 'active'::public."enum_CurrencyExchangeRate_status" NOT NULL,
    currency_id     integer                                                                                               NOT NULL,
    created_by      integer                                                                                               NOT NULL,
    organization_id integer                                                                                               NOT NULL
);


ALTER TABLE public."CurrencyExchangeRate"
    OWNER TO surojit;

--
-- Name: CurrencyExchangeRate_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."CurrencyExchangeRate_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CurrencyExchangeRate_id_seq"
    OWNER TO surojit;

--
-- Name: CurrencyExchangeRate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."CurrencyExchangeRate_id_seq" OWNED BY public."CurrencyExchangeRate".id;


--
-- Name: Currency_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."Currency_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Currency_id_seq"
    OWNER TO surojit;

--
-- Name: Currency_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."Currency_id_seq" OWNED BY public."Currency".id;


--
-- Name: GeneralPreferences; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."GeneralPreferences"
(
    id              integer                                         NOT NULL,
    sales_tax_type  public."enum_GeneralPreferences_sales_tax_type" NOT NULL,
    tax_rounding_type public."enum_GeneralPreferences_tax_rounding_type" NOT NULL,
    discount_type   public."enum_GeneralPreferences_discountType"   NOT NULL,
    is_discount_before_tax boolean,
    created_at      timestamp(6) with time zone                     NOT NULL,
    updated_at      timestamp(6) with time zone                     NOT NULL,
    organization_id integer                                         NOT NULL
);


ALTER TABLE public."GeneralPreferences"
    OWNER TO surojit;

--
-- Name: GeneralPreferences_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."GeneralPreferences_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."GeneralPreferences_id_seq"
    OWNER TO surojit;

--
-- Name: GeneralPreferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."GeneralPreferences_id_seq" OWNED BY public."GeneralPreferences".id;


--
-- Name: InvoiceLineItems; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."InvoiceLineItems"
(
    id                      integer                                                                                       NOT NULL,
    name                    character varying(255)                                                                        NOT NULL,
    description             character varying(255),
    unit                    character varying(255),
    status                  public."enum_InvoiceLineItems_status" DEFAULT 'active'::public."enum_InvoiceLineItems_status" NOT NULL,
    organization_id         integer                                                                                       NOT NULL,
    invoice_id              integer                                                                                       NOT NULL,
    item_id                 integer                                                                                       NOT NULL,
    account_id              integer                                                                                       NOT NULL,
    tax_id                  integer,
    unit_id                 integer,
    rate                    numeric                                                                                       NOT NULL,
    quantity                numeric                                                                                       NOT NULL,
    discount_percentage     numeric                                                                                       NOT NULL,
    discount_amount         numeric                                                                                       NOT NULL,
    tax_percentage          numeric                                                                                       NOT NULL,
    tax_amount              numeric                                                                                       NOT NULL,
    item_total              numeric                                                                                       NOT NULL,
    item_total_tax_included numeric                                                                                       NOT NULL,
    created_at              timestamp(6) with time zone                                                                   NOT NULL,
    updated_at              timestamp(6) with time zone                                                                   NOT NULL
);


ALTER TABLE public."InvoiceLineItems"
    OWNER TO surojit;

--
-- Name: InvoiceLineItems_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."InvoiceLineItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."InvoiceLineItems_id_seq"
    OWNER TO surojit;

--
-- Name: InvoiceLineItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."InvoiceLineItems_id_seq" OWNED BY public."InvoiceLineItems".id;


--
-- Name: InvoicePaymentTerms; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."InvoicePaymentTerms"
(
    id         integer                     NOT NULL,
    name       character varying(255)      NOT NULL,
    origin_payment_term_id integer,
    payment_term integer,
    "interval" public."enum_InvoicePaymentTerms_interval",
    created_at timestamp(6) with time zone NOT NULL,
    updated_at timestamp(6) with time zone NOT NULL
);


ALTER TABLE public."InvoicePaymentTerms"
    OWNER TO surojit;

--
-- Name: InvoicePaymentTerms_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."InvoicePaymentTerms_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."InvoicePaymentTerms_id_seq"
    OWNER TO surojit;

--
-- Name: InvoicePaymentTerms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."InvoicePaymentTerms_id_seq" OWNED BY public."InvoicePaymentTerms".id;


--
-- Name: Invoices; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."Invoices"
(
    id                 integer                                                                       NOT NULL,
    contact_id         integer                                                                       NOT NULL,
    invoice_number     character varying(255)                                                        NOT NULL,
    reference_number character varying(255),
    order_number       character varying(255),
    terms              character varying(255),
    notes              character varying(255),
    is_inclusive_tax   boolean                                                                       NOT NULL,
    status             public."enum_Invoices_status" DEFAULT 'active'::public."enum_Invoices_status" NOT NULL,
    organization_id    integer                                                                       NOT NULL,
    created_by         integer                                                                       NOT NULL,
    discount_total     numeric                                                                       NOT NULL,
    tax_total          numeric                                                                       NOT NULL,
    sub_total          numeric                                                                       NOT NULL,
    total              numeric                                                                       NOT NULL,
    created_at         timestamp(6) with time zone                                                   NOT NULL,
    updated_at         timestamp(6) with time zone                                                   NOT NULL,
    invoice_payment_term_id integer,
    issue_date         date                                                                          NOT NULL,
    due_date           date                                                                          NOT NULL,
    currency_id        integer                                                                       NOT NULL,
    transaction_status public."enum_Invoices_transaction_status"                                     NOT NULL
);


ALTER TABLE public."Invoices"
    OWNER TO surojit;

--
-- Name: Invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."Invoices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Invoices_id_seq"
    OWNER TO surojit;

--
-- Name: Invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."Invoices_id_seq" OWNED BY public."Invoices".id;


--
-- Name: ItemPreferences; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."ItemPreferences"
(
    id                               integer                     NOT NULL,
    quantity_precision               smallint                    NOT NULL,
    is_item_name_duplication_enabled boolean                     NOT NULL,
    created_at                       timestamp(6) with time zone NOT NULL,
    updated_at                       timestamp(6) with time zone NOT NULL,
    organization_id                  integer                     NOT NULL
);


ALTER TABLE public."ItemPreferences"
    OWNER TO surojit;

--
-- Name: ItemPreferences_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."ItemPreferences_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ItemPreferences_id_seq"
    OWNER TO surojit;

--
-- Name: ItemPreferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."ItemPreferences_id_seq" OWNED BY public."ItemPreferences".id;


--
-- Name: ItemUnits; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."ItemUnits"
(
    id              integer                                                                         NOT NULL,
    name            character varying(255),
    unit            character varying(255)                                                          NOT NULL,
    status          public."enum_ItemUnits_status" DEFAULT 'active'::public."enum_ItemUnits_status" NOT NULL,
    created_at      timestamp(6) with time zone                                                     NOT NULL,
    updated_at      timestamp(6) with time zone                                                     NOT NULL,
    created_by      integer                                                                         NOT NULL,
    organization_id integer                                                                         NOT NULL
);


ALTER TABLE public."ItemUnits"
    OWNER TO surojit;

--
-- Name: ItemUnits_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."ItemUnits_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ItemUnits_id_seq"
    OWNER TO surojit;

--
-- Name: ItemUnits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."ItemUnits_id_seq" OWNED BY public."ItemUnits".id;


--
-- Name: OrganizationBasics; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."OrganizationBasics"
(
    id              integer                                                    NOT NULL,
    name            character varying(255)                                     NOT NULL,
    primary_address character varying(255)                                     NOT NULL,
    country_code    character varying(255)                                     NOT NULL,
    sector          character varying(255)                                     NOT NULL,
    status          character varying(255) DEFAULT 'active'::character varying NOT NULL,
    created_at      timestamp(6) with time zone                                NOT NULL,
    updated_at      timestamp(6) with time zone                                NOT NULL,
    created_by      integer                                                    NOT NULL,
    currency_id     integer
);


ALTER TABLE public."OrganizationBasics"
    OWNER TO surojit;

--
-- Name: OrganizationBasics_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."OrganizationBasics_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OrganizationBasics_id_seq"
    OWNER TO surojit;

--
-- Name: OrganizationBasics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."OrganizationBasics_id_seq" OWNED BY public."OrganizationBasics".id;


--
-- Name: OrganizationsUsers; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."OrganizationsUsers"
(
    id              integer                                  NOT NULL,
    job_status      public."enum_OrganizationsUsers_job_status",
    status          public."enum_OrganizationsUsers_status"  NOT NULL,
    role_id         public."enum_OrganizationsUsers_role_id" NOT NULL,
    invited_by      integer,
    invited_on      timestamp with time zone,
    accepted_on     timestamp with time zone,
    is_default_organization boolean,
    created_at      timestamp(6) with time zone              NOT NULL,
    updated_at      timestamp(6) with time zone              NOT NULL,
    user_id         integer                                  NOT NULL,
    organization_id integer                                  NOT NULL
);


ALTER TABLE public."OrganizationsUsers"
    OWNER TO surojit;

--
-- Name: OrganizationsUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."OrganizationsUsers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OrganizationsUsers_id_seq"
    OWNER TO surojit;

--
-- Name: OrganizationsUsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."OrganizationsUsers_id_seq" OWNED BY public."OrganizationsUsers".id;


--
-- Name: PaymentTerms; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."PaymentTerms"
(
    id              integer                                                                               NOT NULL,
    name            character varying(255)                                                                NOT NULL,
    payment_term    integer                                                                               NOT NULL,
    is_default      boolean                                                                               NOT NULL,
    "interval"      public."enum_PaymentTerms_interval"                                                   NOT NULL,
    status          public."enum_PaymentTerms_status" DEFAULT 'active'::public."enum_PaymentTerms_status" NOT NULL,
    created_by      integer                                                                               NOT NULL,
    organization_id integer                                                                               NOT NULL,
    created_at      timestamp(6) with time zone                                                           NOT NULL,
    updated_at      timestamp(6) with time zone                                                           NOT NULL
);


ALTER TABLE public."PaymentTerms"
    OWNER TO surojit;

--
-- Name: PaymentTerms_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."PaymentTerms_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PaymentTerms_id_seq"
    OWNER TO surojit;

--
-- Name: PaymentTerms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."PaymentTerms_id_seq" OWNED BY public."PaymentTerms".id;


--
-- Name: RegularItems; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."RegularItems"
(
    id              integer                                                    NOT NULL,
    name            public.citext                                              NOT NULL,
    product_type    public."enum_RegularItems_product_type"                    NOT NULL,
    selling_price   numeric,
    selling_description character varying(255),
    purchase_price  numeric,
    purchase_description character varying(255),
    item_for        public."enum_RegularItems_item_for"                        NOT NULL,
    status          character varying(255) DEFAULT 'active'::character varying NOT NULL,
    created_at      timestamp(6) with time zone                                NOT NULL,
    updated_at      timestamp(6) with time zone                                NOT NULL,
    created_by      integer                                                    NOT NULL,
    organization_id integer                                                    NOT NULL,
    sales_account_id integer,
    purchase_account_id integer,
    tax_id          integer,
    unit_id         integer
);


ALTER TABLE public."RegularItems"
    OWNER TO surojit;

--
-- Name: RegularItems_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."RegularItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RegularItems_id_seq"
    OWNER TO surojit;

--
-- Name: RegularItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."RegularItems_id_seq" OWNED BY public."RegularItems".id;


--
-- Name: TaxRates; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."TaxRates"
(
    id              integer                                                    NOT NULL,
    name            character varying(255)                                     NOT NULL,
    description     character varying(255),
    rate            numeric                                                    NOT NULL,
    country_code    character varying(255)                                     NOT NULL,
    tax_type        public."enum_TaxRates_tax_type"                            NOT NULL,
    status          character varying(255) DEFAULT 'active'::character varying NOT NULL,
    created_at      timestamp(6) with time zone                                NOT NULL,
    updated_at      timestamp(6) with time zone                                NOT NULL,
    created_by      integer                                                    NOT NULL,
    organization_id integer                                                    NOT NULL,
    is_editable     boolean                                                    NOT NULL,
    is_deletable    boolean                                                    NOT NULL
);


ALTER TABLE public."TaxRates"
    OWNER TO surojit;

--
-- Name: TaxRates_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."TaxRates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TaxRates_id_seq"
    OWNER TO surojit;

--
-- Name: TaxRates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."TaxRates_id_seq" OWNED BY public."TaxRates".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."Users"
(
    id         integer                                                                 NOT NULL,
    name       character varying(255)                                                  NOT NULL,
    email      character varying(255),
    status     public."enum_Users_status" DEFAULT 'active'::public."enum_Users_status" NOT NULL,
    client_id  character varying(255)                                                  NOT NULL,
    created_at timestamp(6) with time zone                                             NOT NULL,
    updated_at timestamp(6) with time zone                                             NOT NULL
);


ALTER TABLE public."Users"
    OWNER TO surojit;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq"
    OWNER TO surojit;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: AccountGroups id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountGroups"
    ALTER COLUMN id SET DEFAULT nextval('public."AccountGroups_id_seq"'::regclass);


--
-- Name: AccountTemplateDetails id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTemplateDetails"
    ALTER COLUMN id SET DEFAULT nextval('public."AccountTemplateDetails_id_seq"'::regclass);


--
-- Name: AccountTypes id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTypes"
    ALTER COLUMN id SET DEFAULT nextval('public."AccountTypes_id_seq"'::regclass);


--
-- Name: AccountsConfigs id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ALTER COLUMN id SET DEFAULT nextval('public."AccountsConfigs_id_seq"'::regclass);


--
-- Name: AccountsOfOrganizations id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ALTER COLUMN id SET DEFAULT nextval('public."AccountsOfOrganizations_id_seq"'::regclass);


--
-- Name: AccountsOfTemplates id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfTemplates"
    ALTER COLUMN id SET DEFAULT nextval('public."AccountsOfTemplates_id_seq"'::regclass);


--
-- Name: Contacts id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ALTER COLUMN id SET DEFAULT nextval('public."Contacts_id_seq"'::regclass);


--
-- Name: Currency id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Currency"
    ALTER COLUMN id SET DEFAULT nextval('public."Currency_id_seq"'::regclass);


--
-- Name: CurrencyExchangeRate id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."CurrencyExchangeRate"
    ALTER COLUMN id SET DEFAULT nextval('public."CurrencyExchangeRate_id_seq"'::regclass);


--
-- Name: GeneralPreferences id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralPreferences"
    ALTER COLUMN id SET DEFAULT nextval('public."GeneralPreferences_id_seq"'::regclass);


--
-- Name: InvoiceLineItems id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ALTER COLUMN id SET DEFAULT nextval('public."InvoiceLineItems_id_seq"'::regclass);


--
-- Name: InvoicePaymentTerms id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoicePaymentTerms"
    ALTER COLUMN id SET DEFAULT nextval('public."InvoicePaymentTerms_id_seq"'::regclass);


--
-- Name: Invoices id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Invoices"
    ALTER COLUMN id SET DEFAULT nextval('public."Invoices_id_seq"'::regclass);


--
-- Name: ItemPreferences id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ItemPreferences"
    ALTER COLUMN id SET DEFAULT nextval('public."ItemPreferences_id_seq"'::regclass);


--
-- Name: ItemUnits id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ItemUnits"
    ALTER COLUMN id SET DEFAULT nextval('public."ItemUnits_id_seq"'::regclass);


--
-- Name: OrganizationBasics id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationBasics"
    ALTER COLUMN id SET DEFAULT nextval('public."OrganizationBasics_id_seq"'::regclass);


--
-- Name: OrganizationsUsers id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationsUsers"
    ALTER COLUMN id SET DEFAULT nextval('public."OrganizationsUsers_id_seq"'::regclass);


--
-- Name: PaymentTerms id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."PaymentTerms"
    ALTER COLUMN id SET DEFAULT nextval('public."PaymentTerms_id_seq"'::regclass);


--
-- Name: RegularItems id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."RegularItems"
    ALTER COLUMN id SET DEFAULT nextval('public."RegularItems_id_seq"'::regclass);


--
-- Name: TaxRates id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."TaxRates"
    ALTER COLUMN id SET DEFAULT nextval('public."TaxRates_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Users"
    ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: AccountGroups; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountGroups" (id, name, code, name_formatted, created_at, updated_at) FROM stdin;
1	asset	1	Asset	2023-09-14 03:47:32.023+05:30	2023-09-14 03:47:46.809+05:30
2	liability	2	Liability	2023-09-14 03:47:36.087+05:30	2023-09-14 03:47:51.103+05:30
3	equity	3	Equity	2023-09-14 03:46:27.712+05:30	2023-09-14 03:47:53.009+05:30
4	income	4	Income	2023-09-14 03:47:39.486+05:30	2023-09-14 03:47:54.62+05:30
5	expense	5	Expense	2023-09-14 03:47:42.126+05:30	2023-09-14 03:47:56.211+05:30
\.


--
-- Data for Name: AccountTemplateDetails; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountTemplateDetails" (id, name, country_code, sector, status, is_default, created_at, updated_at,
                                      origin_template_id, created_by, organization_id) FROM stdin;
1	Template 1	IN	IT	active	t	2023-09-14 00:26:07.831+05:30	2023-09-14 00:26:07.831+05:30	\N	1	1
2	Account template for organization 70	IN	Others	active	\N	2023-09-14 00:26:45.519+05:30	2023-09-14 00:26:45.519+05:30	1	1	2
25	Account template for organization 116	IN	Others	active	f	2023-12-09 09:48:04.145+05:30	2023-12-09 09:48:04.145+05:30	1	1	116
\.


--
-- Data for Name: AccountTypes; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountTypes" (id, name, code, name_formatted, created_at, updated_at, account_group_id) FROM stdin;
1	other_asset	11	Other Asset	2023-09-14 03:52:18.154+05:30	2023-09-14 03:52:20.03+05:30	1
2	other_current_asset	12	Other Current Asset	2023-09-14 03:53:28.917+05:30	2023-09-14 03:53:45.447+05:30	1
3	cash	13	Cash	2023-09-14 03:54:49.501+05:30	2023-09-14 03:54:50.687+05:30	1
4	bank	14	Bank	2023-09-14 03:55:10.773+05:30	2023-09-14 03:55:11.791+05:30	1
5	fixed_asset	15	Fixed Asset	2023-09-14 03:55:42.039+05:30	2023-09-14 03:55:47.037+05:30	1
6	account_receivable	16	Account Receivable	2023-09-14 03:57:26.823+05:30	2023-09-14 03:57:32.251+05:30	1
7	stock	17	Stock	2023-09-14 03:57:59.161+05:30	2023-09-14 03:58:00.734+05:30	1
8	payment_clearing	18	Payment Clearing	2023-09-14 03:58:40.231+05:30	2023-09-14 03:58:41.165+05:30	1
9	input_tax	19	Input Tax	2023-09-14 03:59:32.908+05:30	2023-09-14 03:59:37.487+05:30	1
10	other_current_liability	21	Other Current Liability	2023-09-14 04:00:50.232+05:30	2023-09-14 04:00:51.175+05:30	2
11	credit_card	22	Credit Card	2023-09-14 04:01:18.588+05:30	2023-09-14 04:01:19.437+05:30	2
12	long_term_liability	23	Long Term Liability	2023-09-14 04:02:04.217+05:30	2023-09-14 04:02:05.031+05:30	2
13	other_liability	24	Other Liability	2023-09-14 04:02:36.922+05:30	2023-09-14 04:02:37.924+05:30	2
14	overseas_tax_payable	25	Overseas Tax Payable	2023-09-14 04:34:28.812+05:30	2023-09-14 04:34:29.831+05:30	2
15	output_tax	26	Output Tax	2023-09-14 04:35:09.085+05:30	2023-09-14 04:35:09.819+05:30	2
16	equity	31	Equity	2023-09-14 04:03:25.599+05:30	2023-09-14 04:03:26.326+05:30	3
17	income	41	Income	2023-09-14 04:07:24.623+05:30	2023-09-14 04:07:26.017+05:30	4
18	other_income	42	Other Income	2023-09-14 04:08:15.855+05:30	2023-09-14 04:08:17.749+05:30	4
19	expense	51	Expense	2023-09-14 04:08:42.927+05:30	2023-09-14 04:08:43.831+05:30	5
20	cost_of_goods_sold	52	Cost Of Goods Sold	2023-09-14 04:10:50.515+05:30	2023-09-14 04:10:51.31+05:30	5
21	other_expense	53	Other Expense	2023-09-14 04:33:01.392+05:30	2023-09-14 04:33:02.23+05:30	5
\.


--
-- Data for Name: AccountsConfigs; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountsConfigs" (id, status, created_at, updated_at, account_template_id) FROM stdin;
10	active	2023-08-26 10:23:46.721+05:30	2023-08-26 10:23:46.721+05:30	34
12	active	2023-09-13 23:58:27.797+05:30	2023-09-13 23:58:27.797+05:30	2
14	active	2023-09-14 00:01:40.389+05:30	2023-09-14 00:01:40.389+05:30	1
15	active	2023-09-14 00:04:26.453+05:30	2023-09-14 00:04:26.453+05:30	1
16	active	2023-09-14 00:08:13.858+05:30	2023-09-14 00:08:13.858+05:30	1
17	active	2023-09-14 00:12:30.206+05:30	2023-09-14 00:12:30.206+05:30	1
18	active	2023-09-14 00:17:13.198+05:30	2023-09-14 00:17:13.198+05:30	1
19	active	2023-09-14 00:24:18.485+05:30	2023-09-14 00:24:18.485+05:30	1
20	active	2023-09-14 00:26:07.845+05:30	2023-09-14 00:26:07.845+05:30	1
\.


--
-- Data for Name: AccountsOfOrganizations; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountsOfOrganizations" (id, name, code, parent_code, depth, created_at, updated_at, account_parent_id,
                                       account_group_id, account_type_id, account_template_id, created_by,
                                       organization_id, origin_account_id, origin_account_parent_id, description,
                                       status) FROM stdin;
88	Books	2	\N	0	2023-09-18 23:50:54.553+05:30	2023-09-18 23:50:54.553+05:30	\N	1	1	2	1	2	\N	\N		active
90	Order Of Phinex	23	\N	2	2023-09-19 00:28:24.423+05:30	2023-09-19 00:28:24.423+05:30	89	1	1	2	1	2	\N	\N		active
91	WE	23	\N	1	2023-09-19 23:19:19.782+05:30	2023-09-19 23:19:19.782+05:30	6	1	3	2	1	2	\N	\N		active
93	ME	98	\N	2	2023-09-19 23:53:55.837+05:30	2023-09-19 23:53:55.837+05:30	91	1	3	2	1	2	\N	\N		active
932	Harry Potter	3	\N	3	2023-10-08 21:12:35.083+05:30	2023-10-08 21:12:35.083+05:30	90	1	1	2	1	2	\N	\N		active
1	Employee Advance	111	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	2	1	2	1	\N	\N	active
2	Prepaid Expenses	112	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	2	1	2	2	\N	\N	active
3	TDS Receivable	113	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	2	1	2	3	\N	\N	active
4	Advance Tax	114	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	2	1	2	4	\N	\N	active
5	Undeposited Funds	121	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	2	1	2	5	\N	\N	active
6	Petty Cash	122	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	2	1	2	6	\N	\N	active
7	Furniture and Equipment	141	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	5	2	1	2	7	\N	\N	active
23	Capital Stock	317	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	2	1	2	23	\N	\N	active
24	Dividends Paid	318	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	2	1	2	24	\N	\N	active
27	Sales	413	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	2	1	2	27	\N	\N	active
25	Other Charges	411	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	2	1	2	25	\N	\N	active
26	Shipping Charge	412	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	2	1	2	26	\N	\N	active
28	General Income	414	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	2	1	2	28	\N	\N	active
29	Interest Income	415	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	2	1	2	29	\N	\N	active
30	Late Fee Income	416	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	2	1	2	30	\N	\N	active
31	Discount	417	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	2	1	2	31	\N	\N	active
32	Travel Expense	511	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	32	\N	\N	active
33	Telephone Expense	512	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	33	\N	\N	active
34	Automobile Expense	513	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	34	\N	\N	active
35	IT and Internet Expenses	515	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	35	\N	\N	active
36	Rent Expense	516	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	36	\N	\N	active
37	Janitorial Expense	517	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	37	\N	\N	active
38	Postage	518	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	38	\N	\N	active
39	Bad Debt	519	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	39	\N	\N	active
40	Printing and Stationery	520	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	40	\N	\N	active
41	Salaries and Employee Wages	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	41	\N	\N	active
42	Meals and Entertainment	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	42	\N	\N	active
56	Purchase Discounts	536	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	56	\N	\N	active
57	Bank Fees and Charges	537	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	57	\N	\N	active
58	Credit Card Charges	538	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	58	\N	\N	active
89	Harry Potter	23	\N	1	2023-09-19 00:06:26.477+05:30	2023-09-19 00:06:26.477+05:30	88	1	1	2	1	2	\N	\N		active
94	LOP	78	\N	2	2023-09-19 23:54:34.082+05:30	2023-09-19 23:54:34.082+05:30	92	1	3	2	1	2	\N	\N		active
92	Very Petty Cash	78	\N	1	2023-09-19 23:21:58.752+05:30	2023-09-22 22:36:16.205+05:30	6	1	3	2	1	2	\N	\N		active
8	Inventory Asset	151	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	7	2	1	2	8	\N	\N	active
9	Employee Reimbursements	211	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	2	1	2	9	\N	\N	active
10	Opening Balance Adjustments	212	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	2	1	2	10	\N	\N	active
11	Unearned Revenue	213	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	2	1	2	11	\N	\N	active
12	TDS Payable	214	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	2	1	2	12	\N	\N	active
13	Tax Payable	215	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	2	1	2	13	\N	\N	active
14	Mortgages	231	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	2	1	2	14	\N	\N	active
15	Construction Loans	232	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	2	1	2	15	\N	\N	active
16	Dimension Adjustments	241	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	13	2	1	2	16	\N	\N	active
17	Drawings	311	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	2	1	2	17	\N	\N	active
18	Investments	312	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	2	1	2	18	\N	\N	active
19	Distributions	313	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	2	1	2	19	\N	\N	active
20	Retained Earnings	314	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	2	1	2	20	\N	\N	active
21	Owner's Equity	315	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	2	1	2	21	\N	\N	active
22	Opening Balance Offset	316	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	2	1	2	22	\N	\N	active
43	Depreciation Expense	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	43	\N	\N	active
44	Consultant Expense	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	44	\N	\N	active
45	Repairs and Maintenance	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	45	\N	\N	active
46	Other Expenses	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	46	\N	\N	active
47	Lodging	527	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	47	\N	\N	active
48	Uncategorized	528	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	48	\N	\N	active
49	Raw Materials And Consumables	529	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	49	\N	\N	active
50	Merchandise	530	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	50	\N	\N	active
51	Transportation Expense	531	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	51	\N	\N	active
52	Depreciation And Amortisation	532	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	52	\N	\N	active
53	Contract Assets	533	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	53	\N	\N	active
54	Office Supplies	534	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	54	\N	\N	active
55	Advertising And Marketing	535	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	2	1	2	55	\N	\N	active
1317	Cost of Goods Sold	521	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	20	25	1	116	59	\N	\N	active
1318	Labor	522	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	20	25	1	116	60	\N	\N	active
1319	Materials	523	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	20	25	1	116	61	\N	\N	active
59	Cost of Goods Sold	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	59	\N	\N	active
60	Labor	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	60	\N	\N	active
61	Materials	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	61	\N	\N	active
62	Subcontractor	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	62	\N	\N	active
63	Job Costing	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	63	\N	\N	active
64	Exchange Gain or Loss	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	21	2	1	2	64	\N	\N	active
1320	Subcontractor	524	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	20	25	1	116	62	\N	\N	active
1321	Job Costing	525	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	20	25	1	116	63	\N	\N	active
1322	Exchange Gain or Loss	526	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	21	25	1	116	64	\N	\N	active
1323	Employee Advance	111	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	1	2	25	1	116	1	\N	\N	active
1324	Prepaid Expenses	112	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	1	2	25	1	116	2	\N	\N	active
1325	TDS Receivable	113	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	1	2	25	1	116	3	\N	\N	active
1326	Advance Tax	114	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	1	2	25	1	116	4	\N	\N	active
1327	Undeposited Funds	121	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	1	3	25	1	116	5	\N	\N	active
1328	Petty Cash	122	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	1	3	25	1	116	6	\N	\N	active
1329	Furniture and Equipment	141	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	1	5	25	1	116	7	\N	\N	active
1330	Inventory Asset	151	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	1	7	25	1	116	8	\N	\N	active
1331	Employee Reimbursements	211	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	2	10	25	1	116	9	\N	\N	active
1332	Opening Balance Adjustments	212	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	2	10	25	1	116	10	\N	\N	active
1333	Unearned Revenue	213	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	2	10	25	1	116	11	\N	\N	active
1334	TDS Payable	214	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	2	10	25	1	116	12	\N	\N	active
1335	Tax Payable	215	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	2	10	25	1	116	13	\N	\N	active
1336	Mortgages	231	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	2	12	25	1	116	14	\N	\N	active
1337	Meals and Entertainment	522	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	42	\N	\N	active
1338	Depreciation Expense	523	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	43	\N	\N	active
1339	Consultant Expense	524	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	44	\N	\N	active
1340	Repairs and Maintenance	525	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	45	\N	\N	active
1341	Other Expenses	526	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	46	\N	\N	active
1342	Lodging	527	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	47	\N	\N	active
1343	Uncategorized	528	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	48	\N	\N	active
1344	Raw Materials And Consumables	529	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	49	\N	\N	active
1345	Merchandise	530	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	50	\N	\N	active
1346	Transportation Expense	531	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	51	\N	\N	active
1347	Depreciation And Amortisation	532	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	52	\N	\N	active
1348	Construction Loans	232	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	2	12	25	1	116	15	\N	\N	active
1349	Dimension Adjustments	241	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	2	13	25	1	116	16	\N	\N	active
1350	Drawings	311	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	3	16	25	1	116	17	\N	\N	active
1351	Investments	312	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	3	16	25	1	116	18	\N	\N	active
1352	Distributions	313	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	3	16	25	1	116	19	\N	\N	active
1353	Retained Earnings	314	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	3	16	25	1	116	20	\N	\N	active
1354	Owner's Equity	315	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	3	16	25	1	116	21	\N	\N	active
1355	Opening Balance Offset	316	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	3	16	25	1	116	22	\N	\N	active
1356	Capital Stock	317	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	3	16	25	1	116	23	\N	\N	active
1357	Dividends Paid	318	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	3	16	25	1	116	24	\N	\N	active
1358	Other Charges	411	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	4	17	25	1	116	25	\N	\N	active
1359	Shipping Charge	412	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	4	17	25	1	116	26	\N	\N	active
1360	Sales	413	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	4	17	25	1	116	27	\N	\N	active
1361	General Income	414	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	4	17	25	1	116	28	\N	\N	active
1362	Interest Income	415	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	4	17	25	1	116	29	\N	\N	active
1363	Late Fee Income	416	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	4	17	25	1	116	30	\N	\N	active
1364	Discount	417	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	4	17	25	1	116	31	\N	\N	active
1365	Contract Assets	533	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	53	\N	\N	active
1366	Office Supplies	534	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	54	\N	\N	active
1367	Advertising And Marketing	535	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	55	\N	\N	active
1368	Purchase Discounts	536	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	56	\N	\N	active
1369	Bank Fees and Charges	537	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	57	\N	\N	active
1370	Credit Card Charges	538	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	58	\N	\N	active
1371	Travel Expense	511	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	32	\N	\N	active
1372	Telephone Expense	512	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	33	\N	\N	active
1373	Automobile Expense	513	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	34	\N	\N	active
1374	IT and Internet Expenses	515	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	35	\N	\N	active
1375	Rent Expense	516	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	36	\N	\N	active
1376	Janitorial Expense	517	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	37	\N	\N	active
1377	Postage	518	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	38	\N	\N	active
1378	Bad Debt	519	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	39	\N	\N	active
1379	Printing and Stationery	520	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	40	\N	\N	active
1380	Salaries and Employee Wages	521	\N	0	2023-12-09 09:48:04.15+05:30	2023-12-09 09:48:04.15+05:30	\N	5	19	25	1	116	41	\N	\N	active
479	NIP	1	\N	1	2023-09-23 21:31:55.462+05:30	2023-09-23 21:31:55.462+05:30	32	5	19	2	1	2	\N	\N		active
480	Renewed Materials	12	\N	1	2023-09-25 22:27:12.141+05:30	2023-09-25 22:27:12.141+05:30	61	5	20	2	1	2	\N	\N		active
482	ME2	98	\N	2	2023-09-30 17:36:16.945+05:30	2023-09-30 17:36:28.957+05:30	91	1	3	2	1	2	\N	\N		deleted
481	Top Class	121	\N	2	2023-09-25 23:09:35.95+05:30	2023-09-25 23:09:35.95+05:30	480	5	20	2	1	2	\N	\N		active
\.


--
-- Data for Name: AccountsOfTemplates; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountsOfTemplates" (id, name, code, parent_code, status, depth, created_at, updated_at,
                                   account_parent_id, account_group_id, account_type_id, account_template_id,
                                   created_by) FROM stdin;
59	Cost of Goods Sold	521	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	1	1
60	Labor	522	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	1	1
61	Materials	523	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	1	1
62	Subcontractor	524	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	1	1
63	Job Costing	525	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	1	1
64	Exchange Gain or Loss	526	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	21	1	1
1	Employee Advance	111	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	1	1
2	Prepaid Expenses	112	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	1	1
3	TDS Receivable	113	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	1	1
4	Advance Tax	114	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	1	1
5	Undeposited Funds	121	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	1	1
6	Petty Cash	122	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	1	1
7	Furniture and Equipment	141	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	5	1	1
8	Inventory Asset	151	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	7	1	1
9	Employee Reimbursements	211	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	1	1
10	Opening Balance Adjustments	212	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	1	1
11	Unearned Revenue	213	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	1	1
12	TDS Payable	214	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	1	1
13	Tax Payable	215	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	1	1
14	Mortgages	231	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	1	1
42	Meals and Entertainment	522	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
43	Depreciation Expense	523	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
44	Consultant Expense	524	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
45	Repairs and Maintenance	525	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
46	Other Expenses	526	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
47	Lodging	527	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
48	Uncategorized	528	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
49	Raw Materials And Consumables	529	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
50	Merchandise	530	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
51	Transportation Expense	531	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
52	Depreciation And Amortisation	532	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
15	Construction Loans	232	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	1	1
16	Dimension Adjustments	241	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	13	1	1
17	Drawings	311	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	1	1
18	Investments	312	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	1	1
19	Distributions	313	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	1	1
20	Retained Earnings	314	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	1	1
21	Owner's Equity	315	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	1	1
22	Opening Balance Offset	316	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	1	1
23	Capital Stock	317	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	1	1
24	Dividends Paid	318	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	1	1
25	Other Charges	411	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	1	1
26	Shipping Charge	412	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	1	1
27	Sales	413	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	1	1
28	General Income	414	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	1	1
29	Interest Income	415	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	1	1
30	Late Fee Income	416	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	1	1
31	Discount	417	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	1	1
53	Contract Assets	533	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
54	Office Supplies	534	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
55	Advertising And Marketing	535	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
56	Purchase Discounts	536	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
57	Bank Fees and Charges	537	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
58	Credit Card Charges	538	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
32	Travel Expense	511	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
33	Telephone Expense	512	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
34	Automobile Expense	513	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
35	IT and Internet Expenses	515	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
36	Rent Expense	516	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
37	Janitorial Expense	517	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
38	Postage	518	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
39	Bad Debt	519	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
40	Printing and Stationery	520	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
41	Salaries and Employee Wages	521	\N	active	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	1	1
\.


--
-- Data for Name: Contacts; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Contacts" (id, contact_name, contact_type, created_at, updated_at, organization_id, status, created_by,
                        currency_id) FROM stdin;
2	Tamal	customer	2023-10-04 22:01:44.603+05:30	2023-10-04 22:01:45.43+05:30	2	active	1	18
1	Sayan	customer	2023-10-04 22:01:18.252+05:30	2023-10-04 22:01:20.512+05:30	2	active	1	11
\.


--
-- Data for Name: Currency; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Currency" (id, currency_name, currency_symbol, currency_code, status, created_by,
                        organization_id) FROM stdin;
11	Japanese Yen	¥	JPY	active	1	2
5	Swiss Franc	CHF	CHF	active	1	2
15	Russian Ruble	₽	RUB	active	1	2
18	Singapore Dollar	S$	SGD	active	1	2
16	Saudi Riyal	﷼	SAR	active	1	2
9	Hong Kong Dollar	HK$	HKD	active	1	2
20	United States Dollar	$	USD	active	1	2
21	South African Rand	R	ZAR	active	1	2
19	Turkish Lira	₺	TRY	active	1	2
17	Swedish Krona	kr	SEK	active	1	2
6	Chinese Yuan	¥	CNY	active	1	2
4	Canadian Dollar	CA$	CAD	active	1	2
8	British Pound Sterling	£	GBP	active	1	2
1	United Arab Emirates Dirham	د.إ	AED	active	1	2
3	Brazilian Real	R$	BRL	active	1	2
10	Indian Rupee	₹	INR	active	1	2
14	New Zealand Dollar	NZ$	NZD	active	1	2
13	Norwegian Krone	kr	NOK	active	1	2
12	Mexican Peso	Mex$	MXN	active	1	2
2	Australian Dollar	A$	AUD	active	1	2
7	Euro	€	EUR	active	1	2
85	United Arab Emirates Dirham	د.إ	AED	active	1	116
86	Australian Dollar	A$	AUD	active	1	116
87	Brazilian Real	R$	BRL	active	1	116
88	Canadian Dollar	CA$	CAD	active	1	116
89	Swiss Franc	CHF	CHF	active	1	116
90	Chinese Yuan	¥	CNY	active	1	116
91	Euro	€	EUR	active	1	116
92	British Pound Sterling	£	GBP	active	1	116
93	Hong Kong Dollar	HK$	HKD	active	1	116
94	Indian Rupee	₹	INR	active	1	116
95	Japanese Yen	¥	JPY	active	1	116
96	Mexican Peso	Mex$	MXN	active	1	116
97	Norwegian Krone	kr	NOK	active	1	116
98	New Zealand Dollar	NZ$	NZD	active	1	116
99	Russian Ruble	₽	RUB	active	1	116
100	Saudi Riyal	﷼	SAR	active	1	116
101	Swedish Krona	kr	SEK	active	1	116
102	Singapore Dollar	S$	SGD	active	1	116
103	Turkish Lira	₺	TRY	active	1	116
104	United States Dollar	$	USD	active	1	116
105	South African Rand	R	ZAR	active	1	116
\.


--
-- Data for Name: CurrencyExchangeRate; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."CurrencyExchangeRate" (id, effective_date, rate, status, currency_id, created_by,
                                    organization_id) FROM stdin;
\.


--
-- Data for Name: GeneralPreferences; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."GeneralPreferences" (id, sales_tax_type, tax_rounding_type, discount_type, is_discount_before_tax,
                                  created_at, updated_at, organization_id) FROM stdin;
1	entity_level	item_level	no_discount	t	2023-10-04 16:15:06.189+05:30	2023-10-04 16:15:06.189+05:30	2
10	entity_level	item_level	no_discount	t	2023-12-09 09:48:04.188+05:30	2023-12-09 09:48:04.188+05:30	116
\.


--
-- Data for Name: InvoiceLineItems; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."InvoiceLineItems" (id, name, description, unit, status, organization_id, invoice_id, item_id, account_id,
                                tax_id, unit_id, rate, quantity, discount_percentage, discount_amount, tax_percentage,
                                tax_amount, item_total, item_total_tax_included, created_at, updated_at) FROM stdin;
148	Apron		TML	active	2	123	13	27	1	4	112	1	0	0	10	11.2	112	123.2	2023-12-09 20:36:32.345+05:30	2023-12-09 20:36:32.345+05:30
\.


--
-- Data for Name: InvoicePaymentTerms; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."InvoicePaymentTerms" (id, name, origin_payment_term_id, payment_term, "interval", created_at,
                                   updated_at) FROM stdin;
-1	CUSTOM	-1	\N	\N	2023-12-02 23:57:43.491+05:30	2023-12-02 23:57:52.677+05:30
100	End of Month	6	0	end_of_month	2023-12-09 20:01:25.825+05:30	2023-12-09 20:01:25.825+05:30
105	End of Month	6	0	end_of_month	2023-12-09 20:07:03.726+05:30	2023-12-09 20:07:03.726+05:30
106	End of Month	6	0	end_of_month	2023-12-09 20:23:17.234+05:30	2023-12-09 20:23:17.234+05:30
107	End of Month	6	0	end_of_month	2023-12-09 20:36:32.331+05:30	2023-12-09 20:36:32.331+05:30
\.


--
-- Data for Name: Invoices; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Invoices" (id, contact_id, invoice_number, reference_number, order_number, terms, notes, is_inclusive_tax,
                        status, organization_id, created_by, discount_total, tax_total, sub_total, total, created_at,
                        updated_at, invoice_payment_term_id, issue_date, due_date, currency_id,
                        transaction_status) FROM stdin;
123	1	1				KKK	f	active	2	1	0	11.2	112	123.2	2023-12-09 20:01:25.842+05:30	2023-12-09 20:36:32.356+05:30	107	2023-12-09	2023-12-31	11	draft
\.


--
-- Data for Name: ItemPreferences; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."ItemPreferences" (id, quantity_precision, is_item_name_duplication_enabled, created_at, updated_at,
                               organization_id) FROM stdin;
1	2	t	2023-09-20 23:48:47.292+05:30	2023-09-20 23:48:47.292+05:30	2
18	2	t	2023-12-09 09:48:04.186+05:30	2023-12-09 09:48:04.186+05:30	116
\.


--
-- Data for Name: ItemUnits; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."ItemUnits" (id, name, unit, status, created_at, updated_at, created_by, organization_id) FROM stdin;
1	Kilogram	kg	active	2023-10-06 04:34:22.772+05:30	2023-10-06 04:34:23.492+05:30	1	2
2	\N	Units	active	2023-10-05 23:05:56.056+05:30	2023-10-05 23:05:56.056+05:30	1	2
3	\N	Dozon	active	2023-10-05 23:31:34.028+05:30	2023-10-05 23:31:34.028+05:30	1	2
4	\N	TML	active	2023-10-08 12:33:02.352+05:30	2023-10-08 12:33:02.352+05:30	1	2
77	BOX	box	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
78	Centimeter	cm	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
79	Meter	m	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
80	Feet	ft	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
81	Gram	g	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
82	Kilogram	kg	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
83	Other	oth	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
84	Pieces	pcs	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
85	Dozen	dz	active	2023-12-09 09:48:04.193+05:30	2023-12-09 09:48:04.193+05:30	1	116
\.


--
-- Data for Name: OrganizationBasics; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."OrganizationBasics" (id, name, primary_address, country_code, sector, status, created_at, updated_at,
                                  created_by, currency_id) FROM stdin;
2	DEN	Kolkata, India	IN	Others	active	2023-09-14 00:26:45.497+05:30	2023-09-14 00:26:45.497+05:30	1	11
1	Reducer	Goa, India	IN	Others	active	2023-08-26 00:09:34.016+05:30	2023-08-26 00:09:34.016+05:30	1	\N
116	MNNN	Kolkata, India	IN	Others	active	2023-12-09 09:48:04.125+05:30	2023-12-09 09:48:04.203+05:30	1	94
\.


--
-- Data for Name: OrganizationsUsers; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."OrganizationsUsers" (id, job_status, status, role_id, invited_by, invited_on, accepted_on,
                                  is_default_organization, created_at, updated_at, user_id, organization_id) FROM stdin;
109	working	active	admin	\N	\N	\N	f	2023-12-09 09:43:01.772+05:30	2023-12-09 09:43:01.772+05:30	1	115
110	working	active	admin	\N	\N	\N	f	2023-12-09 09:48:04.135+05:30	2023-12-09 09:48:04.135+05:30	1	116
1	working	active	admin	\N	\N	\N	\N	2023-08-26 00:09:34.021+05:30	2023-08-26 00:09:34.021+05:30	1	1
65	working	active	admin	\N	\N	\N	t	2023-08-26 14:21:45.113+05:30	2023-08-26 14:21:45.113+05:30	1	2
\.


--
-- Data for Name: PaymentTerms; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."PaymentTerms" (id, name, payment_term, is_default, "interval", status, created_by, organization_id,
                            created_at, updated_at) FROM stdin;
41	Net 15	15	f	regular	active	1	116	2023-12-09 09:48:04.197+05:30	2023-12-09 09:48:04.197+05:30
42	Net 30	30	f	regular	active	1	116	2023-12-09 09:48:04.197+05:30	2023-12-09 09:48:04.197+05:30
43	Net 45	45	f	regular	active	1	116	2023-12-09 09:48:04.197+05:30	2023-12-09 09:48:04.197+05:30
5	Net 60	60	f	regular	active	1	2	2023-10-23 21:03:30.605+05:30	2023-10-23 21:03:30.605+05:30
4	Net 45	45	f	regular	active	1	2	2023-10-23 21:03:30.605+05:30	2023-10-23 21:03:30.605+05:30
7	End of Next Month	1	f	end_of_month	active	1	2	2023-10-23 21:03:30.605+05:30	2023-10-23 21:03:30.605+05:30
3	Net 30	30	f	regular	active	1	2	2023-10-23 21:03:30.605+05:30	2023-10-23 21:03:30.605+05:30
44	Net 60	60	f	regular	active	1	116	2023-12-09 09:48:04.197+05:30	2023-12-09 09:48:04.197+05:30
45	End of Month	0	f	end_of_month	active	1	116	2023-12-09 09:48:04.197+05:30	2023-12-09 09:48:04.197+05:30
8	Due on Receipt	0	f	end_of_day	active	1	2	2023-10-23 21:03:30.605+05:30	2023-10-23 21:53:41.419+05:30
46	End of Next Month	1	f	end_of_month	active	1	116	2023-12-09 09:48:04.197+05:30	2023-12-09 09:48:04.197+05:30
47	Due on Receipt	0	t	end_of_day	active	1	116	2023-12-09 09:48:04.197+05:30	2023-12-09 09:48:04.197+05:30
2	NET 15	15	f	regular	active	1	2	2023-10-23 21:03:30.605+05:30	2023-10-23 21:03:30.605+05:30
6	End of Month	0	t	end_of_month	active	1	2	2023-10-23 21:03:30.605+05:30	2023-10-23 21:03:30.605+05:30
12	NET 365	365	f	regular	active	1	2	2023-10-23 21:53:53.163+05:30	2023-10-23 22:00:01.868+05:30
\.


--
-- Data for Name: RegularItems; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."RegularItems" (id, name, product_type, selling_price, selling_description, purchase_price,
                            purchase_description, item_for, status, created_at, updated_at, created_by, organization_id,
                            sales_account_id, purchase_account_id, tax_id, unit_id) FROM stdin;
1	Paper Boat	goods	500		0		sales	active	2023-10-05 22:15:05.359+05:30	2023-10-05 23:24:20.668+05:30	1	2	25	\N	2	1
6	Gumshoo	goods	123		0		sales	active	2023-10-08 12:24:49.114+05:30	2023-10-08 12:33:02.359+05:30	1	2	26	\N	1	4
3	Dark Chocolate Bar	goods	562	A chocolate bar	0		sales	active	2023-10-06 23:37:05.578+05:30	2023-11-21 08:08:50.654+05:30	1	2	25	\N	1	3
2	Dark Chocolate Coffie	goods	990.5	Coffie	0		sales	active	2023-10-05 23:05:56.064+05:30	2023-11-21 08:09:09.794+05:30	1	2	27	\N	1	3
7	Pen (1 Dz)	goods	234.7		0		sales	active	2023-11-21 08:10:04.092+05:30	2023-11-21 08:10:04.092+05:30	1	2	27	\N	1	2
8	Open Shell	goods	23.9		0		sales	active	2023-11-21 08:10:51.381+05:30	2023-11-21 08:10:51.381+05:30	1	2	27	\N	1	3
9	Coffe	goods	600		0		sales	active	2023-11-21 08:11:56.785+05:30	2023-11-21 08:11:56.785+05:30	1	2	27	\N	1	3
10	Chair	goods	9.67		0		sales	active	2023-11-21 08:13:05.848+05:30	2023-11-21 08:13:05.848+05:30	1	2	27	\N	2	2
11	Milk curtain	goods	56.9		0		sales	active	2023-11-21 08:14:14.059+05:30	2023-11-21 08:14:14.059+05:30	1	2	28	\N	1	1
12	Yeast powder	goods	12.54	Yeast power in a pack of 200 grams.	0		sales	active	2023-11-21 08:15:20.36+05:30	2023-11-21 08:15:20.36+05:30	1	2	27	\N	1	1
14	WER	goods	78		0		sales	active	2023-11-25 23:58:40.712+05:30	2023-11-25 23:58:40.712+05:30	1	2	25	\N	1	1
4	Ball	goods	678		900		sales_and_purchase	active	2023-10-06 23:38:52.887+05:30	2023-12-01 22:31:41.952+05:30	1	2	28	481	2	1
13	Apron	goods	100		0		sales	active	2023-11-23 08:15:31.648+05:30	2023-12-01 22:31:54.062+05:30	1	2	27	\N	9	4
\.


--
-- Data for Name: TaxRates; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."TaxRates" (id, name, description, rate, country_code, tax_type, status, created_at, updated_at, created_by,
                        organization_id, is_editable, is_deletable) FROM stdin;
2	GST28	GST Of 28%	28	IN	direct_tax	active	2023-09-22 03:36:52.723+05:30	2023-09-22 03:36:54.745+05:30	1	2	f	f
9	GST15	GST Of 15%	15	IN	direct_tax	active	2023-09-23 13:55:12.818+05:30	2023-09-23 13:55:12.818+05:30	1	2	f	f
1	GST10	GST Of 10%	10	IN	direct_tax	active	2023-09-21 22:31:54.226+05:30	2023-09-21 22:31:54.226+05:30	1	2	f	f
43	GST28	GST Of 28%	28	IN	direct_tax	active	2023-12-09 09:48:04.195+05:30	2023-12-09 09:48:04.195+05:30	1	116	f	f
44	GST18	GST Of 18%	18	IN	direct_tax	active	2023-12-09 09:48:04.195+05:30	2023-12-09 09:48:04.195+05:30	1	116	f	f
45	GST12	GST Of 12%	12	IN	direct_tax	active	2023-12-09 09:48:04.195+05:30	2023-12-09 09:48:04.195+05:30	1	116	f	f
46	GST05	GST Of 5%	5	IN	direct_tax	active	2023-12-09 09:48:04.195+05:30	2023-12-09 09:48:04.195+05:30	1	116	f	f
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Users" (id, name, email, status, client_id, created_at, updated_at) FROM stdin;
1	Rita  Paul	man	active	4887d860-78cb-4c07-9ae2-261c822ce825	2023-08-26 00:09:29.84+05:30	2023-08-26 00:09:29.84+05:30
\.


--
-- Name: AccountGroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountGroups_id_seq"', 7, true);


--
-- Name: AccountTemplateDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountTemplateDetails_id_seq"', 25, true);


--
-- Name: AccountTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountTypes_id_seq"', 27, true);


--
-- Name: AccountsConfigs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountsConfigs_id_seq"', 20, true);


--
-- Name: AccountsOfOrganizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountsOfOrganizations_id_seq"', 1380, true);


--
-- Name: AccountsOfTemplates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountsOfTemplates_id_seq"', 64, true);


--
-- Name: Contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Contacts_id_seq"', 2, true);


--
-- Name: CurrencyExchangeRate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."CurrencyExchangeRate_id_seq"', 1, false);


--
-- Name: Currency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Currency_id_seq"', 105, true);


--
-- Name: GeneralPreferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."GeneralPreferences_id_seq"', 10, true);


--
-- Name: InvoiceLineItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."InvoiceLineItems_id_seq"', 148, true);


--
-- Name: InvoicePaymentTerms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."InvoicePaymentTerms_id_seq"', 107, true);


--
-- Name: Invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Invoices_id_seq"', 123, true);


--
-- Name: ItemPreferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."ItemPreferences_id_seq"', 18, true);


--
-- Name: ItemUnits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."ItemUnits_id_seq"', 85, true);


--
-- Name: OrganizationBasics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."OrganizationBasics_id_seq"', 116, true);


--
-- Name: OrganizationsUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."OrganizationsUsers_id_seq"', 110, true);


--
-- Name: PaymentTerms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."PaymentTerms_id_seq"', 47, true);


--
-- Name: RegularItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."RegularItems_id_seq"', 14, true);


--
-- Name: TaxRates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."TaxRates_id_seq"', 46, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);


--
-- Name: AccountGroups AccountGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountGroups"
    ADD CONSTRAINT "AccountGroups_pkey" PRIMARY KEY (id);


--
-- Name: AccountTemplateDetails AccountTemplateDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTemplateDetails"
    ADD CONSTRAINT "AccountTemplateDetails_pkey" PRIMARY KEY (id);


--
-- Name: AccountTypes AccountTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTypes"
    ADD CONSTRAINT "AccountTypes_pkey" PRIMARY KEY (id);


--
-- Name: AccountsConfigs AccountsConfigs_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_pkey" PRIMARY KEY (id);


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_pkey" PRIMARY KEY (id);


--
-- Name: AccountsOfTemplates AccountsOfTemplates_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfTemplates"
    ADD CONSTRAINT "AccountsOfTemplates_pkey" PRIMARY KEY (id);


--
-- Name: Contacts Contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY (id);


--
-- Name: CurrencyExchangeRate CurrencyExchangeRate_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."CurrencyExchangeRate"
    ADD CONSTRAINT "CurrencyExchangeRate_pkey" PRIMARY KEY (id);


--
-- Name: Currency Currency_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Currency"
    ADD CONSTRAINT "Currency_pkey" PRIMARY KEY (id);


--
-- Name: GeneralPreferences GeneralPreferences_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralPreferences"
    ADD CONSTRAINT "GeneralPreferences_pkey" PRIMARY KEY (id);


--
-- Name: InvoiceLineItems InvoiceLineItems_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ADD CONSTRAINT "InvoiceLineItems_pkey" PRIMARY KEY (id);


--
-- Name: InvoicePaymentTerms InvoicePaymentTerms_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoicePaymentTerms"
    ADD CONSTRAINT "InvoicePaymentTerms_pkey" PRIMARY KEY (id);


--
-- Name: Invoices Invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_pkey" PRIMARY KEY (id);


--
-- Name: ItemPreferences ItemPreferences_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ItemPreferences"
    ADD CONSTRAINT "ItemPreferences_pkey" PRIMARY KEY (id);


--
-- Name: ItemUnits ItemUnits_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ItemUnits"
    ADD CONSTRAINT "ItemUnits_pkey" PRIMARY KEY (id);


--
-- Name: OrganizationBasics OrganizationBasics_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationBasics"
    ADD CONSTRAINT "OrganizationBasics_pkey" PRIMARY KEY (id);


--
-- Name: OrganizationsUsers OrganizationsUsers_organizationId_userId_unique; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationsUsers"
    ADD CONSTRAINT "OrganizationsUsers_organizationId_userId_unique" UNIQUE (user_id, organization_id);


--
-- Name: OrganizationsUsers OrganizationsUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationsUsers"
    ADD CONSTRAINT "OrganizationsUsers_pkey" PRIMARY KEY (id);


--
-- Name: PaymentTerms PaymentTerms_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."PaymentTerms"
    ADD CONSTRAINT "PaymentTerms_pkey" PRIMARY KEY (id);


--
-- Name: RegularItems RegularItems_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."RegularItems"
    ADD CONSTRAINT "RegularItems_pkey" PRIMARY KEY (id);


--
-- Name: TaxRates TaxRates_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."TaxRates"
    ADD CONSTRAINT "TaxRates_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: ItemUnits item_units_organization_id_unit_unique; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ItemUnits"
    ADD CONSTRAINT item_units_organization_id_unit_unique UNIQUE (organization_id, unit);


--
-- Name: Invoices organization_invoice_number_unique; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT organization_invoice_number_unique UNIQUE (organization_id, invoice_number);


--
-- Name: OrganizationsUsers organizations_users_user_id_organization_id_is_default_organiza; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationsUsers"
    ADD CONSTRAINT organizations_users_user_id_organization_id_is_default_organiza UNIQUE (user_id, organization_id, is_default_organization);


--
-- Name: TaxRates tax_rates_organization_id_rate_unique; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."TaxRates"
    ADD CONSTRAINT tax_rates_organization_id_rate_unique UNIQUE (organization_id, rate);


--
-- Name: Users users_client_id_unique; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT users_client_id_unique UNIQUE (client_id);


--
-- Name: account_groups_name_unique; Type: INDEX; Schema: public; Owner: surojit
--

CREATE UNIQUE INDEX account_groups_name_unique ON public."AccountGroups" USING btree (name);


--
-- Name: account_types_name_unique; Type: INDEX; Schema: public; Owner: surojit
--

CREATE UNIQUE INDEX account_types_name_unique ON public."AccountTypes" USING btree (name);


--
-- Name: AccountTemplateDetails AccountTemplateDetails_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTemplateDetails"
    ADD CONSTRAINT "AccountTemplateDetails_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountTemplateDetails AccountTemplateDetails_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTemplateDetails"
    ADD CONSTRAINT "AccountTemplateDetails_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountTemplateDetails AccountTemplateDetails_origin_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTemplateDetails"
    ADD CONSTRAINT "AccountTemplateDetails_origin_template_id_fkey" FOREIGN KEY (origin_template_id) REFERENCES public."AccountTemplateDetails" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: AccountTypes AccountTypes_account_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTypes"
    ADD CONSTRAINT "AccountTypes_account_group_id_fkey" FOREIGN KEY (account_group_id) REFERENCES public."AccountGroups" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_account_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_account_group_id_fkey" FOREIGN KEY (account_group_id) REFERENCES public."AccountGroups" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_account_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_account_parent_id_fkey" FOREIGN KEY (account_parent_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_account_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_account_template_id_fkey" FOREIGN KEY (account_template_id) REFERENCES public."AccountTemplateDetails" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_account_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_account_type_id_fkey" FOREIGN KEY (account_type_id) REFERENCES public."AccountTypes" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_origin_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_origin_account_id_fkey" FOREIGN KEY (origin_account_id) REFERENCES public."AccountsOfTemplates" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: AccountsOfOrganizations AccountsOfOrganizations_origin_account_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfOrganizations"
    ADD CONSTRAINT "AccountsOfOrganizations_origin_account_parent_id_fkey" FOREIGN KEY (origin_account_parent_id) REFERENCES public."AccountsOfTemplates" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: AccountsOfTemplates AccountsOfTemplates_account_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfTemplates"
    ADD CONSTRAINT "AccountsOfTemplates_account_group_id_fkey" FOREIGN KEY (account_group_id) REFERENCES public."AccountGroups" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsOfTemplates AccountsOfTemplates_account_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfTemplates"
    ADD CONSTRAINT "AccountsOfTemplates_account_parent_id_fkey" FOREIGN KEY (account_parent_id) REFERENCES public."AccountsOfTemplates" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: AccountsOfTemplates AccountsOfTemplates_account_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfTemplates"
    ADD CONSTRAINT "AccountsOfTemplates_account_template_id_fkey" FOREIGN KEY (account_template_id) REFERENCES public."AccountTemplateDetails" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsOfTemplates AccountsOfTemplates_account_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfTemplates"
    ADD CONSTRAINT "AccountsOfTemplates_account_type_id_fkey" FOREIGN KEY (account_type_id) REFERENCES public."AccountTypes" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsOfTemplates AccountsOfTemplates_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsOfTemplates"
    ADD CONSTRAINT "AccountsOfTemplates_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Contacts Contacts_currency_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_currency_id_fk" FOREIGN KEY (currency_id) REFERENCES public."Currency" (id);


--
-- Name: Contacts Contacts_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Contacts Contacts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_user_id_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CurrencyExchangeRate CurrencyExchangeRate_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."CurrencyExchangeRate"
    ADD CONSTRAINT "CurrencyExchangeRate_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CurrencyExchangeRate CurrencyExchangeRate_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."CurrencyExchangeRate"
    ADD CONSTRAINT "CurrencyExchangeRate_currency_id_fkey" FOREIGN KEY (currency_id) REFERENCES public."Currency" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CurrencyExchangeRate CurrencyExchangeRate_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."CurrencyExchangeRate"
    ADD CONSTRAINT "CurrencyExchangeRate_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Currency Currency_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Currency"
    ADD CONSTRAINT "Currency_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Currency Currency_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Currency"
    ADD CONSTRAINT "Currency_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GeneralPreferences GeneralPreferences_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralPreferences"
    ADD CONSTRAINT "GeneralPreferences_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceLineItems InvoiceLineItems_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ADD CONSTRAINT "InvoiceLineItems_account_id_fkey" FOREIGN KEY (account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceLineItems InvoiceLineItems_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ADD CONSTRAINT "InvoiceLineItems_invoice_id_fkey" FOREIGN KEY (invoice_id) REFERENCES public."Invoices" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceLineItems InvoiceLineItems_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ADD CONSTRAINT "InvoiceLineItems_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."RegularItems" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceLineItems InvoiceLineItems_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ADD CONSTRAINT "InvoiceLineItems_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceLineItems InvoiceLineItems_tax_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ADD CONSTRAINT "InvoiceLineItems_tax_id_fkey" FOREIGN KEY (tax_id) REFERENCES public."TaxRates" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceLineItems InvoiceLineItems_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ADD CONSTRAINT "InvoiceLineItems_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES public."ItemUnits" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoices Invoices_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_contact_id_fkey" FOREIGN KEY (contact_id) REFERENCES public."Contacts" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Invoices Invoices_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Invoices Invoices_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_currency_id_fkey" FOREIGN KEY (currency_id) REFERENCES public."Currency" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Invoices Invoices_invoice_payment_term_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_invoice_payment_term_id_fkey" FOREIGN KEY (invoice_payment_term_id) REFERENCES public."InvoicePaymentTerms" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoices Invoices_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemPreferences ItemPreferences_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ItemPreferences"
    ADD CONSTRAINT "ItemPreferences_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemUnits ItemUnits_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ItemUnits"
    ADD CONSTRAINT "ItemUnits_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemUnits ItemUnits_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ItemUnits"
    ADD CONSTRAINT "ItemUnits_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrganizationBasics OrganizationBasics_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationBasics"
    ADD CONSTRAINT "OrganizationBasics_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrganizationBasics OrganizationBasics_currenct_fk; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationBasics"
    ADD CONSTRAINT "OrganizationBasics_currenct_fk" FOREIGN KEY (currency_id) REFERENCES public."Currency" (id);


--
-- Name: CONSTRAINT "OrganizationBasics_currenct_fk" ON "OrganizationBasics"; Type: COMMENT; Schema: public; Owner: surojit
--

COMMENT ON CONSTRAINT "OrganizationBasics_currenct_fk" ON public."OrganizationBasics" IS 'organization currency id';


--
-- Name: PaymentTerms PaymentTerms_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."PaymentTerms"
    ADD CONSTRAINT "PaymentTerms_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PaymentTerms PaymentTerms_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."PaymentTerms"
    ADD CONSTRAINT "PaymentTerms_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RegularItems RegularItems_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."RegularItems"
    ADD CONSTRAINT "RegularItems_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RegularItems RegularItems_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."RegularItems"
    ADD CONSTRAINT "RegularItems_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RegularItems RegularItems_purchase_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."RegularItems"
    ADD CONSTRAINT "RegularItems_purchase_account_id_fkey" FOREIGN KEY (purchase_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: RegularItems RegularItems_sales_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."RegularItems"
    ADD CONSTRAINT "RegularItems_sales_account_id_fkey" FOREIGN KEY (sales_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: RegularItems RegularItems_tax_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."RegularItems"
    ADD CONSTRAINT "RegularItems_tax_id_fkey" FOREIGN KEY (tax_id) REFERENCES public."TaxRates" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TaxRates TaxRates_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."TaxRates"
    ADD CONSTRAINT "TaxRates_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

