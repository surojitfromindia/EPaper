1. create payments modes
2. only allow a bank, cash, other current liability as a deposit account
3. only allow bank charges if a deposit account is a bank account.

4. fields
   amount - that has been given by the customer
   account_id—deposit to account
   payment mode—as string (cause unique for each payment mode)
   bank_charges - stored separately.
   exchange_rate
   contact_id

5. split amount_to "unearned_revenue" if used in a multiple account
6. bank charges debit/credit -> deposit to account / bank fees and charges.

