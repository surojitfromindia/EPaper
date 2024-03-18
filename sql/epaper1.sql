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
-- Name: enum_AccountsConfigs_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AccountsConfigs_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_AccountsConfigs_status" OWNER TO surojit;

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
-- Name: enum_AccountsOfTemplates_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AccountsOfTemplates_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_AccountsOfTemplates_status" OWNER TO surojit;

--
-- Name: enum_AutoNumberGroups_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AutoNumberGroups_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_AutoNumberGroups_status" OWNER TO surojit;

--
-- Name: enum_AutoNumbers_entityType; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AutoNumbers_entityType" AS ENUM (
    'invoice',
    'credit_note',
    'customer_payment'
    );


ALTER TYPE public."enum_AutoNumbers_entityType" OWNER TO surojit;

--
-- Name: enum_AutoNumbers_entity_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_AutoNumbers_entity_type" AS ENUM (
    'invoice',
    'credit_note',
    'customer_payment'
    );


ALTER TYPE public."enum_AutoNumbers_entity_type" OWNER TO surojit;

--
-- Name: enum_ContactBalances_contact_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_ContactBalances_contact_type" AS ENUM (
    'customer',
    'vendor'
    );


ALTER TYPE public."enum_ContactBalances_contact_type" OWNER TO surojit;

--
-- Name: enum_ContactPersons_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_ContactPersons_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_ContactPersons_status" OWNER TO surojit;

--
-- Name: enum_Contacts_contact_sub_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Contacts_contact_sub_type" AS ENUM (
    'business',
    'individual'
    );


ALTER TYPE public."enum_Contacts_contact_sub_type" OWNER TO surojit;

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
-- Name: enum_GeneralPreferences_discount_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_GeneralPreferences_discount_type" AS ENUM (
    'item_level',
    'entity_level',
    'no_discount'
    );


ALTER TYPE public."enum_GeneralPreferences_discount_type" OWNER TO surojit;

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
-- Name: enum_InvoiceJournals_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_InvoiceJournals_status" AS ENUM (
    'active',
    'deleted'
    );


ALTER TYPE public."enum_InvoiceJournals_status" OWNER TO surojit;

--
-- Name: enum_InvoiceJournals_sync_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_InvoiceJournals_sync_status" AS ENUM (
    'synced',
    'notSynced'
    );


ALTER TYPE public."enum_InvoiceJournals_sync_status" OWNER TO surojit;

--
-- Name: enum_InvoiceLineItems_product_type; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_InvoiceLineItems_product_type" AS ENUM (
    'service',
    'goods'
    );


ALTER TYPE public."enum_InvoiceLineItems_product_type" OWNER TO surojit;

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
-- Name: enum_Invoices_sync_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Invoices_sync_status" AS ENUM (
    'synced',
    'notSynced'
    );


ALTER TYPE public."enum_Invoices_sync_status" OWNER TO surojit;

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
    id                 integer                                                                                                   NOT NULL,
    name               character varying(255)                                                                                    NOT NULL,
    country_code       character varying(255)                                                                                    NOT NULL,
    sector             character varying(255),
    status             public."enum_AccountTemplateDetails_status" DEFAULT 'active'::public."enum_AccountTemplateDetails_status" NOT NULL,
    is_default         boolean,
    created_at         timestamp(6) with time zone                                                                               NOT NULL,
    updated_at         timestamp(6) with time zone                                                                               NOT NULL,
    origin_template_id integer,
    created_by         integer                                                                                                   NOT NULL,
    organization_id    integer                                                                                                   NOT NULL
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
    id                                             integer                                                                                     NOT NULL,
    status                                         public."enum_AccountsConfigs_status" DEFAULT 'active'::public."enum_AccountsConfigs_status" NOT NULL,
    account_template_id                            integer                                                                                     NOT NULL,
    default_tax_account_id                         integer                                                                                     NOT NULL,
    default_sales_account_id                       integer                                                                                     NOT NULL,
    default_purchase_account_id                    integer                                                                                     NOT NULL,
    default_discount_account_id                    integer                                                                                     NOT NULL,
    default_purchase_discount_account_id           integer                                                                                     NOT NULL,
    default_exchange_gain_loss_account_id          integer                                                                                     NOT NULL,
    default_unearned_revenue_account_id            integer                                                                                     NOT NULL,
    default_accounts_receivable_account_id         integer                                                                                     NOT NULL,
    default_accounts_payable_account_id            integer                                                                                     NOT NULL,
    default_inventory_account_id                   integer                                                                                     NOT NULL,
    default_cost_of_goods_sold_account_id          integer                                                                                     NOT NULL,
    default_bank_account_id                        integer                                                                                     NOT NULL,
    default_bad_debt_account_id                    integer                                                                                     NOT NULL,
    default_opening_balance_offset_account_id      integer                                                                                     NOT NULL,
    default_retained_earnings_account_id           integer                                                                                     NOT NULL,
    default_opening_balance_adjustments_account_id integer                                                                                     NOT NULL,
    created_at                                     timestamp(6) with time zone                                                                 NOT NULL,
    updated_at                                     timestamp(6) with time zone                                                                 NOT NULL,
    organization_id                                integer
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
    id                       integer                                                                                                     NOT NULL,
    name                     character varying(255)                                                                                      NOT NULL,
    account_slug             character varying(255),
    is_system_account        boolean,
    code                     character varying(255)                                                                                      NOT NULL,
    description              character varying(255),
    depth                    integer                                                                                                     NOT NULL,
    status                   public."enum_AccountsOfOrganizations_status" DEFAULT 'active'::public."enum_AccountsOfOrganizations_status" NOT NULL,
    organization_id          integer                                                                                                     NOT NULL,
    account_parent_id        integer,
    origin_account_id        integer,
    origin_account_parent_id integer,
    account_group_id         integer                                                                                                     NOT NULL,
    account_type_id          integer                                                                                                     NOT NULL,
    created_by               integer                                                                                                     NOT NULL,
    account_template_id      integer                                                                                                     NOT NULL,
    created_at               timestamp(6) with time zone                                                                                 NOT NULL,
    updated_at               timestamp(6) with time zone                                                                                 NOT NULL
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
    created_by          integer                                                    NOT NULL,
    account_slug        character varying(255),
    is_system_account   boolean
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
-- Name: AutoNumberGroups; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."AutoNumberGroups"
(
    id              integer                                                                                       NOT NULL,
    name            character varying(255)                                                                        NOT NULL,
    is_default      boolean                                                                                       NOT NULL,
    is_active       boolean                                                                                       NOT NULL,
    organization_id integer                                                                                       NOT NULL,
    created_by      integer                                                                                       NOT NULL,
    status          public."enum_AutoNumberGroups_status" DEFAULT 'active'::public."enum_AutoNumberGroups_status" NOT NULL
);


ALTER TABLE public."AutoNumberGroups"
    OWNER TO surojit;

--
-- Name: AutoNumberGroups_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."AutoNumberGroups_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AutoNumberGroups_id_seq"
    OWNER TO surojit;

--
-- Name: AutoNumberGroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."AutoNumberGroups_id_seq" OWNED BY public."AutoNumberGroups".id;


--
-- Name: AutoNumbers; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."AutoNumbers"
(
    id                   integer                               NOT NULL,
    entity_type          public."enum_AutoNumbers_entity_type" NOT NULL,
    prefix_string        character varying(255)                NOT NULL,
    next_number          character varying(255)                NOT NULL,
    auto_number_group_id integer                               NOT NULL,
    number_zero_pad      integer                               NOT NULL,
    organization_id      integer                               NOT NULL,
    created_by           integer                               NOT NULL
);


ALTER TABLE public."AutoNumbers"
    OWNER TO surojit;

--
-- Name: AutoNumbers_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."AutoNumbers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AutoNumbers_id_seq"
    OWNER TO surojit;

--
-- Name: AutoNumbers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."AutoNumbers_id_seq" OWNED BY public."AutoNumbers".id;


--
-- Name: ContactBalances; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."ContactBalances"
(
    id                                        integer                                    NOT NULL,
    contact_type                              public."enum_ContactBalances_contact_type" NOT NULL,
    contact_id                                integer                                    NOT NULL,
    currency_id                               integer                                    NOT NULL,
    unused_credits_receivable_amount          numeric                                    NOT NULL,
    bcy_unused_credits_receivable_amount      numeric                                    NOT NULL,
    unused_credits_payable_amount             numeric                                    NOT NULL,
    bcy_unused_credits_payable_amount         numeric                                    NOT NULL,
    outstanding_credits_receivable_amount     numeric                                    NOT NULL,
    bcy_outstanding_credits_receivable_amount numeric                                    NOT NULL,
    outstanding_credits_payable_amount        numeric                                    NOT NULL,
    bcy_outstanding_credits_payable_amount    numeric                                    NOT NULL,
    is_default                                boolean                                    NOT NULL,
    organization_id                           integer                                    NOT NULL,
    created_by                                integer                                    NOT NULL
);


ALTER TABLE public."ContactBalances"
    OWNER TO surojit;

--
-- Name: ContactBalances_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."ContactBalances_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ContactBalances_id_seq"
    OWNER TO surojit;

--
-- Name: ContactBalances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."ContactBalances_id_seq" OWNED BY public."ContactBalances".id;


--
-- Name: ContactPersons; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."ContactPersons"
(
    id              integer                                                                                   NOT NULL,
    salutation      text,
    first_name      public.citext,
    last_name       public.citext,
    email           public.citext,
    phone           text,
    mobile          text,
    designation     character varying(255),
    organization_id integer                                                                                   NOT NULL,
    created_by      integer                                                                                   NOT NULL,
    contact_id      integer                                                                                   NOT NULL,
    status          public."enum_ContactPersons_status" DEFAULT 'active'::public."enum_ContactPersons_status" NOT NULL,
    is_primary      boolean                             DEFAULT false                                         NOT NULL
);


ALTER TABLE public."ContactPersons"
    OWNER TO surojit;

--
-- Name: ContactPersons_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."ContactPersons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ContactPersons_id_seq"
    OWNER TO surojit;

--
-- Name: ContactPersons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."ContactPersons_id_seq" OWNED BY public."ContactPersons".id;


--
-- Name: Contacts; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."Contacts"
(
    id               integer                                                                       NOT NULL,
    contact_name     public.citext,
    contact_type     public."enum_Contacts_contact_type"                                           NOT NULL,
    organization_id  integer                                                                       NOT NULL,
    status           public."enum_Contacts_status" DEFAULT 'active'::public."enum_Contacts_status" NOT NULL,
    created_by       integer                                                                       NOT NULL,
    currency_id      integer                                                                       NOT NULL,
    company_name     public.citext,
    contact_sub_type public."enum_Contacts_contact_sub_type",
    payment_term_id  integer,
    remarks          character varying(255)
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
-- Name: FeaturesPreferences; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."FeaturesPreferences"
(
    id                                    integer                     NOT NULL,
    is_multiple_auto_number_series_enable boolean DEFAULT false       NOT NULL,
    is_multiple_branches_enable           boolean DEFAULT false       NOT NULL,
    is_multiple_branches_active           boolean DEFAULT false       NOT NULL,
    organization_id                       integer                     NOT NULL,
    created_at                            timestamp(6) with time zone NOT NULL,
    updated_at                            timestamp(6) with time zone NOT NULL
);


ALTER TABLE public."FeaturesPreferences"
    OWNER TO surojit;

--
-- Name: FeaturesPreferences_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."FeaturesPreferences_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FeaturesPreferences_id_seq"
    OWNER TO surojit;

--
-- Name: FeaturesPreferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."FeaturesPreferences_id_seq" OWNED BY public."FeaturesPreferences".id;


--
-- Name: GeneralPreferences; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."GeneralPreferences"
(
    id                     integer                                            NOT NULL,
    sales_tax_type         public."enum_GeneralPreferences_sales_tax_type"    NOT NULL,
    tax_rounding_type      public."enum_GeneralPreferences_tax_rounding_type" NOT NULL,
    discount_type          public."enum_GeneralPreferences_discountType"      NOT NULL,
    is_discount_before_tax boolean,
    created_at             timestamp(6) with time zone                        NOT NULL,
    updated_at             timestamp(6) with time zone                        NOT NULL,
    organization_id        integer                                            NOT NULL
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
-- Name: InvoiceJournals; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."InvoiceJournals"
(
    id              integer                              NOT NULL,
    contact_id      integer                              NOT NULL,
    invoice_id      integer                              NOT NULL,
    line_item_id    integer                              NOT NULL,
    account_slug    character varying(255)               NOT NULL,
    account_id      integer                              NOT NULL,
    bcy_debit       numeric(10, 2)                       NOT NULL,
    bcy_credit      numeric(10, 2)                       NOT NULL,
    debit           numeric(10, 2)                       NOT NULL,
    credit          numeric(10, 2)                       NOT NULL,
    organization_id integer                              NOT NULL,
    status          public."enum_InvoiceJournals_status" NOT NULL,
    sync_status     public."enum_InvoiceJournals_sync_status" DEFAULT 'synced'::public."enum_InvoiceJournals_sync_status",
    created_at      timestamp(6) with time zone          NOT NULL,
    updated_at      timestamp(6) with time zone          NOT NULL
);


ALTER TABLE public."InvoiceJournals"
    OWNER TO surojit;

--
-- Name: InvoiceJournals_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."InvoiceJournals_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."InvoiceJournals_id_seq"
    OWNER TO surojit;

--
-- Name: InvoiceJournals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."InvoiceJournals_id_seq" OWNED BY public."InvoiceJournals".id;


--
-- Name: InvoiceLineItems; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."InvoiceLineItems"
(
    id                          integer                                                                                       NOT NULL,
    name                        character varying(255)                                                                        NOT NULL,
    description                 character varying(255),
    unit                        character varying(255),
    status                      public."enum_InvoiceLineItems_status" DEFAULT 'active'::public."enum_InvoiceLineItems_status" NOT NULL,
    organization_id             integer                                                                                       NOT NULL,
    invoice_id                  integer                                                                                       NOT NULL,
    item_id                     integer                                                                                       NOT NULL,
    account_id                  integer                                                                                       NOT NULL,
    tax_id                      integer,
    unit_id                     integer,
    rate                        numeric                                                                                       NOT NULL,
    quantity                    numeric                                                                                       NOT NULL,
    discount_percentage         numeric                                                                                       NOT NULL,
    discount_amount             numeric                                                                                       NOT NULL,
    tax_percentage              numeric                                                                                       NOT NULL,
    tax_amount                  numeric                                                                                       NOT NULL,
    item_total                  numeric                                                                                       NOT NULL,
    item_total_tax_included     numeric                                                                                       NOT NULL,
    created_at                  timestamp(6) with time zone                                                                   NOT NULL,
    updated_at                  timestamp(6) with time zone                                                                   NOT NULL,
    bcy_rate                    numeric                                                                                       NOT NULL,
    bcy_discount_amount         numeric                                                                                       NOT NULL,
    bcy_tax_amount              numeric                                                                                       NOT NULL,
    bcy_item_total              numeric                                                                                       NOT NULL,
    bcy_item_total_tax_included numeric                                                                                       NOT NULL,
    product_type                public."enum_InvoiceLineItems_product_type"                                                   NOT NULL
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
    id                     integer                     NOT NULL,
    name                   character varying(255)      NOT NULL,
    origin_payment_term_id integer,
    payment_term           integer,
    "interval"             public."enum_InvoicePaymentTerms_interval",
    created_at             timestamp(6) with time zone NOT NULL,
    updated_at             timestamp(6) with time zone NOT NULL
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
-- Name: InvoicePreferences; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."InvoicePreferences"
(
    id                     integer                     NOT NULL,
    is_auto_number_enabled boolean DEFAULT true        NOT NULL,
    organization_id        integer                     NOT NULL,
    created_at             timestamp(6) with time zone NOT NULL,
    updated_at             timestamp(6) with time zone NOT NULL
);


ALTER TABLE public."InvoicePreferences"
    OWNER TO surojit;

--
-- Name: InvoicePreferences_id_seq; Type: SEQUENCE; Schema: public; Owner: surojit
--

CREATE SEQUENCE public."InvoicePreferences_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."InvoicePreferences_id_seq"
    OWNER TO surojit;

--
-- Name: InvoicePreferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: surojit
--

ALTER SEQUENCE public."InvoicePreferences_id_seq" OWNED BY public."InvoicePreferences".id;


--
-- Name: Invoices; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."Invoices"
(
    id                      integer                                                                                 NOT NULL,
    contact_id              integer                                                                                 NOT NULL,
    invoice_number          character varying(255)                                                                  NOT NULL,
    reference_number        character varying(255),
    order_number            character varying(255),
    terms                   character varying(255),
    notes                   character varying(255),
    is_inclusive_tax        boolean                                                                                 NOT NULL,
    status                  public."enum_Invoices_status"      DEFAULT 'active'::public."enum_Invoices_status"      NOT NULL,
    organization_id         integer                                                                                 NOT NULL,
    created_by              integer                                                                                 NOT NULL,
    discount_total          numeric                                                                                 NOT NULL,
    tax_total               numeric                                                                                 NOT NULL,
    sub_total               numeric                                                                                 NOT NULL,
    total                   numeric                                                                                 NOT NULL,
    created_at              timestamp(6) with time zone                                                             NOT NULL,
    updated_at              timestamp(6) with time zone                                                             NOT NULL,
    invoice_payment_term_id integer,
    issue_date              date                                                                                    NOT NULL,
    due_date                date                                                                                    NOT NULL,
    currency_id             integer                                                                                 NOT NULL,
    transaction_status      public."enum_Invoices_transaction_status"                                               NOT NULL,
    bcy_discount_total      numeric                                                                                 NOT NULL,
    bcy_tax_total           numeric                                                                                 NOT NULL,
    bcy_sub_total           numeric                                                                                 NOT NULL,
    bcy_total               numeric                                                                                 NOT NULL,
    sync_status             public."enum_Invoices_sync_status" DEFAULT 'synced'::public."enum_Invoices_sync_status" NOT NULL,
    exchange_rate           numeric(10, 6)                     DEFAULT 1                                            NOT NULL
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
    id                      integer                                  NOT NULL,
    job_status              public."enum_OrganizationsUsers_job_status",
    status                  public."enum_OrganizationsUsers_status"  NOT NULL,
    role_id                 public."enum_OrganizationsUsers_role_id" NOT NULL,
    invited_by              integer,
    invited_on              timestamp with time zone,
    accepted_on             timestamp with time zone,
    is_default_organization boolean,
    created_at              timestamp(6) with time zone              NOT NULL,
    updated_at              timestamp(6) with time zone              NOT NULL,
    user_id                 integer                                  NOT NULL,
    organization_id         integer                                  NOT NULL
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
    id                   integer                                                    NOT NULL,
    name                 public.citext                                              NOT NULL,
    product_type         public."enum_RegularItems_product_type"                    NOT NULL,
    selling_price        numeric,
    selling_description  character varying(255),
    purchase_price       numeric,
    purchase_description character varying(255),
    item_for             public."enum_RegularItems_item_for"                        NOT NULL,
    status               character varying(255) DEFAULT 'active'::character varying NOT NULL,
    created_at           timestamp(6) with time zone                                NOT NULL,
    updated_at           timestamp(6) with time zone                                NOT NULL,
    created_by           integer                                                    NOT NULL,
    organization_id      integer                                                    NOT NULL,
    sales_account_id     integer,
    purchase_account_id  integer,
    tax_id               integer,
    unit_id              integer
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
    id        integer                                                                 NOT NULL,
    name      character varying(255)                                                  NOT NULL,
    email     character varying(255),
    status    public."enum_Users_status" DEFAULT 'active'::public."enum_Users_status" NOT NULL,
    client_id character varying(255)                                                  NOT NULL
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
-- Name: AutoNumberGroups id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumberGroups"
    ALTER COLUMN id SET DEFAULT nextval('public."AutoNumberGroups_id_seq"'::regclass);


--
-- Name: AutoNumbers id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumbers"
    ALTER COLUMN id SET DEFAULT nextval('public."AutoNumbers_id_seq"'::regclass);


--
-- Name: ContactBalances id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactBalances"
    ALTER COLUMN id SET DEFAULT nextval('public."ContactBalances_id_seq"'::regclass);


--
-- Name: ContactPersons id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactPersons"
    ALTER COLUMN id SET DEFAULT nextval('public."ContactPersons_id_seq"'::regclass);


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
-- Name: FeaturesPreferences id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."FeaturesPreferences"
    ALTER COLUMN id SET DEFAULT nextval('public."FeaturesPreferences_id_seq"'::regclass);


--
-- Name: GeneralPreferences id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralPreferences"
    ALTER COLUMN id SET DEFAULT nextval('public."GeneralPreferences_id_seq"'::regclass);


--
-- Name: InvoiceJournals id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceJournals"
    ALTER COLUMN id SET DEFAULT nextval('public."InvoiceJournals_id_seq"'::regclass);


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
-- Name: InvoicePreferences id; Type: DEFAULT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoicePreferences"
    ALTER COLUMN id SET DEFAULT nextval('public."InvoicePreferences_id_seq"'::regclass);


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
88	Template 1	IN	IT	active	t	2024-02-06 08:49:36.483+05:30	2024-02-06 08:49:36.483+05:30	\N	1	1
90	Account template for organization 172	IN	Others	active	f	2024-02-06 08:50:48.982+05:30	2024-02-06 08:50:48.982+05:30	88	1	172
\.


--
-- Data for Name: AccountTypes; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountTypes" (id, name, code, name_formatted, created_at, updated_at, account_group_id) FROM stdin;
6	accounts_receivable	16	Accounts Receivable	2023-09-14 03:57:26.823+05:30	2023-09-14 03:57:32.251+05:30	1
28	accounts_payable	26	Accounts Payable	2024-02-04 05:49:21.574+05:30	2024-02-04 05:49:24.702+05:30	2
1	other_asset	11	Other Asset	2023-09-14 03:52:18.154+05:30	2023-09-14 03:52:20.03+05:30	1
2	other_current_asset	12	Other Current Asset	2023-09-14 03:53:28.917+05:30	2023-09-14 03:53:45.447+05:30	1
3	cash	13	Cash	2023-09-14 03:54:49.501+05:30	2023-09-14 03:54:50.687+05:30	1
4	bank	14	Bank	2023-09-14 03:55:10.773+05:30	2023-09-14 03:55:11.791+05:30	1
5	fixed_asset	15	Fixed Asset	2023-09-14 03:55:42.039+05:30	2023-09-14 03:55:47.037+05:30	1
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

COPY public."AccountsConfigs" (id, status, account_template_id, default_tax_account_id, default_sales_account_id,
                               default_purchase_account_id, default_discount_account_id,
                               default_purchase_discount_account_id, default_exchange_gain_loss_account_id,
                               default_unearned_revenue_account_id, default_accounts_receivable_account_id,
                               default_accounts_payable_account_id, default_inventory_account_id,
                               default_cost_of_goods_sold_account_id, default_bank_account_id,
                               default_bad_debt_account_id, default_opening_balance_offset_account_id,
                               default_retained_earnings_account_id, default_opening_balance_adjustments_account_id,
                               created_at, updated_at, organization_id) FROM stdin;
2	active	90	625	641	672	645	678	677	623	620	630	618	672	616	653	636	634	622	2024-02-06 08:50:49.029+05:30	2024-02-06 08:50:49.029+05:30	172
\.


--
-- Data for Name: AccountsOfOrganizations; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountsOfOrganizations" (id, name, account_slug, is_system_account, code, description, depth, status,
                                       organization_id, account_parent_id, origin_account_id, origin_account_parent_id,
                                       account_group_id, account_type_id, created_by, account_template_id, created_at,
                                       updated_at) FROM stdin;
1024	Office Kolkata Equipments	\N	\N	23311		1	active	172	617	\N	\N	1	5	1	90	2024-03-16 14:20:06.952+05:30	2024-03-16 14:20:06.952+05:30
1026	SD	\N	\N	56		1	active	172	639	\N	\N	4	17	1	90	2024-03-16 14:50:54.173+05:30	2024-03-16 14:50:54.173+05:30
610	Mortgages	\N	\N	231	\N	0	active	172	\N	218	\N	2	12	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
611	Employee Advance	\N	\N	111	\N	0	active	172	\N	202	\N	1	2	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
612	Prepaid Expenses	prepaid_expenses	t	112	\N	0	active	172	\N	203	\N	1	2	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
613	TDS Receivable	tds_receivable	t	113	\N	0	active	172	\N	204	\N	1	2	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
614	Advance Tax	advance_tax	t	114	\N	0	active	172	\N	205	\N	1	2	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
615	Undeposited Funds	udeposited_funds	t	121	\N	0	active	172	\N	206	\N	1	3	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
616	Petty Cash	petty_cash	t	122	\N	0	active	172	\N	207	\N	1	3	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
617	Furniture and Equipment	\N	\N	141	\N	0	active	172	\N	208	\N	1	5	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
618	Inventory Asset	inventory_asset	t	151	\N	0	active	172	\N	209	\N	1	7	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
619	Input Tax	input_tax	t	161	\N	0	active	172	\N	210	\N	1	9	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
620	Accounts Receivable	accounts_receivable	t	171	\N	0	active	172	\N	211	\N	1	6	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
621	Employee Reimbursements	employee_reimbursements	t	211	\N	0	active	172	\N	212	\N	2	10	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
622	Opening Balance Adjustments	opening_balance_adjustments	t	212	\N	0	active	172	\N	213	\N	2	10	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
623	Unearned Revenue	unearned_revenue	t	213	\N	0	active	172	\N	214	\N	2	10	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
624	TDS Payable	tds_payable	t	214	\N	0	active	172	\N	215	\N	2	10	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
625	Tax Payable	tax_payable	t	215	\N	0	active	172	\N	216	\N	2	10	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
626	Inter Branch Account	inter_branch_account	t	216	\N	0	active	172	\N	217	\N	2	10	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
627	Construction Loans	\N	\N	232	\N	0	active	172	\N	219	\N	2	12	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
628	Dimension Adjustments	dismension_adjustments	t	241	\N	0	active	172	\N	220	\N	2	13	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
629	Output Tax	output_tax	t	251	\N	0	active	172	\N	221	\N	2	15	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
630	Accounts Payable	accounts_payable	t	261	\N	0	active	172	\N	222	\N	2	28	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
631	Drawings	drawings	\N	311	\N	0	active	172	\N	223	\N	3	16	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
632	Investments	invesments	\N	312	\N	0	active	172	\N	224	\N	3	16	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
633	Distributions	distributions	\N	313	\N	0	active	172	\N	225	\N	3	16	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
634	Retained Earnings	retained_earnings	t	314	\N	0	active	172	\N	226	\N	3	16	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
635	Owner's Equity	owners_equity	\N	315	\N	0	active	172	\N	227	\N	3	16	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
636	Opening Balance Offset	opening_balance_offset	t	316	\N	0	active	172	\N	228	\N	3	16	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
637	Capital Stock	capital_stock	\N	317	\N	0	active	172	\N	229	\N	3	16	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
638	Dividends Paid	dividends_paid	\N	318	\N	0	active	172	\N	230	\N	3	16	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
639	Other Charges	other_charges	\N	411	\N	0	active	172	\N	231	\N	4	17	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
640	Shipping Charge	shipping_charges	\N	412	\N	0	active	172	\N	232	\N	4	17	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
641	Sales	sales	t	413	\N	0	active	172	\N	233	\N	4	17	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
642	General Income	general_income	t	414	\N	0	active	172	\N	234	\N	4	17	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
643	Interest Income	interest_income	\N	415	\N	0	active	172	\N	235	\N	4	17	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
644	Late Fee Income	late_fee_income	\N	416	\N	0	active	172	\N	236	\N	4	17	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
645	Discount	discount	t	417	\N	0	active	172	\N	237	\N	4	17	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
646	Travel Expense	travel_expense	\N	511	\N	0	active	172	\N	238	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
647	Telephone Expense	telephone_expense	\N	512	\N	0	active	172	\N	239	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
648	Automobile Expense	automobile_expense	\N	513	\N	0	active	172	\N	240	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
649	IT and Internet Expenses	it_and_internet_expenses	\N	515	\N	0	active	172	\N	241	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
650	Rent Expense	rent_expense	\N	516	\N	0	active	172	\N	242	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
651	Janitorial Expense	janitorial_expense	\N	517	\N	0	active	172	\N	243	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
652	Postage	postage	\N	518	\N	0	active	172	\N	244	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
653	Bad Debt	bad_debit	t	519	\N	0	active	172	\N	245	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
654	Printing and Stationery	\N	\N	520	\N	0	active	172	\N	246	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
655	Salaries and Employee Wages	\N	\N	521	\N	0	active	172	\N	247	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
656	Meals and Entertainment	\N	\N	522	\N	0	active	172	\N	248	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
657	Depreciation Expense	\N	\N	523	\N	0	active	172	\N	249	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
658	Consultant Expense	\N	\N	524	\N	0	active	172	\N	250	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
659	Repairs and Maintenance	\N	\N	525	\N	0	active	172	\N	251	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
660	Other Expenses	other_expenses	\N	526	\N	0	active	172	\N	252	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
661	Lodging	\N	\N	527	\N	0	active	172	\N	253	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
662	Uncategorized	uncateogorized	t	528	\N	0	active	172	\N	254	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
663	Raw Materials And Consumables	\N	\N	529	\N	0	active	172	\N	255	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
664	Merchandise	\N	\N	530	\N	0	active	172	\N	256	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
665	Transportation Expense	\N	\N	531	\N	0	active	172	\N	257	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
666	Depreciation And Amortisation	\N	\N	532	\N	0	active	172	\N	258	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
667	Contract Assets	\N	\N	533	\N	0	active	172	\N	259	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
668	Office Supplies	\N	\N	534	\N	0	active	172	\N	260	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
669	Advertising And Marketing	\N	\N	535	\N	0	active	172	\N	261	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
670	Bank Fees and Charges	bank_fees_and_charges	t	537	\N	0	active	172	\N	263	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
671	Credit Card Charges	credit_card_charges	t	538	\N	0	active	172	\N	264	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
672	Cost of Goods Sold	cost_of_goods_sold	t	521	\N	0	active	172	\N	265	\N	5	20	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
673	Labor	\N	\N	522	\N	0	active	172	\N	266	\N	5	20	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
674	Materials	materials	\N	523	\N	0	active	172	\N	267	\N	5	20	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
675	Subcontractor	\N	\N	524	\N	0	active	172	\N	268	\N	5	20	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
676	Job Costing	\N	\N	525	\N	0	active	172	\N	269	\N	5	20	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
677	Exchange Gain or Loss	exchange_gain_or_loss	t	526	\N	0	active	172	\N	270	\N	5	21	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
678	Purchase Discounts	purchase_discount	t	536	\N	0	active	172	\N	262	\N	5	19	1	90	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30
\.


--
-- Data for Name: AccountsOfTemplates; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AccountsOfTemplates" (id, name, code, parent_code, status, depth, created_at, updated_at,
                                   account_parent_id, account_group_id, account_type_id, account_template_id,
                                   created_by, account_slug, is_system_account) FROM stdin;
218	Mortgages	231	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	12	88	1	\N	\N
202	Employee Advance	111	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	2	88	1	\N	\N
203	Prepaid Expenses	112	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	2	88	1	prepaid_expenses	t
204	TDS Receivable	113	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	2	88	1	tds_receivable	t
205	Advance Tax	114	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	2	88	1	advance_tax	t
206	Undeposited Funds	121	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	3	88	1	udeposited_funds	t
207	Petty Cash	122	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	3	88	1	petty_cash	t
208	Furniture and Equipment	141	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	5	88	1	\N	\N
209	Inventory Asset	151	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	7	88	1	inventory_asset	t
210	Input Tax	161	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	9	88	1	input_tax	t
211	Accounts Receivable	171	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	1	6	88	1	accounts_receivable	t
212	Employee Reimbursements	211	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	10	88	1	employee_reimbursements	t
213	Opening Balance Adjustments	212	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	10	88	1	opening_balance_adjustments	t
214	Unearned Revenue	213	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	10	88	1	unearned_revenue	t
215	TDS Payable	214	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	10	88	1	tds_payable	t
216	Tax Payable	215	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	10	88	1	tax_payable	t
217	Inter Branch Account	216	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	10	88	1	inter_branch_account	t
219	Construction Loans	232	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	12	88	1	\N	\N
220	Dimension Adjustments	241	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	13	88	1	dismension_adjustments	t
221	Output Tax	251	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	15	88	1	output_tax	t
222	Accounts Payable	261	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	2	28	88	1	accounts_payable	t
223	Drawings	311	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	3	16	88	1	drawings	\N
224	Investments	312	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	3	16	88	1	invesments	\N
225	Distributions	313	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	3	16	88	1	distributions	\N
226	Retained Earnings	314	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	3	16	88	1	retained_earnings	t
227	Owner's Equity	315	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	3	16	88	1	owners_equity	\N
228	Opening Balance Offset	316	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	3	16	88	1	opening_balance_offset	t
229	Capital Stock	317	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	3	16	88	1	capital_stock	\N
230	Dividends Paid	318	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	3	16	88	1	dividends_paid	\N
231	Other Charges	411	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	4	17	88	1	other_charges	\N
232	Shipping Charge	412	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	4	17	88	1	shipping_charges	\N
233	Sales	413	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	4	17	88	1	sales	t
234	General Income	414	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	4	17	88	1	general_income	t
235	Interest Income	415	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	4	17	88	1	interest_income	\N
236	Late Fee Income	416	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	4	17	88	1	late_fee_income	\N
237	Discount	417	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	4	17	88	1	discount	t
238	Travel Expense	511	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	travel_expense	\N
239	Telephone Expense	512	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	telephone_expense	\N
240	Automobile Expense	513	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	automobile_expense	\N
241	IT and Internet Expenses	515	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	it_and_internet_expenses	\N
242	Rent Expense	516	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	rent_expense	\N
243	Janitorial Expense	517	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	janitorial_expense	\N
244	Postage	518	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	postage	\N
245	Bad Debt	519	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	bad_debit	t
246	Printing and Stationery	520	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
247	Salaries and Employee Wages	521	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
248	Meals and Entertainment	522	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
249	Depreciation Expense	523	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
250	Consultant Expense	524	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
251	Repairs and Maintenance	525	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
252	Other Expenses	526	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	other_expenses	\N
253	Lodging	527	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
254	Uncategorized	528	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	uncateogorized	t
255	Raw Materials And Consumables	529	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
256	Merchandise	530	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
257	Transportation Expense	531	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
258	Depreciation And Amortisation	532	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
259	Contract Assets	533	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
260	Office Supplies	534	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
261	Advertising And Marketing	535	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	\N	\N
263	Bank Fees and Charges	537	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	bank_fees_and_charges	t
264	Credit Card Charges	538	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	credit_card_charges	t
265	Cost of Goods Sold	521	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	20	88	1	cost_of_goods_sold	t
266	Labor	522	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	20	88	1	\N	\N
267	Materials	523	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	20	88	1	materials	\N
268	Subcontractor	524	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	20	88	1	\N	\N
269	Job Costing	525	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	20	88	1	\N	\N
270	Exchange Gain or Loss	526	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	21	88	1	exchange_gain_or_loss	t
262	Purchase Discounts	536	\N	active	0	2024-02-06 08:49:36.499+05:30	2024-02-06 08:49:36.499+05:30	\N	5	19	88	1	purchase_discount	t
\.


--
-- Data for Name: AutoNumberGroups; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AutoNumberGroups" (id, name, is_default, is_active, organization_id, created_by, status) FROM stdin;
17	Default number series	t	t	172	1	active
\.


--
-- Data for Name: AutoNumbers; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."AutoNumbers" (id, entity_type, prefix_string, next_number, auto_number_group_id, number_zero_pad,
                           organization_id, created_by) FROM stdin;
22	invoice	INV-	0013	17	3	172	1
23	credit_note	CN-	0001	17	3	172	1
24	customer_payment	CP-	0001	17	3	172	1
\.


--
-- Data for Name: ContactBalances; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."ContactBalances" (id, contact_type, contact_id, currency_id, unused_credits_receivable_amount,
                               bcy_unused_credits_receivable_amount, unused_credits_payable_amount,
                               bcy_unused_credits_payable_amount, outstanding_credits_receivable_amount,
                               bcy_outstanding_credits_receivable_amount, outstanding_credits_payable_amount,
                               bcy_outstanding_credits_payable_amount, is_default, organization_id,
                               created_by) FROM stdin;
7	customer	27	472	0	0	0	0	2685.3200000000000126	2685.3200000000000126	0	0	t	172	1
8	customer	28	482	0	0	0	0	108.8	7398.4	0	0	t	172	1
\.


--
-- Data for Name: ContactPersons; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."ContactPersons" (id, salutation, first_name, last_name, email, phone, mobile, designation, organization_id,
                              created_by, contact_id, status, is_primary) FROM stdin;
29	Mr.	Edward	Samuela	surojit99923@gmail.com	09903035392	09903035392	\N	172	1	27	active	t
30	Mr.	Ratan	Poddar	Jack@k.com	999888888	999888888	\N	172	1	28	active	t
\.


--
-- Data for Name: Contacts; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Contacts" (id, contact_name, contact_type, organization_id, status, created_by, currency_id, company_name,
                        contact_sub_type, payment_term_id, remarks) FROM stdin;
27	Mr. Edward Samuela	customer	172	active	1	472	AMG	business	170	
28	Mr. Ratan	customer	172	active	1	482	MNC	business	167	
\.


--
-- Data for Name: Currency; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Currency" (id, currency_name, currency_symbol, currency_code, status, created_by,
                        organization_id) FROM stdin;
463	United Arab Emirates Dirham	د.إ	AED	active	1	172
464	Australian Dollar	A$	AUD	active	1	172
465	Brazilian Real	R$	BRL	active	1	172
466	Canadian Dollar	CA$	CAD	active	1	172
467	Swiss Franc	CHF	CHF	active	1	172
468	Chinese Yuan	¥	CNY	active	1	172
469	Euro	€	EUR	active	1	172
470	British Pound Sterling	£	GBP	active	1	172
471	Hong Kong Dollar	HK$	HKD	active	1	172
472	Indian Rupee	₹	INR	active	1	172
473	Japanese Yen	¥	JPY	active	1	172
474	Mexican Peso	Mex$	MXN	active	1	172
475	Norwegian Krone	kr	NOK	active	1	172
476	New Zealand Dollar	NZ$	NZD	active	1	172
477	Russian Ruble	₽	RUB	active	1	172
478	Saudi Riyal	﷼	SAR	active	1	172
479	Swedish Krona	kr	SEK	active	1	172
480	Singapore Dollar	S$	SGD	active	1	172
481	Turkish Lira	₺	TRY	active	1	172
482	United States Dollar	$	USD	active	1	172
483	South African Rand	R	ZAR	active	1	172
\.


--
-- Data for Name: CurrencyExchangeRate; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."CurrencyExchangeRate" (id, effective_date, rate, status, currency_id, created_by,
                                    organization_id) FROM stdin;
\.


--
-- Data for Name: FeaturesPreferences; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."FeaturesPreferences" (id, is_multiple_auto_number_series_enable, is_multiple_branches_enable,
                                   is_multiple_branches_active, organization_id, created_at, updated_at) FROM stdin;
29	f	f	f	172	2024-02-06 08:50:49.047+05:30	2024-02-06 08:50:49.047+05:30
\.


--
-- Data for Name: GeneralPreferences; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."GeneralPreferences" (id, sales_tax_type, tax_rounding_type, discount_type, is_discount_before_tax,
                                  created_at, updated_at, organization_id) FROM stdin;
55	entity_level	item_level	no_discount	t	2024-02-06 08:50:49.043+05:30	2024-02-06 08:50:49.043+05:30	172
\.


--
-- Data for Name: InvoiceJournals; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."InvoiceJournals" (id, contact_id, invoice_id, line_item_id, account_slug, account_id, bcy_debit,
                               bcy_credit, debit, credit, organization_id, status, sync_status, created_at,
                               updated_at) FROM stdin;
69	27	186	258	discount_account	645	23.40	0.00	23.40	0.00	172	deleted	notSynced	2024-03-16 10:52:40.847+05:30	2024-03-16 10:53:09.612+05:30
64	27	186	257	tax_account	625	0.00	2.80	0.00	2.80	172	active	notSynced	2024-03-16 00:57:43.96+05:30	2024-03-16 00:57:43.96+05:30
62	27	186	257	sales_account	641	12.80	0.00	12.80	0.00	172	active	notSynced	2024-03-16 00:57:43.96+05:30	2024-03-16 00:57:43.96+05:30
63	27	186	257	item_account	673	0.00	10.00	0.00	10.00	172	active	notSynced	2024-03-16 00:57:43.96+05:30	2024-03-16 00:57:43.96+05:30
71	27	186	258	tax_account	625	0.00	42.12	0.00	42.12	172	active	notSynced	2024-03-16 10:52:40.847+05:30	2024-03-16 10:52:40.847+05:30
68	27	186	258	sales_account	641	276.12	0.00	276.12	0.00	172	active	notSynced	2024-03-16 10:52:40.847+05:30	2024-03-16 10:52:40.847+05:30
70	27	186	258	item_account	676	0.00	234.00	0.00	234.00	172	active	notSynced	2024-03-16 10:52:40.847+05:30	2024-03-16 10:52:40.847+05:30
74	28	187	259	tax_account	625	0.00	140.00	0.00	7.00	172	active	notSynced	2024-03-16 14:43:02.81+05:30	2024-03-16 14:43:02.81+05:30
72	28	187	259	sales_account	641	640.00	0.00	32.00	0.00	172	active	notSynced	2024-03-16 14:43:02.81+05:30	2024-03-16 14:43:02.81+05:30
73	28	187	259	item_account	652	0.00	500.00	0.00	25.00	172	active	notSynced	2024-03-16 14:43:02.81+05:30	2024-03-16 14:43:02.81+05:30
\.


--
-- Data for Name: InvoiceLineItems; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."InvoiceLineItems" (id, name, description, unit, status, organization_id, invoice_id, item_id, account_id,
                                tax_id, unit_id, rate, quantity, discount_percentage, discount_amount, tax_percentage,
                                tax_amount, item_total, item_total_tax_included, created_at, updated_at, bcy_rate,
                                bcy_discount_amount, bcy_tax_amount, bcy_item_total, bcy_item_total_tax_included,
                                product_type) FROM stdin;
257	Ball Pen		box	active	172	186	16	673	115	251	5	2	0	0	28	2.8	10	12.8	2024-03-16 00:57:40.204+05:30	2024-03-16 00:57:40.204+05:30	5	0	2.8	10	12.8	goods
258	Boxer		pcs	active	172	186	18	676	116	258	78	3	0	0	18	42.12	234	276.12	2024-03-16 10:52:40.815+05:30	2024-03-16 10:52:40.815+05:30	78	0	42.12	234	276.12	goods
259	Ball Pen		box	active	172	187	16	652	115	251	0.25	100	0	0	28	7	25	32	2024-03-16 14:43:02.787+05:30	2024-03-16 14:43:02.787+05:30	5	0	140	500	640	goods
260	Boxer		pcs	active	172	188	18	639	116	258	78	1	20	15.6	18	11.23	62.4	73.63	2024-03-17 21:18:36.49+05:30	2024-03-17 21:18:36.49+05:30	78	15.6	11.23	62.4	73.63	goods
261	Boxer		pcs	active	172	188	18	641	116	258	78	1	0	0	18	14.04	78	92.04	2024-03-17 21:18:36.49+05:30	2024-03-17 21:18:36.49+05:30	78	0	14.04	78	92.04	goods
\.


--
-- Data for Name: InvoicePaymentTerms; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."InvoicePaymentTerms" (id, name, origin_payment_term_id, payment_term, "interval", created_at,
                                   updated_at) FROM stdin;
-1	CUSTOM	-1	\N	\N	2023-12-02 23:57:43.491+05:30	2023-12-02 23:57:52.677+05:30
123	End of Month	6	0	end_of_month	2023-12-10 21:43:22.051+05:30	2023-12-10 21:43:22.051+05:30
130	End of Month	6	0	end_of_month	2023-12-10 21:53:37.882+05:30	2023-12-10 21:53:37.882+05:30
131	End of Month	6	0	end_of_month	2023-12-10 21:56:02.824+05:30	2023-12-10 21:56:02.824+05:30
133	Net 60	5	60	regular	2023-12-11 00:04:07.08+05:30	2023-12-11 00:04:07.08+05:30
134	Net 45	4	45	regular	2023-12-11 00:04:29.483+05:30	2023-12-11 00:04:29.483+05:30
135	Net 60	5	60	regular	2023-12-11 00:14:18.3+05:30	2023-12-11 00:14:18.3+05:30
136	Due on Receipt	8	0	end_of_day	2023-12-11 00:20:06+05:30	2023-12-11 00:20:06+05:30
137	Due on Receipt	8	0	end_of_day	2023-12-11 00:45:21.796+05:30	2023-12-11 00:45:21.796+05:30
138	Net 60	5	60	regular	2023-12-24 19:41:52.266+05:30	2023-12-24 19:41:52.266+05:30
142	End of Next Month	7	1	end_of_month	2024-01-15 23:09:32.968+05:30	2024-01-15 23:09:32.968+05:30
143	End of Next Month	7	1	end_of_month	2024-01-15 23:17:16.397+05:30	2024-01-15 23:17:16.397+05:30
144	End of Next Month	7	1	end_of_month	2024-01-15 23:18:06.401+05:30	2024-01-15 23:18:06.401+05:30
145	End of Next Month	7	1	end_of_month	2024-01-15 23:34:35.741+05:30	2024-01-15 23:34:35.741+05:30
146	End of Next Month	7	1	end_of_month	2024-01-18 21:26:29.703+05:30	2024-01-18 21:26:29.703+05:30
147	End of Next Month	7	1	end_of_month	2024-01-18 21:33:11.367+05:30	2024-01-18 21:33:11.367+05:30
148	End of Next Month	7	1	end_of_month	2024-01-18 21:33:31.626+05:30	2024-01-18 21:33:31.626+05:30
149	End of Next Month	7	1	end_of_month	2024-01-18 21:33:45.568+05:30	2024-01-18 21:33:45.568+05:30
150	End of Next Month	7	1	end_of_month	2024-01-18 21:34:07.246+05:30	2024-01-18 21:34:07.246+05:30
151	End of Next Month	7	1	end_of_month	2024-01-18 21:36:30.824+05:30	2024-01-18 21:36:30.824+05:30
153	End of Next Month	7	1	end_of_month	2024-01-18 21:37:14.474+05:30	2024-01-18 21:37:14.474+05:30
154	End of Next Month	7	1	end_of_month	2024-01-18 21:39:46.531+05:30	2024-01-18 21:39:46.531+05:30
155	End of Next Month	7	1	end_of_month	2024-01-18 21:40:04.344+05:30	2024-01-18 21:40:04.344+05:30
156	Net 30	3	30	regular	2024-01-18 21:40:23.212+05:30	2024-01-18 21:40:23.212+05:30
157	Net 30	3	30	regular	2024-01-18 21:53:25.312+05:30	2024-01-18 21:53:25.312+05:30
158	Net 30	3	30	regular	2024-01-18 21:53:38.99+05:30	2024-01-18 21:53:38.99+05:30
159	Net 60	5	60	regular	2024-01-20 23:01:44.55+05:30	2024-01-20 23:01:44.55+05:30
171	End of Next Month	7	1	end_of_month	2024-01-20 23:11:52.619+05:30	2024-01-20 23:11:52.619+05:30
172	End of Next Month	7	1	end_of_month	2024-01-20 23:12:24.843+05:30	2024-01-20 23:12:24.843+05:30
173	End of Next Month	7	1	end_of_month	2024-01-20 23:12:41.802+05:30	2024-01-20 23:12:41.802+05:30
174	End of Next Month	7	1	end_of_month	2024-01-20 23:12:57.017+05:30	2024-01-20 23:12:57.017+05:30
175	End of Next Month	7	1	end_of_month	2024-01-20 23:18:23.193+05:30	2024-01-20 23:18:23.193+05:30
176	End of Next Month	7	1	end_of_month	2024-01-20 23:19:33.681+05:30	2024-01-20 23:19:33.681+05:30
177	End of Next Month	7	1	end_of_month	2024-01-21 00:29:41.159+05:30	2024-01-21 00:29:41.159+05:30
178	End of Next Month	7	1	end_of_month	2024-01-21 21:25:24.791+05:30	2024-01-21 21:25:24.791+05:30
179	Due on Receipt	8	0	end_of_day	2024-01-21 22:01:46.081+05:30	2024-01-21 22:01:46.081+05:30
180	Net 60	5	60	regular	2024-01-21 22:05:00.07+05:30	2024-01-21 22:05:00.07+05:30
181	End of Next Month	7	1	end_of_month	2024-01-21 22:05:05.199+05:30	2024-01-21 22:05:05.199+05:30
182	Due on Receipt	8	0	end_of_day	2024-01-21 22:05:23.106+05:30	2024-01-21 22:05:23.106+05:30
186	End of Next Month	7	1	end_of_month	2024-01-25 22:37:18.336+05:30	2024-01-25 22:37:18.336+05:30
187	End of Next Month	7	1	end_of_month	2024-01-25 22:38:15.974+05:30	2024-01-25 22:38:15.974+05:30
188	End of Next Month	7	1	end_of_month	2024-01-25 22:53:06.314+05:30	2024-01-25 22:53:06.314+05:30
189	End of Next Month	7	1	end_of_month	2024-01-25 22:56:29.972+05:30	2024-01-25 22:56:29.972+05:30
190	End of Next Month	7	1	end_of_month	2024-01-25 22:56:57.448+05:30	2024-01-25 22:56:57.448+05:30
191	End of Next Month	7	1	end_of_month	2024-01-25 22:57:25.975+05:30	2024-01-25 22:57:25.975+05:30
193	Net 60	5	60	regular	2024-01-25 23:08:27.918+05:30	2024-01-25 23:08:27.918+05:30
194	Net 60	5	60	regular	2024-01-25 23:28:45.401+05:30	2024-01-25 23:28:45.401+05:30
195	Net 60	5	60	regular	2024-01-25 23:29:08.983+05:30	2024-01-25 23:29:08.983+05:30
196	Net 60	5	60	regular	2024-01-28 23:33:12.439+05:30	2024-01-28 23:33:12.439+05:30
197	Net 30	3	30	regular	2024-01-28 23:37:32+05:30	2024-01-28 23:37:32+05:30
198	Net 30	3	30	regular	2024-01-28 23:37:49.702+05:30	2024-01-28 23:37:49.702+05:30
199	Net 15	132	15	regular	2024-02-03 23:50:20.476+05:30	2024-02-03 23:50:20.476+05:30
200	Net 15	132	15	regular	2024-02-03 23:51:09.283+05:30	2024-02-03 23:51:09.283+05:30
201	Net 60	170	60	regular	2024-02-07 23:45:21.329+05:30	2024-02-07 23:45:21.329+05:30
202	Net 15	167	15	regular	2024-02-07 23:50:58.569+05:30	2024-02-07 23:50:58.569+05:30
204	Net 60	170	60	regular	2024-03-04 23:34:30.067+05:30	2024-03-04 23:34:30.067+05:30
205	Net 60	170	60	regular	2024-03-04 23:35:59.141+05:30	2024-03-04 23:35:59.141+05:30
207	Net 60	170	60	regular	2024-03-04 23:54:11.679+05:30	2024-03-04 23:54:11.679+05:30
208	Net 60	170	60	regular	2024-03-05 00:03:07.308+05:30	2024-03-05 00:03:07.308+05:30
209	Net 60	170	60	regular	2024-03-05 00:05:27.531+05:30	2024-03-05 00:05:27.531+05:30
211	Net 60	170	60	regular	2024-03-16 00:29:06.833+05:30	2024-03-16 00:29:06.833+05:30
212	Net 60	170	60	regular	2024-03-16 00:34:48.692+05:30	2024-03-16 00:34:48.692+05:30
213	Net 60	170	60	regular	2024-03-16 00:35:13.578+05:30	2024-03-16 00:35:13.578+05:30
214	Net 60	170	60	regular	2024-03-16 00:35:42.212+05:30	2024-03-16 00:35:42.212+05:30
215	Net 60	170	60	regular	2024-03-16 00:36:47.982+05:30	2024-03-16 00:36:47.982+05:30
216	Net 60	170	60	regular	2024-03-16 00:37:59.723+05:30	2024-03-16 00:37:59.723+05:30
217	Net 60	170	60	regular	2024-03-16 00:38:42.285+05:30	2024-03-16 00:38:42.285+05:30
218	Net 60	170	60	regular	2024-03-16 00:39:00.831+05:30	2024-03-16 00:39:00.831+05:30
219	Net 60	170	60	regular	2024-03-16 00:39:18.615+05:30	2024-03-16 00:39:18.615+05:30
220	Net 60	170	60	regular	2024-03-16 00:40:16.712+05:30	2024-03-16 00:40:16.712+05:30
222	Net 60	170	60	regular	2024-03-16 00:51:17.719+05:30	2024-03-16 00:51:17.719+05:30
223	Net 60	170	60	regular	2024-03-16 00:54:21.19+05:30	2024-03-16 00:54:21.19+05:30
224	Net 60	170	60	regular	2024-03-16 00:55:34.817+05:30	2024-03-16 00:55:34.817+05:30
225	Net 60	170	60	regular	2024-03-16 00:56:00.47+05:30	2024-03-16 00:56:00.47+05:30
227	Net 60	170	60	regular	2024-03-16 00:57:40.165+05:30	2024-03-16 00:57:40.165+05:30
228	Net 60	170	60	regular	2024-03-16 00:58:27.811+05:30	2024-03-16 00:58:27.811+05:30
230	Net 60	170	60	regular	2024-03-16 01:07:12.108+05:30	2024-03-16 01:07:12.108+05:30
231	Net 60	170	60	regular	2024-03-16 01:08:42.165+05:30	2024-03-16 01:08:42.165+05:30
232	Net 60	170	60	regular	2024-03-16 01:09:07.96+05:30	2024-03-16 01:09:07.96+05:30
233	Net 60	170	60	regular	2024-03-16 01:10:11.273+05:30	2024-03-16 01:10:11.273+05:30
236	Net 60	170	60	regular	2024-03-16 01:18:30.384+05:30	2024-03-16 01:18:30.384+05:30
237	Net 60	170	60	regular	2024-03-16 10:52:40.773+05:30	2024-03-16 10:52:40.773+05:30
238	Net 60	170	60	regular	2024-03-16 10:53:09.589+05:30	2024-03-16 10:53:09.589+05:30
239	Net 60	170	60	regular	2024-03-16 10:54:51.847+05:30	2024-03-16 10:54:51.847+05:30
240	Due on Receipt	173	0	end_of_day	2024-03-16 14:43:02.759+05:30	2024-03-16 14:43:02.759+05:30
241	Net 60	170	60	regular	2024-03-16 23:51:26.152+05:30	2024-03-16 23:51:26.152+05:30
242	Net 60	170	60	regular	2024-03-16 23:52:14.68+05:30	2024-03-16 23:52:14.68+05:30
243	Due on Receipt	173	0	end_of_day	2024-03-16 23:54:14.084+05:30	2024-03-16 23:54:14.084+05:30
244	Net 15	167	15	regular	2024-03-17 21:18:36.46+05:30	2024-03-17 21:18:36.46+05:30
\.


--
-- Data for Name: InvoicePreferences; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."InvoicePreferences" (id, is_auto_number_enabled, organization_id, created_at, updated_at) FROM stdin;
29	t	172	2024-02-06 08:50:49.051+05:30	2024-02-06 08:50:49.051+05:30
\.


--
-- Data for Name: Invoices; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Invoices" (id, contact_id, invoice_number, reference_number, order_number, terms, notes, is_inclusive_tax,
                        status, organization_id, created_by, discount_total, tax_total, sub_total, total, created_at,
                        updated_at, invoice_payment_term_id, issue_date, due_date, currency_id, transaction_status,
                        bcy_discount_total, bcy_tax_total, bcy_sub_total, bcy_total, sync_status,
                        exchange_rate) FROM stdin;
186	27	INV-0010					f	active	172	1	0	44.92	244	288.92	2024-03-16 00:57:40.185+05:30	2024-03-16 23:52:14.69+05:30	242	2024-03-15	2024-05-14	472	sent	0	44.92	244	288.92	notSynced	1.000000
187	28	INV-0011					f	active	172	1	0	7	25	32	2024-03-16 14:43:02.775+05:30	2024-03-16 23:54:14.092+05:30	243	2024-02-01	2024-02-01	482	sent	0	140	500	640	notSynced	20.000000
188	28	INV-0012	\N	\N	\N		f	active	172	1	15.6	25.27	140.4	165.67	2024-03-17 21:18:36.483+05:30	2024-03-17 21:18:36.483+05:30	244	2024-03-17	2024-04-01	482	draft	15.6	25.27	140.4	165.67	notSynced	1.000000
\.


--
-- Data for Name: ItemPreferences; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."ItemPreferences" (id, quantity_precision, is_item_name_duplication_enabled, created_at, updated_at,
                               organization_id) FROM stdin;
63	2	t	2024-02-06 08:50:49.038+05:30	2024-02-06 08:50:49.038+05:30	172
\.


--
-- Data for Name: ItemUnits; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."ItemUnits" (id, name, unit, status, created_at, updated_at, created_by, organization_id) FROM stdin;
251	BOX	box	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
252	Centimeter	cm	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
253	Meter	m	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
254	Feet	ft	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
255	Gram	g	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
256	Kilogram	kg	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
257	Other	oth	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
258	Pieces	pcs	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
259	Dozen	dz	active	2024-02-06 08:50:49.057+05:30	2024-02-06 08:50:49.057+05:30	1	172
\.


--
-- Data for Name: OrganizationBasics; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."OrganizationBasics" (id, name, primary_address, country_code, sector, status, created_at, updated_at,
                                  created_by, currency_id) FROM stdin;
1	Reducer	Goa, India	IN	Others	active	2023-08-26 00:09:34.016+05:30	2023-08-26 00:09:34.016+05:30	1	\N
172	DEN	Kolkata, India	IN	Others	active	2024-02-06 08:50:48.964+05:30	2024-02-06 08:50:49.085+05:30	1	472
\.


--
-- Data for Name: OrganizationsUsers; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."OrganizationsUsers" (id, job_status, status, role_id, invited_by, invited_on, accepted_on,
                                  is_default_organization, created_at, updated_at, user_id, organization_id) FROM stdin;
166	working	active	admin	\N	\N	\N	t	2024-02-06 08:50:48.973+05:30	2024-02-06 08:50:48.973+05:30	1	172
1	working	active	admin	\N	\N	\N	f	2023-08-26 00:09:34.021+05:30	2023-08-26 00:09:34.021+05:30	1	1
\.


--
-- Data for Name: PaymentTerms; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."PaymentTerms" (id, name, payment_term, is_default, "interval", status, created_by, organization_id,
                            created_at, updated_at) FROM stdin;
167	Net 15	15	f	regular	active	1	172	2024-02-06 08:50:49.068+05:30	2024-02-06 08:50:49.068+05:30
168	Net 30	30	f	regular	active	1	172	2024-02-06 08:50:49.068+05:30	2024-02-06 08:50:49.068+05:30
169	Net 45	45	f	regular	active	1	172	2024-02-06 08:50:49.068+05:30	2024-02-06 08:50:49.068+05:30
170	Net 60	60	f	regular	active	1	172	2024-02-06 08:50:49.068+05:30	2024-02-06 08:50:49.068+05:30
171	End of Month	0	f	end_of_month	active	1	172	2024-02-06 08:50:49.068+05:30	2024-02-06 08:50:49.068+05:30
172	End of Next Month	1	f	end_of_month	active	1	172	2024-02-06 08:50:49.068+05:30	2024-02-06 08:50:49.068+05:30
173	Due on Receipt	0	t	end_of_day	active	1	172	2024-02-06 08:50:49.068+05:30	2024-02-06 08:50:49.068+05:30
\.


--
-- Data for Name: RegularItems; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."RegularItems" (id, name, product_type, selling_price, selling_description, purchase_price,
                            purchase_description, item_for, status, created_at, updated_at, created_by, organization_id,
                            sales_account_id, purchase_account_id, tax_id, unit_id) FROM stdin;
16	Ball Pen	goods	5		0		sales	active	2024-02-06 23:21:40.644+05:30	2024-02-06 23:21:40.644+05:30	1	172	641	\N	115	251
17	Paper Weight	goods	0		60	\N	purchase	active	2024-02-06 23:56:37.785+05:30	2024-02-06 23:56:37.785+05:30	1	172	\N	672	118	251
18	Boxer	goods	78		0		sales	active	2024-02-08 00:53:19.183+05:30	2024-02-08 00:53:19.183+05:30	1	172	641	\N	116	258
\.


--
-- Data for Name: TaxRates; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."TaxRates" (id, name, description, rate, country_code, tax_type, status, created_at, updated_at, created_by,
                        organization_id, is_editable, is_deletable) FROM stdin;
115	GST28	GST Of 28%	28	IN	direct_tax	active	2024-02-06 08:50:49.062+05:30	2024-02-06 08:50:49.062+05:30	1	172	f	f
116	GST18	GST Of 18%	18	IN	direct_tax	active	2024-02-06 08:50:49.062+05:30	2024-02-06 08:50:49.062+05:30	1	172	f	f
117	GST12	GST Of 12%	12	IN	direct_tax	active	2024-02-06 08:50:49.062+05:30	2024-02-06 08:50:49.062+05:30	1	172	f	f
118	GST05	GST Of 5%	5	IN	direct_tax	active	2024-02-06 08:50:49.062+05:30	2024-02-06 08:50:49.062+05:30	1	172	f	f
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Users" (id, name, email, status, client_id) FROM stdin;
1	Rita  Paul	man	active	4887d860-78cb-4c07-9ae2-261c822ce825
6	Surojit  Paul	surojit1@gmail.com	active	70da3fcb-8315-4d67-aac2-483b0cbe518e
7	Surojit  Paul	pifahif493@bitvoo.com	active	a3087b68-a70f-4d22-b762-2d429ceb559a
8	copper  plate	copper@dust.com	active	973a4c40-d461-4e53-b1a5-15e63112390c
9	Deb  Paul	surojit99924@gmail.com	active	375b0b8c-a3dd-475f-b7d8-7ff8ecd95f83
10	Surojit  Paul	surojit99925@gmail.com	active	a19e048a-68d8-4fb5-a117-1de59939d580
\.


--
-- Name: AccountGroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountGroups_id_seq"', 7, true);


--
-- Name: AccountTemplateDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountTemplateDetails_id_seq"', 95, true);


--
-- Name: AccountTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountTypes_id_seq"', 28, true);


--
-- Name: AccountsConfigs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountsConfigs_id_seq"', 7, true);


--
-- Name: AccountsOfOrganizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountsOfOrganizations_id_seq"', 1026, true);


--
-- Name: AccountsOfTemplates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountsOfTemplates_id_seq"', 270, true);


--
-- Name: AutoNumberGroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AutoNumberGroups_id_seq"', 20, true);


--
-- Name: AutoNumbers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AutoNumbers_id_seq"', 33, true);


--
-- Name: ContactBalances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."ContactBalances_id_seq"', 8, true);


--
-- Name: ContactPersons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."ContactPersons_id_seq"', 30, true);


--
-- Name: Contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Contacts_id_seq"', 28, true);


--
-- Name: CurrencyExchangeRate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."CurrencyExchangeRate_id_seq"', 1, false);


--
-- Name: Currency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Currency_id_seq"', 546, true);


--
-- Name: FeaturesPreferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."FeaturesPreferences_id_seq"', 34, true);


--
-- Name: GeneralPreferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."GeneralPreferences_id_seq"', 60, true);


--
-- Name: InvoiceJournals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."InvoiceJournals_id_seq"', 74, true);


--
-- Name: InvoiceLineItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."InvoiceLineItems_id_seq"', 261, true);


--
-- Name: InvoicePaymentTerms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."InvoicePaymentTerms_id_seq"', 244, true);


--
-- Name: InvoicePreferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."InvoicePreferences_id_seq"', 34, true);


--
-- Name: Invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Invoices_id_seq"', 188, true);


--
-- Name: ItemPreferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."ItemPreferences_id_seq"', 68, true);


--
-- Name: ItemUnits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."ItemUnits_id_seq"', 286, true);


--
-- Name: OrganizationBasics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."OrganizationBasics_id_seq"', 177, true);


--
-- Name: OrganizationsUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."OrganizationsUsers_id_seq"', 171, true);


--
-- Name: PaymentTerms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."PaymentTerms_id_seq"', 194, true);


--
-- Name: RegularItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."RegularItems_id_seq"', 18, true);


--
-- Name: TaxRates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."TaxRates_id_seq"', 130, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Users_id_seq"', 10, true);


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
-- Name: AutoNumberGroups AutoNumberGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumberGroups"
    ADD CONSTRAINT "AutoNumberGroups_pkey" PRIMARY KEY (id);


--
-- Name: AutoNumbers AutoNumbers_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumbers"
    ADD CONSTRAINT "AutoNumbers_pkey" PRIMARY KEY (id);


--
-- Name: ContactBalances ContactBalances_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactBalances"
    ADD CONSTRAINT "ContactBalances_pkey" PRIMARY KEY (id);


--
-- Name: ContactPersons ContactPersons_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactPersons"
    ADD CONSTRAINT "ContactPersons_pkey" PRIMARY KEY (id);


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
-- Name: FeaturesPreferences FeaturesPreferences_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."FeaturesPreferences"
    ADD CONSTRAINT "FeaturesPreferences_pkey" PRIMARY KEY (id);


--
-- Name: GeneralPreferences GeneralPreferences_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralPreferences"
    ADD CONSTRAINT "GeneralPreferences_pkey" PRIMARY KEY (id);


--
-- Name: InvoiceJournals InvoiceJournals_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceJournals"
    ADD CONSTRAINT "InvoiceJournals_pkey" PRIMARY KEY (id);


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
-- Name: InvoicePreferences InvoicePreferences_pkey; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoicePreferences"
    ADD CONSTRAINT "InvoicePreferences_pkey" PRIMARY KEY (id);


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
-- Name: AccountsConfigs AccountsConfigs_account_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_account_template_id_fkey" FOREIGN KEY (account_template_id) REFERENCES public."AccountTemplateDetails" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_accounts_payable_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_accounts_payable_account_id_fkey" FOREIGN KEY (default_accounts_payable_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_accounts_receivable_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_accounts_receivable_account_id_fkey" FOREIGN KEY (default_accounts_receivable_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_bad_debt_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_bad_debt_account_id_fkey" FOREIGN KEY (default_bad_debt_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_bank_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_bank_account_id_fkey" FOREIGN KEY (default_bank_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_cost_of_goods_sold_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_cost_of_goods_sold_account_id_fkey" FOREIGN KEY (default_cost_of_goods_sold_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_discount_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_discount_account_id_fkey" FOREIGN KEY (default_discount_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_exchange_gain_loss_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_exchange_gain_loss_account_id_fkey" FOREIGN KEY (default_exchange_gain_loss_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_inventory_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_inventory_account_id_fkey" FOREIGN KEY (default_inventory_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_opening_balance_adjustments_accoun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_opening_balance_adjustments_accoun_fkey" FOREIGN KEY (default_opening_balance_adjustments_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_opening_balance_offset_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_opening_balance_offset_account_id_fkey" FOREIGN KEY (default_opening_balance_offset_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_purchase_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_purchase_account_id_fkey" FOREIGN KEY (default_purchase_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_purchase_discount_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_purchase_discount_account_id_fkey" FOREIGN KEY (default_purchase_discount_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_retained_earnings_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_retained_earnings_account_id_fkey" FOREIGN KEY (default_retained_earnings_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_sales_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_sales_account_id_fkey" FOREIGN KEY (default_sales_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_tax_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_tax_account_id_fkey" FOREIGN KEY (default_tax_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_default_unearned_revenue_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_default_unearned_revenue_account_id_fkey" FOREIGN KEY (default_unearned_revenue_account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountsConfigs AccountsConfigs_organization_fk; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountsConfigs"
    ADD CONSTRAINT "AccountsConfigs_organization_fk" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


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
    ADD CONSTRAINT "AccountsOfOrganizations_account_type_id_fkey" FOREIGN KEY (account_type_id) REFERENCES public."AccountTypes" (id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: AutoNumberGroups AutoNumberGroups_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumberGroups"
    ADD CONSTRAINT "AutoNumberGroups_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AutoNumberGroups AutoNumberGroups_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumberGroups"
    ADD CONSTRAINT "AutoNumberGroups_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AutoNumbers AutoNumbers_auto_number_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumbers"
    ADD CONSTRAINT "AutoNumbers_auto_number_group_id_fkey" FOREIGN KEY (auto_number_group_id) REFERENCES public."AutoNumberGroups" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AutoNumbers AutoNumbers_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumbers"
    ADD CONSTRAINT "AutoNumbers_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AutoNumbers AutoNumbers_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AutoNumbers"
    ADD CONSTRAINT "AutoNumbers_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactBalances ContactBalances_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactBalances"
    ADD CONSTRAINT "ContactBalances_contact_id_fkey" FOREIGN KEY (contact_id) REFERENCES public."Contacts" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactBalances ContactBalances_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactBalances"
    ADD CONSTRAINT "ContactBalances_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactBalances ContactBalances_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactBalances"
    ADD CONSTRAINT "ContactBalances_currency_id_fkey" FOREIGN KEY (currency_id) REFERENCES public."Currency" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactBalances ContactBalances_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactBalances"
    ADD CONSTRAINT "ContactBalances_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactPersons ContactPersons_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactPersons"
    ADD CONSTRAINT "ContactPersons_contact_id_fkey" FOREIGN KEY (contact_id) REFERENCES public."Contacts" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactPersons ContactPersons_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactPersons"
    ADD CONSTRAINT "ContactPersons_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactPersons ContactPersons_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."ContactPersons"
    ADD CONSTRAINT "ContactPersons_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Contacts Contacts_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Contacts Contacts_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_currency_id_fkey" FOREIGN KEY (currency_id) REFERENCES public."Currency" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Contacts Contacts_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Contacts Contacts_payment_term_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_payment_term_id_fkey" FOREIGN KEY (payment_term_id) REFERENCES public."PaymentTerms" (id) ON UPDATE CASCADE ON DELETE SET NULL;


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
-- Name: FeaturesPreferences FeaturesPreferences_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."FeaturesPreferences"
    ADD CONSTRAINT "FeaturesPreferences_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GeneralPreferences GeneralPreferences_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."GeneralPreferences"
    ADD CONSTRAINT "GeneralPreferences_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceJournals InvoiceJournals_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceJournals"
    ADD CONSTRAINT "InvoiceJournals_account_id_fkey" FOREIGN KEY (account_id) REFERENCES public."AccountsOfOrganizations" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceJournals InvoiceJournals_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceJournals"
    ADD CONSTRAINT "InvoiceJournals_contact_id_fkey" FOREIGN KEY (contact_id) REFERENCES public."Contacts" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceJournals InvoiceJournals_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceJournals"
    ADD CONSTRAINT "InvoiceJournals_invoice_id_fkey" FOREIGN KEY (invoice_id) REFERENCES public."Invoices" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceJournals InvoiceJournals_line_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceJournals"
    ADD CONSTRAINT "InvoiceJournals_line_item_id_fkey" FOREIGN KEY (line_item_id) REFERENCES public."InvoiceLineItems" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InvoiceJournals InvoiceJournals_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceJournals"
    ADD CONSTRAINT "InvoiceJournals_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


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
    ADD CONSTRAINT "InvoiceLineItems_tax_id_fkey" FOREIGN KEY (tax_id) REFERENCES public."TaxRates" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InvoiceLineItems InvoiceLineItems_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoiceLineItems"
    ADD CONSTRAINT "InvoiceLineItems_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES public."ItemUnits" (id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InvoicePreferences InvoicePreferences_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."InvoicePreferences"
    ADD CONSTRAINT "InvoicePreferences_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: OrganizationsUsers OrganizationsUsers_organization_fk; Type: FK CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."OrganizationsUsers"
    ADD CONSTRAINT "OrganizationsUsers_organization_fk" FOREIGN KEY (organization_id) REFERENCES public."OrganizationBasics" (id) ON UPDATE CASCADE ON DELETE CASCADE;


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

