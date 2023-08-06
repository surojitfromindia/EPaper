select *
from accounts;

-- a union all
select a1.title, a1.code
from accounts as a1
where a1.code = 1
union all
select a2.title, a2.code
from accounts as a2
where a2.code > 11;

with recursive sub_accounts as (
    -- non recursive part
    select a1.title, a1.code, a1.parent_code, a1.id as id, a1.parent_id
    from accounts as a1
    where a1.parent_code IS NULL
    union all
    select a2.title, a2.code, a2.parent_code, a2.id, sb.id
    from accounts as a2,
         sub_accounts sb
    where sb.code = a2.parent_code)
select *
from sub_accounts;
-- update accounts ac set parent_id = sub_accounts.parent_id from sub_accounts  where ac.id = sub_accounts.id ;


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