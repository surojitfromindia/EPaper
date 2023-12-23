import { ContactEditPageService, ContactService } from "../../Services";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { ContactDTO } from "../../DTO";
import { Request } from "express";

const createContact = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const contactDetailsFromPayload = ContactDTO.toContactCreate(body);
  const contactService = new ContactService({
    client_info: clientInfo,
  });
  const createdContact = await contactService.createContact({
    contact_details: contactDetailsFromPayload,
  });
  return { contact: ContactDTO.toContact(createdContact) };
};
const createContactController = SuccessErrorWrapper(
  createContact,
  "contact created",
  201,
);

const getAllContactDetails = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const contactService = new ContactService({
    client_info: clientInfo,
  });
  const allContactDetails = await contactService.getAllContactDetails();
  return { contacts: allContactDetails.map(ContactDTO.toContact) };
};
const getAllContactDetailsController = SuccessErrorWrapper(
  getAllContactDetails,
  "done",
  200,
);

const getContactEditPage = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const contactId = req_query.contact_id && Number(req_query.contact_id);

  const contactEditPageService = new ContactEditPageService({
    client_info: clientInfo,
  });
  const editPage = await contactEditPageService.getEditPage({
    contact_id: contactId,
  });
  return ContactDTO.toContactEditPage(editPage);
};
const getContactEditPageController = SuccessErrorWrapper(
  getContactEditPage,
  "done",
  200,
);

export {
  createContactController,
  getAllContactDetailsController,
  getContactEditPageController,
};
