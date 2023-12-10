import { ContactService } from "../../Services";
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
  return { item: ContactDTO.toContact(createdContact) };
};
const createContactController = SuccessErrorWrapper(
  createContact,
  "contact created",
  201,
);

export { createContactController };
