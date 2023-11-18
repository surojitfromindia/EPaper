import { AutoCompleteFactory } from "../../Services/AutoCompleteFactory";
import { Request } from "express";
import {
  AUTO_COMPLETE_LIMIT,
  AUTO_COMPLETE_START_PAGE,
} from "../../Constants/AutoComplete.Constant";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { ContactDTO } from "../../DTO";

const fetchContacts = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const organizationId = clientInfo.organizationId;
  const searchText: string = req.query.search_text?.toString() ?? "";
  const contactType = req.query.contact_type;
  const contactsAuthCompleteService = new AutoCompleteFactory({
    organization_id: organizationId,
    limit: AUTO_COMPLETE_LIMIT,
    current_page: AUTO_COMPLETE_START_PAGE,
  })
    .forContact()
    .setSearchText(searchText)
    .setSearchOption({ contactType: contactType });
  await contactsAuthCompleteService.next();
  const contacts = contactsAuthCompleteService.consume();
  const contactsDto = contacts.results.map(ContactDTO.toAutoCompleteContact);
  return { results: contactsDto };
};

const getContactAutoCompleteController = SuccessErrorWrapper(
  fetchContacts,
  "done",
  200,
);

export { getContactAutoCompleteController };
