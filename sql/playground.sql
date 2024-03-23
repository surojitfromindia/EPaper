-- group those invoice by invoice_id where status= 'active'
select invoice_id, sum("InvoicePayments".applied_amount) as from_payment
from "InvoicePayments"
where "InvoicePayments".status = 'active'
group by invoice_id
