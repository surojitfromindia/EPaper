import { AutoCompleteFactory } from "../../Services/AutoCompleteService";
import { Request } from "express";
import {
  AUTO_COMPLETE_LIMIT,
  AUTO_COMPLETE_OFFSET,
} from "../../Constants/AutoComplete.Constant";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";

const fetchContacts = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const organizationId = clientInfo.organizationId;
  const searchText: string = req.query.search_text?.toString() ?? "";
  const contactType = req.query.contact_type;
  const contactsAuthCompleteService = new AutoCompleteFactory({
    organization_id: organizationId,
    limit: AUTO_COMPLETE_LIMIT,
    offset: AUTO_COMPLETE_OFFSET,
  })
    .forContact()
    .setSearchText(searchText)
    .setSearchOption({ contactType: contactType });
  await contactsAuthCompleteService.next();
  const contacts = contactsAuthCompleteService.consume();
  return { results: contacts };
};

const getContactAutoCompleteController = SuccessErrorWrapper(
  fetchContacts,
  "done",
  200,
);

export { getContactAutoCompleteController };
