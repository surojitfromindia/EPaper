
with recursive sub_accounts as (
    -- non recursive part
    select a1.name,
           a1.code,
           a1.parent_code,
           a1.id as id,
           a1.account_parent_id,
           0     as depth,
           a1.account_group_id,
           a1.account_type_id,
           a1.account_type
    from "AccountsOfTemplates" as a1
    where a1.parent_code IS NULL
      and account_template_id = 1
    union
    select a2.name,
           a2.code,
           a2.parent_code,
           a2.id,
           sb.id,
           (sb.depth + 1)                                                   as depth,
           (case when sb.depth = 0 then sb.id else sb.account_group_id end) as account_group_id,
           (case when sb.depth > 0 then sb.id else sb.account_type_id end)  as account_type_id,
           a2.account_type
    from "AccountsOfTemplates" as a2,
         sub_accounts sb
    where sb.code = a2.parent_code
      and account_template_id = 1)
select *
from sub_accounts;

select *
from "AccountsOfTemplates"
where account_template_id = 1;

SELECT "User".*,
       "AllOrganizations"."id"                                  AS "AllOrganizations.id",
       "AllOrganizations"."name"                                AS "AllOrganizations.name",
       "AllOrganizations"."primary_address"                     AS "AllOrganizations.primaryAddress",
       "AllOrganizations"."country_code"                        AS "AllOrganizations.countryCode",
       "AllOrganizations"."currency_code"                       AS "AllOrganizations.currencyCode",
       "AllOrganizations"."status"                              AS "AllOrganizations.status",
       "AllOrganizations"."createdAt"                           AS "AllOrganizations.createdAt",
       "AllOrganizations"."updatedAt"                           AS "AllOrganizations.updatedAt",
       "AllOrganizations"."user_id"                             AS "AllOrganizations.userId",
       "AllOrganizations->OrganizationsUsers"."id"              AS "AllOrganizations.OrganizationsUsers.id",
       "AllOrganizations->OrganizationsUsers"."job_status"      AS "AllOrganizations.OrganizationsUsers.jobStatus",
       "AllOrganizations->OrganizationsUsers"."status"          AS "AllOrganizations.OrganizationsUsers.status",
       "AllOrganizations->OrganizationsUsers"."createdAt"       AS "AllOrganizations.OrganizationsUsers.createdAt",
       "AllOrganizations->OrganizationsUsers"."updatedAt"       AS "AllOrganizations.OrganizationsUsers.updatedAt",
       "AllOrganizations->OrganizationsUsers"."user_id"         AS "AllOrganizations.OrganizationsUsers.userId",
       "AllOrganizations->OrganizationsUsers"."organization_id" AS "AllOrganizations.OrganizationsUsers.organizationId"
FROM (SELECT "User"."id",
             "User"."first_name"  AS "firstName",
             "User"."last_name"   AS "lastName",
             "User"."middle_name" AS "middleName",
             "User"."email",
             "User"."status",
             "User"."createdAt",
             "User"."updatedAt"
      FROM "Users" AS "User"
      WHERE "User"."id" = 1
      LIMIT 1) AS "User"
         LEFT OUTER JOIN ("OrganizationsUsers" AS "AllOrganizations->OrganizationsUsers" INNER JOIN "OrganizationBasics" AS "AllOrganizations"
                          ON "AllOrganizations"."id" = "AllOrganizations->OrganizationsUsers"."organization_id")
                         ON "User"."id" = "AllOrganizations->OrganizationsUsers"."user_id"