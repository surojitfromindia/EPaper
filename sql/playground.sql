-- group those invoice by invoice_id where status= 'active'
select invoice_id, sum("InvoicePayments".applied_amount) as from_payment
from "InvoicePayments"
where "InvoicePayments".status = 'active'
group by invoice_id for update;


WITH "ActiveInvoicePayments" AS (SELECT invoice_id, "InvoicePayments".applied_amount
                                 FROM "InvoicePayments"
                                 WHERE "InvoicePayments".status = 'active'
                                     for update)
SELECT invoice_id, sum(applied_amount) as from_payment
FROM "ActiveInvoicePayments"
GROUP BY invoice_id;