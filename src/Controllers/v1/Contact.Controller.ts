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

const updateContact = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const contactId = Number(req.params.contact_id);
  const body = req.body;
  const contactDetailsFromPayload = ContactDTO.toContactUpdate(body);
  const contactService = new ContactService({
    client_info: clientInfo,
  });
  const updatedContact = await contactService.updateContact({
    contact_id: contactId,
    contact_details: contactDetailsFromPayload,
  });
  return { contact: ContactDTO.toContact(updatedContact) };
};
const updateContactController = SuccessErrorWrapper(
  updateContact,
  "contact updated",
  200,
);

const getContact = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const contactId = Number(req.params.contact_id);
  const contactService = new ContactService({
    client_info: clientInfo,
  });
  const contactDetails = await contactService.getContactById({
    contact_id: contactId,
  });
  return { contact: ContactDTO.toContact(contactDetails) };
};
const getContactController = SuccessErrorWrapper(getContact, "done", 200);

export {
  createContactController,
  getAllContactDetailsController,
  getContactEditPageController,
  updateContactController,
  getContactController,
};
