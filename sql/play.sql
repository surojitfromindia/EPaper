
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
      and account_template_id = 31
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
      and account_template_id = 31)
select *
from sub_accounts;

select *
from "AccountsOfTemplates"
where account_template_id = 1;