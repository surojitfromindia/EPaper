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
-- Name: enum_Invoices_status; Type: TYPE; Schema: public; Owner: surojit
--

CREATE TYPE public."enum_Invoices_status" AS ENUM (
    'active',
    'deactive',
    'deleted'
    );


ALTER TYPE public."enum_Invoices_status" OWNER TO surojit;

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
    id                       integer                                                                                                     NOT NULL,
    name                     character varying(255)                                                                                      NOT NULL,
    code                     character varying(255)                                                                                      NOT NULL,
    parent_code              character varying(255),
    depth                    smallint,
    created_at               timestamp(6) with time zone                                                                                 NOT NULL,
    updated_at               timestamp(6) with time zone                                                                                 NOT NULL,
    account_parent_id        integer,
    account_group_id         integer                                                                                                     NOT NULL,
    account_type_id          integer,
    account_template_id      integer                                                                                                     NOT NULL,
    created_by               integer                                                                                                     NOT NULL,
    organization_id          integer                                                                                                     NOT NULL,
    origin_account_id        integer,
    origin_account_parent_id integer,
    description              character varying(255),
    status                   public."enum_AccountsOfOrganizations_status" DEFAULT 'active'::public."enum_AccountsOfOrganizations_status" NOT NULL
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
    contact_name    character varying(255)                                                        NOT NULL,
    contact_type    public."enum_Contacts_contact_type"                                           NOT NULL,
    created_at      timestamp(6) with time zone                                                   NOT NULL,
    updated_at      timestamp(6) with time zone                                                   NOT NULL,
    organization_id integer                                                                       NOT NULL,
    status          public."enum_Contacts_status" DEFAULT 'active'::public."enum_Contacts_status" NOT NULL,
    created_by      integer                                                                       NOT NULL
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
    tax_id                  integer                                                                                       NOT NULL,
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
-- Name: Invoices; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."Invoices"
(
    id               integer                                                                       NOT NULL,
    contact_id       integer                                                                       NOT NULL,
    invoice_number   character varying(255)                                                        NOT NULL,
    reference_number character varying(255),
    order_number     character varying(255),
    terms            character varying(255),
    notes            character varying(255),
    is_inclusive_tax boolean                                                                       NOT NULL,
    status           public."enum_Invoices_status" DEFAULT 'active'::public."enum_Invoices_status" NOT NULL,
    organization_id  integer                                                                       NOT NULL,
    created_by       integer                                                                       NOT NULL,
    discount_total   numeric                                                                       NOT NULL,
    tax_total        numeric                                                                       NOT NULL,
    sub_total        numeric                                                                       NOT NULL,
    total            numeric                                                                       NOT NULL,
    created_at       timestamp(6) with time zone                                                   NOT NULL,
    updated_at       timestamp(6) with time zone                                                   NOT NULL
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
    currency_code   character varying(255)                                     NOT NULL,
    status          character varying(255) DEFAULT 'active'::character varying NOT NULL,
    created_at      timestamp(6) with time zone                                NOT NULL,
    updated_at      timestamp(6) with time zone                                NOT NULL,
    created_by      integer                                                    NOT NULL
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
-- Name: RegularItems; Type: TABLE; Schema: public; Owner: surojit
--

CREATE TABLE public."RegularItems"
(
    id                   integer                                                    NOT NULL,
    name                 character varying(255)                                     NOT NULL,
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
3	Account template for organization 71	IN	Others	active	\N	2023-09-20 23:48:47.248+05:30	2023-09-20 23:48:47.248+05:30	1	1	71
4	Account template for organization 72	IN	Others	active	\N	2023-09-20 23:51:22.872+05:30	2023-09-20 23:51:22.872+05:30	1	1	72
7	Account template for organization 75	IN	Others	active	\N	2023-09-21 22:31:54.183+05:30	2023-09-21 22:31:54.183+05:30	1	1	75
8	Account template for organization 76	IN	Others	active	\N	2023-09-23 13:55:12.765+05:30	2023-09-23 13:55:12.765+05:30	1	1	76
9	Account template for organization 77	IN	Others	active	\N	2023-10-04 16:15:06.144+05:30	2023-10-04 16:15:06.144+05:30	1	1	77
16	Account template for organization 104	IN	Others	active	f	2023-10-08 21:10:06.922+05:30	2023-10-08 21:10:06.922+05:30	1	1	104
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
451	Retained Earnings	314	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	8	1	76	20	\N	\N	active
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
95	Cost of Goods Sold	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	3	1	71	59	\N	\N	active
96	Labor	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	3	1	71	60	\N	\N	active
97	Materials	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	3	1	71	61	\N	\N	active
98	Subcontractor	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	3	1	71	62	\N	\N	active
452	Owner's Equity	315	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	8	1	76	21	\N	\N	active
59	Cost of Goods Sold	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	59	\N	\N	active
60	Labor	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	60	\N	\N	active
61	Materials	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	61	\N	\N	active
62	Subcontractor	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	62	\N	\N	active
63	Job Costing	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	2	1	2	63	\N	\N	active
64	Exchange Gain or Loss	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	21	2	1	2	64	\N	\N	active
99	Job Costing	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	3	1	71	63	\N	\N	active
100	Exchange Gain or Loss	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	21	3	1	71	64	\N	\N	active
101	Employee Advance	111	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	3	1	71	1	\N	\N	active
102	Prepaid Expenses	112	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	3	1	71	2	\N	\N	active
103	TDS Receivable	113	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	3	1	71	3	\N	\N	active
104	Advance Tax	114	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	3	1	71	4	\N	\N	active
105	Undeposited Funds	121	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	3	1	71	5	\N	\N	active
106	Petty Cash	122	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	3	1	71	6	\N	\N	active
107	Furniture and Equipment	141	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	5	3	1	71	7	\N	\N	active
108	Inventory Asset	151	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	7	3	1	71	8	\N	\N	active
109	Employee Reimbursements	211	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	3	1	71	9	\N	\N	active
110	Opening Balance Adjustments	212	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	3	1	71	10	\N	\N	active
111	Unearned Revenue	213	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	3	1	71	11	\N	\N	active
112	TDS Payable	214	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	3	1	71	12	\N	\N	active
113	Tax Payable	215	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	3	1	71	13	\N	\N	active
114	Mortgages	231	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	3	1	71	14	\N	\N	active
115	Meals and Entertainment	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	42	\N	\N	active
116	Depreciation Expense	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	43	\N	\N	active
117	Consultant Expense	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	44	\N	\N	active
118	Repairs and Maintenance	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	45	\N	\N	active
119	Other Expenses	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	46	\N	\N	active
120	Lodging	527	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	47	\N	\N	active
121	Uncategorized	528	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	48	\N	\N	active
122	Raw Materials And Consumables	529	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	49	\N	\N	active
123	Merchandise	530	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	50	\N	\N	active
124	Transportation Expense	531	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	51	\N	\N	active
125	Depreciation And Amortisation	532	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	52	\N	\N	active
126	Construction Loans	232	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	3	1	71	15	\N	\N	active
127	Dimension Adjustments	241	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	13	3	1	71	16	\N	\N	active
128	Drawings	311	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	3	1	71	17	\N	\N	active
129	Investments	312	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	3	1	71	18	\N	\N	active
130	Distributions	313	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	3	1	71	19	\N	\N	active
131	Retained Earnings	314	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	3	1	71	20	\N	\N	active
132	Owner's Equity	315	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	3	1	71	21	\N	\N	active
133	Opening Balance Offset	316	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	3	1	71	22	\N	\N	active
134	Capital Stock	317	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	3	1	71	23	\N	\N	active
135	Dividends Paid	318	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	3	1	71	24	\N	\N	active
136	Other Charges	411	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	3	1	71	25	\N	\N	active
137	Shipping Charge	412	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	3	1	71	26	\N	\N	active
138	Sales	413	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	3	1	71	27	\N	\N	active
139	General Income	414	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	3	1	71	28	\N	\N	active
140	Interest Income	415	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	3	1	71	29	\N	\N	active
141	Late Fee Income	416	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	3	1	71	30	\N	\N	active
142	Discount	417	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	3	1	71	31	\N	\N	active
143	Contract Assets	533	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	53	\N	\N	active
144	Office Supplies	534	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	54	\N	\N	active
145	Advertising And Marketing	535	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	55	\N	\N	active
146	Purchase Discounts	536	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	56	\N	\N	active
147	Bank Fees and Charges	537	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	57	\N	\N	active
148	Credit Card Charges	538	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	58	\N	\N	active
149	Travel Expense	511	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	32	\N	\N	active
150	Telephone Expense	512	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	33	\N	\N	active
151	Automobile Expense	513	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	34	\N	\N	active
152	IT and Internet Expenses	515	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	35	\N	\N	active
153	Rent Expense	516	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	36	\N	\N	active
154	Janitorial Expense	517	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	37	\N	\N	active
155	Postage	518	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	38	\N	\N	active
156	Bad Debt	519	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	39	\N	\N	active
157	Printing and Stationery	520	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	40	\N	\N	active
158	Salaries and Employee Wages	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	3	1	71	41	\N	\N	active
159	Cost of Goods Sold	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	4	1	72	59	\N	\N	active
160	Labor	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	4	1	72	60	\N	\N	active
161	Materials	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	4	1	72	61	\N	\N	active
162	Subcontractor	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	4	1	72	62	\N	\N	active
163	Job Costing	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	4	1	72	63	\N	\N	active
164	Exchange Gain or Loss	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	21	4	1	72	64	\N	\N	active
165	Employee Advance	111	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	4	1	72	1	\N	\N	active
166	Prepaid Expenses	112	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	4	1	72	2	\N	\N	active
167	TDS Receivable	113	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	4	1	72	3	\N	\N	active
168	Advance Tax	114	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	4	1	72	4	\N	\N	active
169	Undeposited Funds	121	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	4	1	72	5	\N	\N	active
170	Petty Cash	122	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	4	1	72	6	\N	\N	active
171	Furniture and Equipment	141	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	5	4	1	72	7	\N	\N	active
172	Inventory Asset	151	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	7	4	1	72	8	\N	\N	active
173	Employee Reimbursements	211	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	4	1	72	9	\N	\N	active
174	Opening Balance Adjustments	212	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	4	1	72	10	\N	\N	active
175	Unearned Revenue	213	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	4	1	72	11	\N	\N	active
176	TDS Payable	214	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	4	1	72	12	\N	\N	active
177	Tax Payable	215	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	4	1	72	13	\N	\N	active
178	Mortgages	231	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	4	1	72	14	\N	\N	active
179	Meals and Entertainment	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	42	\N	\N	active
180	Depreciation Expense	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	43	\N	\N	active
181	Consultant Expense	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	44	\N	\N	active
182	Repairs and Maintenance	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	45	\N	\N	active
183	Other Expenses	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	46	\N	\N	active
184	Lodging	527	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	47	\N	\N	active
185	Uncategorized	528	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	48	\N	\N	active
186	Raw Materials And Consumables	529	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	49	\N	\N	active
187	Merchandise	530	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	50	\N	\N	active
188	Transportation Expense	531	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	51	\N	\N	active
189	Depreciation And Amortisation	532	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	52	\N	\N	active
190	Construction Loans	232	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	4	1	72	15	\N	\N	active
191	Dimension Adjustments	241	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	13	4	1	72	16	\N	\N	active
192	Drawings	311	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	4	1	72	17	\N	\N	active
193	Investments	312	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	4	1	72	18	\N	\N	active
194	Distributions	313	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	4	1	72	19	\N	\N	active
195	Retained Earnings	314	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	4	1	72	20	\N	\N	active
196	Owner's Equity	315	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	4	1	72	21	\N	\N	active
197	Opening Balance Offset	316	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	4	1	72	22	\N	\N	active
198	Capital Stock	317	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	4	1	72	23	\N	\N	active
199	Dividends Paid	318	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	4	1	72	24	\N	\N	active
200	Other Charges	411	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	4	1	72	25	\N	\N	active
201	Shipping Charge	412	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	4	1	72	26	\N	\N	active
202	Sales	413	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	4	1	72	27	\N	\N	active
203	General Income	414	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	4	1	72	28	\N	\N	active
204	Interest Income	415	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	4	1	72	29	\N	\N	active
205	Late Fee Income	416	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	4	1	72	30	\N	\N	active
206	Discount	417	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	4	1	72	31	\N	\N	active
207	Contract Assets	533	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	53	\N	\N	active
208	Office Supplies	534	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	54	\N	\N	active
209	Advertising And Marketing	535	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	55	\N	\N	active
210	Purchase Discounts	536	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	56	\N	\N	active
211	Bank Fees and Charges	537	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	57	\N	\N	active
212	Credit Card Charges	538	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	58	\N	\N	active
213	Travel Expense	511	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	32	\N	\N	active
214	Telephone Expense	512	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	33	\N	\N	active
215	Automobile Expense	513	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	34	\N	\N	active
216	IT and Internet Expenses	515	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	35	\N	\N	active
217	Rent Expense	516	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	36	\N	\N	active
218	Janitorial Expense	517	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	37	\N	\N	active
219	Postage	518	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	38	\N	\N	active
220	Bad Debt	519	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	39	\N	\N	active
221	Printing and Stationery	520	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	40	\N	\N	active
222	Salaries and Employee Wages	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	4	1	72	41	\N	\N	active
415	Cost of Goods Sold	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	8	1	76	59	\N	\N	active
416	Labor	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	8	1	76	60	\N	\N	active
417	Materials	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	8	1	76	61	\N	\N	active
418	Subcontractor	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	8	1	76	62	\N	\N	active
419	Job Costing	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	8	1	76	63	\N	\N	active
420	Exchange Gain or Loss	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	21	8	1	76	64	\N	\N	active
421	Employee Advance	111	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	8	1	76	1	\N	\N	active
422	Prepaid Expenses	112	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	8	1	76	2	\N	\N	active
423	TDS Receivable	113	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	8	1	76	3	\N	\N	active
424	Advance Tax	114	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	8	1	76	4	\N	\N	active
425	Undeposited Funds	121	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	8	1	76	5	\N	\N	active
426	Petty Cash	122	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	8	1	76	6	\N	\N	active
427	Furniture and Equipment	141	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	5	8	1	76	7	\N	\N	active
428	Inventory Asset	151	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	7	8	1	76	8	\N	\N	active
429	Employee Reimbursements	211	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	8	1	76	9	\N	\N	active
430	Opening Balance Adjustments	212	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	8	1	76	10	\N	\N	active
431	Unearned Revenue	213	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	8	1	76	11	\N	\N	active
432	TDS Payable	214	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	8	1	76	12	\N	\N	active
433	Tax Payable	215	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	8	1	76	13	\N	\N	active
434	Mortgages	231	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	8	1	76	14	\N	\N	active
435	Meals and Entertainment	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	42	\N	\N	active
436	Depreciation Expense	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	43	\N	\N	active
437	Consultant Expense	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	44	\N	\N	active
438	Repairs and Maintenance	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	45	\N	\N	active
439	Other Expenses	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	46	\N	\N	active
440	Lodging	527	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	47	\N	\N	active
441	Uncategorized	528	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	48	\N	\N	active
442	Raw Materials And Consumables	529	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	49	\N	\N	active
443	Merchandise	530	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	50	\N	\N	active
444	Transportation Expense	531	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	51	\N	\N	active
445	Depreciation And Amortisation	532	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	52	\N	\N	active
446	Construction Loans	232	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	8	1	76	15	\N	\N	active
447	Dimension Adjustments	241	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	13	8	1	76	16	\N	\N	active
448	Drawings	311	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	8	1	76	17	\N	\N	active
449	Investments	312	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	8	1	76	18	\N	\N	active
450	Distributions	313	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	8	1	76	19	\N	\N	active
453	Opening Balance Offset	316	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	8	1	76	22	\N	\N	active
454	Capital Stock	317	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	8	1	76	23	\N	\N	active
455	Dividends Paid	318	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	8	1	76	24	\N	\N	active
456	Other Charges	411	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	8	1	76	25	\N	\N	active
457	Shipping Charge	412	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	8	1	76	26	\N	\N	active
458	Sales	413	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	8	1	76	27	\N	\N	active
459	General Income	414	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	8	1	76	28	\N	\N	active
460	Interest Income	415	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	8	1	76	29	\N	\N	active
461	Late Fee Income	416	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	8	1	76	30	\N	\N	active
462	Discount	417	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	8	1	76	31	\N	\N	active
463	Contract Assets	533	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	53	\N	\N	active
464	Office Supplies	534	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	54	\N	\N	active
465	Advertising And Marketing	535	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	55	\N	\N	active
466	Purchase Discounts	536	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	56	\N	\N	active
467	Bank Fees and Charges	537	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	57	\N	\N	active
468	Credit Card Charges	538	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	58	\N	\N	active
469	Travel Expense	511	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	32	\N	\N	active
470	Telephone Expense	512	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	33	\N	\N	active
471	Automobile Expense	513	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	34	\N	\N	active
472	IT and Internet Expenses	515	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	35	\N	\N	active
473	Rent Expense	516	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	36	\N	\N	active
474	Janitorial Expense	517	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	37	\N	\N	active
475	Postage	518	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	38	\N	\N	active
476	Bad Debt	519	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	39	\N	\N	active
477	Printing and Stationery	520	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	40	\N	\N	active
478	Salaries and Employee Wages	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	8	1	76	41	\N	\N	active
479	NIP	1	\N	1	2023-09-23 21:31:55.462+05:30	2023-09-23 21:31:55.462+05:30	32	5	19	2	1	2	\N	\N		active
480	Renewed Materials	12	\N	1	2023-09-25 22:27:12.141+05:30	2023-09-25 22:27:12.141+05:30	61	5	20	2	1	2	\N	\N		active
482	ME2	98	\N	2	2023-09-30 17:36:16.945+05:30	2023-09-30 17:36:28.957+05:30	91	1	3	2	1	2	\N	\N		deleted
483	Cost of Goods Sold	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	9	1	77	59	\N	\N	active
484	Labor	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	9	1	77	60	\N	\N	active
485	Materials	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	9	1	77	61	\N	\N	active
486	Subcontractor	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	9	1	77	62	\N	\N	active
481	Top Class	121	\N	2	2023-09-25 23:09:35.95+05:30	2023-09-25 23:09:35.95+05:30	480	5	20	2	1	2	\N	\N		active
487	Job Costing	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	9	1	77	63	\N	\N	active
488	Exchange Gain or Loss	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	21	9	1	77	64	\N	\N	active
489	Employee Advance	111	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	9	1	77	1	\N	\N	active
490	Prepaid Expenses	112	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	9	1	77	2	\N	\N	active
491	TDS Receivable	113	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	9	1	77	3	\N	\N	active
492	Advance Tax	114	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	9	1	77	4	\N	\N	active
493	Undeposited Funds	121	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	9	1	77	5	\N	\N	active
494	Petty Cash	122	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	9	1	77	6	\N	\N	active
495	Furniture and Equipment	141	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	5	9	1	77	7	\N	\N	active
496	Inventory Asset	151	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	7	9	1	77	8	\N	\N	active
497	Employee Reimbursements	211	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	9	1	77	9	\N	\N	active
498	Opening Balance Adjustments	212	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	9	1	77	10	\N	\N	active
499	Unearned Revenue	213	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	9	1	77	11	\N	\N	active
500	TDS Payable	214	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	9	1	77	12	\N	\N	active
501	Tax Payable	215	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	9	1	77	13	\N	\N	active
502	Mortgages	231	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	9	1	77	14	\N	\N	active
503	Meals and Entertainment	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	42	\N	\N	active
504	Depreciation Expense	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	43	\N	\N	active
505	Consultant Expense	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	44	\N	\N	active
506	Repairs and Maintenance	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	45	\N	\N	active
507	Other Expenses	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	46	\N	\N	active
508	Lodging	527	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	47	\N	\N	active
509	Uncategorized	528	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	48	\N	\N	active
510	Raw Materials And Consumables	529	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	49	\N	\N	active
511	Merchandise	530	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	50	\N	\N	active
512	Transportation Expense	531	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	51	\N	\N	active
513	Depreciation And Amortisation	532	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	52	\N	\N	active
514	Construction Loans	232	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	9	1	77	15	\N	\N	active
515	Dimension Adjustments	241	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	13	9	1	77	16	\N	\N	active
516	Drawings	311	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	9	1	77	17	\N	\N	active
517	Investments	312	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	9	1	77	18	\N	\N	active
518	Distributions	313	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	9	1	77	19	\N	\N	active
519	Retained Earnings	314	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	9	1	77	20	\N	\N	active
520	Owner's Equity	315	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	9	1	77	21	\N	\N	active
521	Opening Balance Offset	316	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	9	1	77	22	\N	\N	active
522	Capital Stock	317	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	9	1	77	23	\N	\N	active
523	Dividends Paid	318	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	9	1	77	24	\N	\N	active
524	Other Charges	411	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	9	1	77	25	\N	\N	active
525	Shipping Charge	412	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	9	1	77	26	\N	\N	active
526	Sales	413	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	9	1	77	27	\N	\N	active
527	General Income	414	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	9	1	77	28	\N	\N	active
528	Interest Income	415	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	9	1	77	29	\N	\N	active
529	Late Fee Income	416	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	9	1	77	30	\N	\N	active
530	Discount	417	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	9	1	77	31	\N	\N	active
531	Contract Assets	533	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	53	\N	\N	active
532	Office Supplies	534	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	54	\N	\N	active
533	Advertising And Marketing	535	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	55	\N	\N	active
534	Purchase Discounts	536	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	56	\N	\N	active
535	Bank Fees and Charges	537	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	57	\N	\N	active
536	Credit Card Charges	538	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	58	\N	\N	active
537	Travel Expense	511	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	32	\N	\N	active
538	Telephone Expense	512	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	33	\N	\N	active
539	Automobile Expense	513	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	34	\N	\N	active
540	IT and Internet Expenses	515	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	35	\N	\N	active
541	Rent Expense	516	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	36	\N	\N	active
542	Janitorial Expense	517	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	37	\N	\N	active
543	Postage	518	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	38	\N	\N	active
544	Bad Debt	519	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	39	\N	\N	active
545	Printing and Stationery	520	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	40	\N	\N	active
546	Salaries and Employee Wages	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	9	1	77	41	\N	\N	active
351	Cost of Goods Sold	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	7	1	75	59	\N	\N	active
352	Labor	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	7	1	75	60	\N	\N	active
353	Materials	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	7	1	75	61	\N	\N	active
354	Subcontractor	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	7	1	75	62	\N	\N	active
355	Job Costing	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	20	7	1	75	63	\N	\N	active
356	Exchange Gain or Loss	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	21	7	1	75	64	\N	\N	active
357	Employee Advance	111	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	7	1	75	1	\N	\N	active
358	Prepaid Expenses	112	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	7	1	75	2	\N	\N	active
359	TDS Receivable	113	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	7	1	75	3	\N	\N	active
360	Advance Tax	114	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	2	7	1	75	4	\N	\N	active
361	Undeposited Funds	121	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	7	1	75	5	\N	\N	active
362	Petty Cash	122	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	3	7	1	75	6	\N	\N	active
363	Furniture and Equipment	141	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	5	7	1	75	7	\N	\N	active
364	Inventory Asset	151	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	1	7	7	1	75	8	\N	\N	active
365	Employee Reimbursements	211	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	7	1	75	9	\N	\N	active
366	Opening Balance Adjustments	212	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	7	1	75	10	\N	\N	active
367	Unearned Revenue	213	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	7	1	75	11	\N	\N	active
368	TDS Payable	214	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	7	1	75	12	\N	\N	active
369	Tax Payable	215	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	10	7	1	75	13	\N	\N	active
370	Mortgages	231	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	7	1	75	14	\N	\N	active
371	Meals and Entertainment	522	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	42	\N	\N	active
372	Depreciation Expense	523	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	43	\N	\N	active
373	Consultant Expense	524	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	44	\N	\N	active
374	Repairs and Maintenance	525	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	45	\N	\N	active
375	Other Expenses	526	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	46	\N	\N	active
376	Lodging	527	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	47	\N	\N	active
377	Uncategorized	528	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	48	\N	\N	active
378	Raw Materials And Consumables	529	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	49	\N	\N	active
379	Merchandise	530	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	50	\N	\N	active
380	Transportation Expense	531	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	51	\N	\N	active
381	Depreciation And Amortisation	532	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	52	\N	\N	active
382	Construction Loans	232	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	12	7	1	75	15	\N	\N	active
383	Dimension Adjustments	241	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	2	13	7	1	75	16	\N	\N	active
384	Drawings	311	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	7	1	75	17	\N	\N	active
385	Investments	312	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	7	1	75	18	\N	\N	active
386	Distributions	313	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	7	1	75	19	\N	\N	active
387	Retained Earnings	314	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	7	1	75	20	\N	\N	active
388	Owner's Equity	315	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	7	1	75	21	\N	\N	active
389	Opening Balance Offset	316	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	7	1	75	22	\N	\N	active
390	Capital Stock	317	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	7	1	75	23	\N	\N	active
391	Dividends Paid	318	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	3	16	7	1	75	24	\N	\N	active
392	Other Charges	411	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	7	1	75	25	\N	\N	active
393	Shipping Charge	412	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	7	1	75	26	\N	\N	active
394	Sales	413	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	7	1	75	27	\N	\N	active
395	General Income	414	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	7	1	75	28	\N	\N	active
396	Interest Income	415	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	7	1	75	29	\N	\N	active
397	Late Fee Income	416	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	7	1	75	30	\N	\N	active
398	Discount	417	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	4	17	7	1	75	31	\N	\N	active
399	Contract Assets	533	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	53	\N	\N	active
400	Office Supplies	534	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	54	\N	\N	active
401	Advertising And Marketing	535	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	55	\N	\N	active
402	Purchase Discounts	536	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	56	\N	\N	active
403	Bank Fees and Charges	537	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	57	\N	\N	active
404	Credit Card Charges	538	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	58	\N	\N	active
405	Travel Expense	511	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	32	\N	\N	active
406	Telephone Expense	512	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	33	\N	\N	active
407	Automobile Expense	513	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	34	\N	\N	active
408	IT and Internet Expenses	515	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	35	\N	\N	active
409	Rent Expense	516	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	36	\N	\N	active
410	Janitorial Expense	517	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	37	\N	\N	active
411	Postage	518	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	38	\N	\N	active
412	Bad Debt	519	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	39	\N	\N	active
413	Printing and Stationery	520	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	40	\N	\N	active
414	Salaries and Employee Wages	521	\N	0	2023-09-14 00:26:07.848+05:30	2023-09-14 00:26:07.848+05:30	\N	5	19	7	1	75	41	\N	\N	active
868	Cost of Goods Sold	521	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	20	16	1	104	59	\N	\N	active
869	Labor	522	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	20	16	1	104	60	\N	\N	active
870	Materials	523	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	20	16	1	104	61	\N	\N	active
871	Subcontractor	524	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	20	16	1	104	62	\N	\N	active
872	Job Costing	525	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	20	16	1	104	63	\N	\N	active
873	Exchange Gain or Loss	526	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	21	16	1	104	64	\N	\N	active
874	Employee Advance	111	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	1	2	16	1	104	1	\N	\N	active
875	Prepaid Expenses	112	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	1	2	16	1	104	2	\N	\N	active
876	TDS Receivable	113	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	1	2	16	1	104	3	\N	\N	active
877	Advance Tax	114	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	1	2	16	1	104	4	\N	\N	active
878	Undeposited Funds	121	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	1	3	16	1	104	5	\N	\N	active
879	Petty Cash	122	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	1	3	16	1	104	6	\N	\N	active
880	Furniture and Equipment	141	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	1	5	16	1	104	7	\N	\N	active
881	Inventory Asset	151	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	1	7	16	1	104	8	\N	\N	active
882	Employee Reimbursements	211	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	2	10	16	1	104	9	\N	\N	active
883	Opening Balance Adjustments	212	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	2	10	16	1	104	10	\N	\N	active
884	Unearned Revenue	213	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	2	10	16	1	104	11	\N	\N	active
885	TDS Payable	214	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	2	10	16	1	104	12	\N	\N	active
886	Tax Payable	215	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	2	10	16	1	104	13	\N	\N	active
887	Mortgages	231	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	2	12	16	1	104	14	\N	\N	active
888	Meals and Entertainment	522	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	42	\N	\N	active
889	Depreciation Expense	523	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	43	\N	\N	active
890	Consultant Expense	524	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	44	\N	\N	active
891	Repairs and Maintenance	525	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	45	\N	\N	active
892	Other Expenses	526	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	46	\N	\N	active
893	Lodging	527	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	47	\N	\N	active
894	Uncategorized	528	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	48	\N	\N	active
895	Raw Materials And Consumables	529	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	49	\N	\N	active
896	Merchandise	530	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	50	\N	\N	active
897	Transportation Expense	531	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	51	\N	\N	active
898	Depreciation And Amortisation	532	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	52	\N	\N	active
899	Construction Loans	232	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	2	12	16	1	104	15	\N	\N	active
900	Dimension Adjustments	241	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	2	13	16	1	104	16	\N	\N	active
901	Drawings	311	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	3	16	16	1	104	17	\N	\N	active
902	Investments	312	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	3	16	16	1	104	18	\N	\N	active
903	Distributions	313	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	3	16	16	1	104	19	\N	\N	active
904	Retained Earnings	314	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	3	16	16	1	104	20	\N	\N	active
905	Owner's Equity	315	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	3	16	16	1	104	21	\N	\N	active
906	Opening Balance Offset	316	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	3	16	16	1	104	22	\N	\N	active
907	Capital Stock	317	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	3	16	16	1	104	23	\N	\N	active
908	Dividends Paid	318	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	3	16	16	1	104	24	\N	\N	active
909	Other Charges	411	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	4	17	16	1	104	25	\N	\N	active
910	Shipping Charge	412	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	4	17	16	1	104	26	\N	\N	active
911	Sales	413	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	4	17	16	1	104	27	\N	\N	active
912	General Income	414	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	4	17	16	1	104	28	\N	\N	active
913	Interest Income	415	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	4	17	16	1	104	29	\N	\N	active
914	Late Fee Income	416	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	4	17	16	1	104	30	\N	\N	active
915	Discount	417	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	4	17	16	1	104	31	\N	\N	active
916	Contract Assets	533	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	53	\N	\N	active
917	Office Supplies	534	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	54	\N	\N	active
918	Advertising And Marketing	535	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	55	\N	\N	active
919	Purchase Discounts	536	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	56	\N	\N	active
920	Bank Fees and Charges	537	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	57	\N	\N	active
921	Credit Card Charges	538	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	58	\N	\N	active
922	Travel Expense	511	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	32	\N	\N	active
923	Telephone Expense	512	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	33	\N	\N	active
924	Automobile Expense	513	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	34	\N	\N	active
925	IT and Internet Expenses	515	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	35	\N	\N	active
926	Rent Expense	516	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	36	\N	\N	active
927	Janitorial Expense	517	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	37	\N	\N	active
928	Postage	518	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	38	\N	\N	active
929	Bad Debt	519	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	39	\N	\N	active
930	Printing and Stationery	520	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	40	\N	\N	active
931	Salaries and Employee Wages	521	\N	0	2023-10-08 21:10:06.926+05:30	2023-10-08 21:10:06.926+05:30	\N	5	19	16	1	104	41	\N	\N	active
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

COPY public."Contacts" (id, contact_name, contact_type, created_at, updated_at, organization_id, status,
                        created_by) FROM stdin;
1	Sayan	customer	2023-10-04 22:01:18.252+05:30	2023-10-04 22:01:20.512+05:30	2	active	1
2	Tamal	customer	2023-10-04 22:01:44.603+05:30	2023-10-04 22:01:45.43+05:30	2	active	1
\.


--
-- Data for Name: GeneralPreferences; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."GeneralPreferences" (id, sales_tax_type, tax_rounding_type, discount_type, is_discount_before_tax,
                                  created_at, updated_at, organization_id) FROM stdin;
1	entity_level	item_level	no_discount	t	2023-10-04 16:15:06.189+05:30	2023-10-04 16:15:06.189+05:30	2
3	entity_level	item_level	no_discount	t	2023-10-08 21:10:06.962+05:30	2023-10-08 21:10:06.962+05:30	104
\.


--
-- Data for Name: InvoiceLineItems; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."InvoiceLineItems" (id, name, description, unit, status, organization_id, invoice_id, item_id, account_id,
                                tax_id, unit_id, rate, quantity, discount_percentage, discount_amount, tax_percentage,
                                tax_amount, item_total, item_total_tax_included, created_at, updated_at) FROM stdin;
1	Paper Boat	\N	KG	active	2	1	1	1	1	1	100	1	0	0	10	10	100	110	2023-10-08 22:54:54.763+05:30	2023-10-08 22:54:54.763+05:30
2	Paper Boat	\N	KG	active	2	3	1	1	1	1	100	1	0	0	10	10	100	110	2023-10-08 22:55:23.196+05:30	2023-10-08 22:55:23.196+05:30
4	Paper Boat	\N	KG	active	2	9	1	1	1	1	100	1	0	0	10	0.1	1	1.1	2023-10-12 00:15:49.706+05:30	2023-10-12 00:15:49.706+05:30
5	Paper Boat	\N	KG	active	2	11	1	1	1	1	100	1	0	0	10	10	100	110	2023-10-12 00:18:08.253+05:30	2023-10-12 00:18:08.253+05:30
6	Paper Boat	\N	KG	active	2	13	1	1	1	1	100	1	0	0	10	10	100	110	2023-10-15 18:30:54.501+05:30	2023-10-15 18:30:54.501+05:30
8	Paper Boat	\N	KG	active	2	16	1	1	1	1	100	1	10	10	10	9	90	99	2023-10-15 18:34:57.349+05:30	2023-10-15 18:34:57.349+05:30
9	Paper Boat	\N	KG	active	2	17	1	1	1	1	400	1	10	40	10	36	360	396	2023-10-15 18:56:38.953+05:30	2023-10-15 18:56:38.953+05:30
10	Paper Boat	\N	KG	active	2	18	1	1	1	1	400	1	10	40	10	36	360	396	2023-10-15 18:59:50.956+05:30	2023-10-15 18:59:50.956+05:30
11	Paper Boat	\N	KG	active	2	19	1	1	1	1	400	1	10	40	10	36	360	396	2023-10-15 19:04:45.106+05:30	2023-10-15 19:04:45.106+05:30
12	Paper Boat	\N	KG	active	2	21	1	1	1	1	400	1	10	40	10	36	360	396	2023-10-15 19:08:33.549+05:30	2023-10-15 19:08:33.549+05:30
14	Paper Boat	\N	KG	active	2	24	1	1	1	1	400	1	10	40	0	0	360	360	2023-10-15 19:53:02.677+05:30	2023-10-15 19:53:02.677+05:30
15	Paper Boat	\N	KG	active	2	25	1	1	1	1	400	1	10	40	0	0	360	360	2023-10-15 19:53:36.735+05:30	2023-10-15 19:53:36.735+05:30
16	Paper Boat	\N	KG	active	2	26	1	1	1	1	400	1	0	0	10	36.36	363.64	400	2023-10-15 19:54:39.596+05:30	2023-10-15 19:54:39.596+05:30
17	Paper Boat	\N	KG	active	2	27	1	1	1	1	400	1	0	0	10	36.36	363.64	400	2023-10-15 19:56:43.106+05:30	2023-10-15 19:56:43.106+05:30
18	Paper Boat	\N	KG	active	2	28	1	1	1	1	400	1	0	0	10	36.36	363.64	400	2023-10-15 20:18:08.849+05:30	2023-10-15 20:18:08.849+05:30
19	Paper Boat	\N	KG	active	2	29	1	1	1	1	400	1	10	34.78	15	46.96	313.05	360.01	2023-10-15 20:18:32.733+05:30	2023-10-15 20:18:32.733+05:30
20	Paper Boat	\N	KG	active	2	30	1	1	1	1	400	1	9	31.3	15	47.48	316.53	364.01	2023-10-15 20:20:22.524+05:30	2023-10-15 20:20:22.524+05:30
21	Paper Boat	\N	KG	active	2	32	1	1	1	1	400	1	0	0	15	52.17	347.83	400	2023-10-15 20:20:39.589+05:30	2023-10-15 20:20:39.589+05:30
22	Paper Boat	\N	KG	active	2	33	1	1	1	1	400	1	10	34.78	15	46.96	313.05	360.01	2023-10-15 20:21:53.127+05:30	2023-10-15 20:21:53.127+05:30
23	Paper Boat	\N	KG	active	2	34	1	1	1	1	400	1	10	34.78	15	46.96	313.05	360.01	2023-10-20 22:01:11.021+05:30	2023-10-20 22:01:11.021+05:30
7	Paper Boat	\N	KG	active	2	15	1	1	1	1	400	2	10	80	10	72	720	792	2023-10-15 18:32:55.501+05:30	2023-10-15 18:32:55.501+05:30
36	Paper Boat	\N	KG	active	2	23	1	1	1	1	400	3	10	120	10	108	1080	1188	2023-10-21 16:40:15.238+05:30	2023-10-21 16:40:15.238+05:30
37	Paper Boat	\N	KG	active	2	37	1	1	1	1	400	1	10	34.78	15	46.96	313.05	360.01	2023-10-21 16:44:45.051+05:30	2023-10-21 16:44:45.051+05:30
38	Log Boat	\N	KG	active	2	37	1	1	1	1	500	1	10	43.48	15	58.7	391.3	450	2023-10-21 16:44:45.051+05:30	2023-10-21 16:44:45.051+05:30
39	Paper Boat	\N	KG	active	2	38	1	1	1	1	400	1	0	0	15	52.17	347.83	400	2023-10-21 16:46:36.637+05:30	2023-10-21 16:46:36.637+05:30
40	Log Boat	\N	KG	active	2	38	1	1	1	1	500	10	0	0	15	652.17	4347.83	5000	2023-10-21 16:46:36.637+05:30	2023-10-21 16:46:36.637+05:30
42	oppp Boat	\N	KG	active	2	38	1	1	1	1	500	10	0	0	15	652.17	4347.83	5000	2023-10-21 17:07:33.939+05:30	2023-10-21 17:07:33.939+05:30
\.


--
-- Data for Name: Invoices; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."Invoices" (id, contact_id, invoice_number, reference_number, order_number, terms, notes, is_inclusive_tax,
                        status, organization_id, created_by, discount_total, tax_total, sub_total, total, created_at,
                        updated_at) FROM stdin;
1	1	1	\N	\N	\N	\N	f	active	2	1	0	10	100	110	2023-10-08 22:54:54.755+05:30	2023-10-08 22:54:54.755+05:30
3	1	2	\N	\N	\N	\N	f	active	2	1	0	10	100	110	2023-10-08 22:55:23.192+05:30	2023-10-08 22:55:23.192+05:30
9	2	3	\N	\N	\N	\N	f	active	2	1	0	0.1	1	1.1	2023-10-12 00:15:49.699+05:30	2023-10-12 00:15:49.699+05:30
11	2	4	\N	\N	\N	\N	f	active	2	1	0	10	100	110	2023-10-12 00:18:08.24+05:30	2023-10-12 00:18:08.24+05:30
13	2	5	\N	\N	\N	\N	f	active	2	1	0	10	100	110	2023-10-15 18:30:54.493+05:30	2023-10-15 18:30:54.493+05:30
15	2	6	\N	\N	\N	\N	f	active	2	1	0	9	90	99	2023-10-15 18:32:55.492+05:30	2023-10-15 18:32:55.492+05:30
16	2	7	\N	\N	\N	\N	f	active	2	1	10	9	90	99	2023-10-15 18:34:57.342+05:30	2023-10-15 18:34:57.342+05:30
17	2	8	\N	\N			f	active	2	1	40	36	360	400	2023-10-15 18:56:38.945+05:30	2023-10-15 18:56:38.945+05:30
18	2	9	\N	\N			f	active	2	1	40	36	360	400	2023-10-15 18:59:50.952+05:30	2023-10-15 18:59:50.952+05:30
19	2	10	\N	\N			f	active	2	1	40	36	360	400	2023-10-15 19:04:45.083+05:30	2023-10-15 19:04:45.083+05:30
21	2	11	\N	\N			f	active	2	1	40	36	360	396	2023-10-15 19:08:33.542+05:30	2023-10-15 19:08:33.542+05:30
24	2	13	\N	\N			f	active	2	1	40	0	360	360	2023-10-15 19:53:02.673+05:30	2023-10-15 19:53:02.673+05:30
25	2	14	\N	\N			t	active	2	1	40	0	360	360	2023-10-15 19:53:36.73+05:30	2023-10-15 19:53:36.73+05:30
26	2	15	\N	\N			t	active	2	1	0	36.36	363.64	400	2023-10-15 19:54:39.588+05:30	2023-10-15 19:54:39.588+05:30
27	2	16	\N	\N			t	active	2	1	0	36.36	363.64	400	2023-10-15 19:56:43.1+05:30	2023-10-15 19:56:43.1+05:30
28	2	17	\N	\N			t	active	2	1	0	36.36	363.64	400	2023-10-15 20:18:08.842+05:30	2023-10-15 20:18:08.842+05:30
29	2	18	\N	\N			t	active	2	1	34.78	46.96	313.05	360.01	2023-10-15 20:18:32.729+05:30	2023-10-15 20:18:32.729+05:30
30	2	19	\N	\N			t	active	2	1	31.3	47.48	316.53	364.01	2023-10-15 20:20:22.52+05:30	2023-10-15 20:20:22.52+05:30
32	2	20	\N	\N			t	active	2	1	0	52.17	347.83	400	2023-10-15 20:20:39.584+05:30	2023-10-15 20:20:39.584+05:30
33	2	21	\N	\N			t	active	2	1	34.78	46.96	313.05	360.01	2023-10-15 20:21:53.12+05:30	2023-10-15 20:21:53.12+05:30
34	2	22	\N	\N	\N	\N	t	active	2	1	34.78	46.96	313.05	360.01	2023-10-20 22:01:11.009+05:30	2023-10-20 22:01:11.009+05:30
23	2	12	\N	\N			f	active	2	1	120	108	1080	1188	2023-10-15 19:51:41.545+05:30	2023-10-21 16:40:15.249+05:30
37	2	24	\N	\N	\N	\N	t	active	2	1	78.26	105.66	704.35	810.01	2023-10-21 16:44:45.048+05:30	2023-10-21 16:44:45.048+05:30
38	2	25	\N	\N	\N	\N	t	active	2	1	0	1356.51	9043.49	10400	2023-10-21 16:46:36.632+05:30	2023-10-21 17:07:33.941+05:30
\.


--
-- Data for Name: ItemPreferences; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."ItemPreferences" (id, quantity_precision, is_item_name_duplication_enabled, created_at, updated_at,
                               organization_id) FROM stdin;
1	2	t	2023-09-20 23:48:47.292+05:30	2023-09-20 23:48:47.292+05:30	2
2	2	t	2023-09-20 23:51:22.912+05:30	2023-09-20 23:51:22.912+05:30	72
5	2	t	2023-09-21 22:31:54.223+05:30	2023-09-21 22:31:54.223+05:30	75
6	2	t	2023-09-23 13:55:12.812+05:30	2023-09-23 13:55:12.812+05:30	76
7	2	t	2023-10-04 16:15:06.186+05:30	2023-10-04 16:15:06.186+05:30	77
11	2	t	2023-10-08 21:10:06.96+05:30	2023-10-08 21:10:06.96+05:30	104
\.


--
-- Data for Name: ItemUnits; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."ItemUnits" (id, name, unit, status, created_at, updated_at, created_by, organization_id) FROM stdin;
1	Kilogram	kg	active	2023-10-06 04:34:22.772+05:30	2023-10-06 04:34:23.492+05:30	1	2
2	\N	Units	active	2023-10-05 23:05:56.056+05:30	2023-10-05 23:05:56.056+05:30	1	2
3	\N	Dozon	active	2023-10-05 23:31:34.028+05:30	2023-10-05 23:31:34.028+05:30	1	2
4	\N	TML	active	2023-10-08 12:33:02.352+05:30	2023-10-08 12:33:02.352+05:30	1	2
14	BOX	box	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
15	Centimeter	cm	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
16	Meter	m	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
17	Feet	ft	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
18	Gram	g	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
19	Kilogram	kg	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
20	Other	oth	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
21	Pieces	pcs	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
22	Dozen	dz	active	2023-10-08 21:10:06.964+05:30	2023-10-08 21:10:06.964+05:30	1	104
\.


--
-- Data for Name: OrganizationBasics; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."OrganizationBasics" (id, name, primary_address, country_code, sector, currency_code, status, created_at,
                                  updated_at, created_by) FROM stdin;
1	Reducer	Goa, India	IN	Others	INR	active	2023-08-26 00:09:34.016+05:30	2023-08-26 00:09:34.016+05:30	1
3	DEN	Kolkata, India	IN	Others	INR	active	2023-09-14 00:12:34.35+05:30	2023-09-14 00:12:34.35+05:30	1
4	EPaper	Goa, India	IN	Others	INR	active	2023-08-26 14:21:45.101+05:30	2023-08-26 14:21:45.101+05:30	1
5	DEN	Kolkata, India	IN	Others	INR	active	2023-09-14 00:17:16.073+05:30	2023-09-14 00:17:16.073+05:30	1
2	DEN	Kolkata, India	IN	Others	INR	active	2023-09-14 00:26:45.497+05:30	2023-09-14 00:26:45.497+05:30	1
71	DEN	Kolkata, India	IN	Others	INR	active	2023-09-20 23:48:47.223+05:30	2023-09-20 23:48:47.223+05:30	1
72	DEN	Kolkata, India	IN	Others	INR	active	2023-09-20 23:51:22.855+05:30	2023-09-20 23:51:22.855+05:30	1
75	DEN	Kolkata, India	IN	Others	INR	active	2023-09-21 22:31:54.17+05:30	2023-09-21 22:31:54.17+05:30	1
76	DEN	Kolkata, India	IN	Others	INR	active	2023-09-23 13:55:12.741+05:30	2023-09-23 13:55:12.741+05:30	1
77	MON	Kolkata, India	IN	Others	INR	active	2023-10-04 16:15:06.121+05:30	2023-10-04 16:15:06.121+05:30	1
104	COM	Kolkata, India	IN	Others	INR	active	2023-10-08 21:10:06.91+05:30	2023-10-08 21:10:06.91+05:30	1
\.


--
-- Data for Name: OrganizationsUsers; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."OrganizationsUsers" (id, job_status, status, role_id, invited_by, invited_on, accepted_on,
                                  is_default_organization, created_at, updated_at, user_id, organization_id) FROM stdin;
68	working	active	admin	\N	\N	\N	\N	2023-09-14 00:12:34.354+05:30	2023-09-14 00:12:34.354+05:30	1	68
69	working	active	admin	\N	\N	\N	\N	2023-09-14 00:17:16.08+05:30	2023-09-14 00:17:16.08+05:30	1	69
70	working	active	admin	\N	\N	\N	\N	2023-09-14 00:26:45.508+05:30	2023-09-14 00:26:45.508+05:30	1	70
71	working	active	admin	\N	\N	\N	\N	2023-09-20 23:48:47.237+05:30	2023-09-20 23:48:47.237+05:30	1	71
72	working	active	admin	\N	\N	\N	\N	2023-09-20 23:51:22.865+05:30	2023-09-20 23:51:22.865+05:30	1	72
75	working	active	admin	\N	\N	\N	\N	2023-09-21 22:31:54.177+05:30	2023-09-21 22:31:54.177+05:30	1	75
76	working	active	admin	\N	\N	\N	\N	2023-09-23 13:55:12.757+05:30	2023-09-23 13:55:12.757+05:30	1	76
77	working	active	admin	\N	\N	\N	\N	2023-10-04 16:15:06.133+05:30	2023-10-04 16:15:06.133+05:30	1	77
99	working	active	admin	\N	\N	\N	f	2023-10-08 21:10:06.916+05:30	2023-10-08 21:10:06.916+05:30	1	104
1	working	active	admin	\N	\N	\N	\N	2023-08-26 00:09:34.021+05:30	2023-08-26 00:09:34.021+05:30	1	1
65	working	active	admin	\N	\N	\N	t	2023-08-26 14:21:45.113+05:30	2023-08-26 14:21:45.113+05:30	1	2
\.


--
-- Data for Name: RegularItems; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."RegularItems" (id, name, product_type, selling_price, selling_description, purchase_price,
                            purchase_description, item_for, status, created_at, updated_at, created_by, organization_id,
                            sales_account_id, purchase_account_id, tax_id, unit_id) FROM stdin;
2	Dark Chocolate	goods	990.5		0		sales	active	2023-10-05 23:05:56.064+05:30	2023-10-05 23:31:34.036+05:30	1	2	27	\N	1	3
3	Dark Chocolate	goods	233		0		sales	active	2023-10-06 23:37:05.578+05:30	2023-10-06 23:37:05.578+05:30	1	2	25	\N	1	3
4	Ball	goods	678		900		sales_and_purchase	active	2023-10-06 23:38:52.887+05:30	2023-10-06 23:44:32.336+05:30	1	2	28	481	2	2
1	Paper Boat	goods	500		0		sales	active	2023-10-05 22:15:05.359+05:30	2023-10-05 23:24:20.668+05:30	1	2	25	\N	2	1
6	Gumshoo	goods	123		0		sales	active	2023-10-08 12:24:49.114+05:30	2023-10-08 12:33:02.359+05:30	1	2	26	\N	1	4
\.


--
-- Data for Name: TaxRates; Type: TABLE DATA; Schema: public; Owner: surojit
--

COPY public."TaxRates" (id, name, description, rate, country_code, tax_type, status, created_at, updated_at, created_by,
                        organization_id, is_editable, is_deletable) FROM stdin;
2	GST28	GST Of 28%	28	IN	direct_tax	active	2023-09-22 03:36:52.723+05:30	2023-09-22 03:36:54.745+05:30	1	2	f	f
6	GST28	GST Of 28%	28	IN	direct_tax	active	2023-09-23 13:55:12.818+05:30	2023-09-23 13:55:12.818+05:30	1	76	f	f
7	GST18	GST Of 18%	18	IN	direct_tax	active	2023-09-23 13:55:12.818+05:30	2023-09-23 13:55:12.818+05:30	1	76	f	f
8	GST12	GST Of 12%	12	IN	direct_tax	active	2023-09-23 13:55:12.818+05:30	2023-09-23 13:55:12.818+05:30	1	76	f	f
9	GST05	GST Of 5%	5	IN	direct_tax	active	2023-09-23 13:55:12.818+05:30	2023-09-23 13:55:12.818+05:30	1	76	f	f
10	GST28	GST Of 28%	28	IN	direct_tax	active	2023-10-04 16:15:06.196+05:30	2023-10-04 16:15:06.196+05:30	1	77	f	f
11	GST18	GST Of 18%	18	IN	direct_tax	active	2023-10-04 16:15:06.196+05:30	2023-10-04 16:15:06.196+05:30	1	77	f	f
12	GST12	GST Of 12%	12	IN	direct_tax	active	2023-10-04 16:15:06.196+05:30	2023-10-04 16:15:06.196+05:30	1	77	f	f
13	GST05	GST Of 5%	5	IN	direct_tax	active	2023-10-04 16:15:06.196+05:30	2023-10-04 16:15:06.196+05:30	1	77	f	f
1	GST10	GST Of 18%	10	IN	direct_tax	active	2023-09-21 22:31:54.226+05:30	2023-09-21 22:31:54.226+05:30	1	2	f	f
15	GST28	GST Of 28%	28	IN	direct_tax	active	2023-10-08 21:10:06.966+05:30	2023-10-08 21:10:06.966+05:30	1	104	f	f
16	GST18	GST Of 18%	18	IN	direct_tax	active	2023-10-08 21:10:06.966+05:30	2023-10-08 21:10:06.966+05:30	1	104	f	f
17	GST12	GST Of 12%	12	IN	direct_tax	active	2023-10-08 21:10:06.966+05:30	2023-10-08 21:10:06.966+05:30	1	104	f	f
18	GST05	GST Of 5%	5	IN	direct_tax	active	2023-10-08 21:10:06.966+05:30	2023-10-08 21:10:06.966+05:30	1	104	f	f
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

SELECT pg_catalog.setval('public."AccountTemplateDetails_id_seq"', 16, true);


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

SELECT pg_catalog.setval('public."AccountsOfOrganizations_id_seq"', 932, true);


--
-- Name: AccountsOfTemplates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."AccountsOfTemplates_id_seq"', 64, true);


--
-- Name: Contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Contacts_id_seq"', 2, true);


--
-- Name: GeneralPreferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."GeneralPreferences_id_seq"', 3, true);


--
-- Name: InvoiceLineItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."InvoiceLineItems_id_seq"', 42, true);


--
-- Name: Invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."Invoices_id_seq"', 38, true);


--
-- Name: ItemPreferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."ItemPreferences_id_seq"', 11, true);


--
-- Name: ItemUnits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."ItemUnits_id_seq"', 22, true);


--
-- Name: OrganizationBasics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."OrganizationBasics_id_seq"', 104, true);


--
-- Name: OrganizationsUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."OrganizationsUsers_id_seq"', 99, true);


--
-- Name: RegularItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."RegularItems_id_seq"', 6, true);


--
-- Name: TaxRates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: surojit
--

SELECT pg_catalog.setval('public."TaxRates_id_seq"', 18, true);


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
-- Name: AccountTemplateDetails account_template_details_is_default_unique; Type: CONSTRAINT; Schema: public; Owner: surojit
--

ALTER TABLE ONLY public."AccountTemplateDetails"
    ADD CONSTRAINT account_template_details_is_default_unique UNIQUE (is_default);


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

