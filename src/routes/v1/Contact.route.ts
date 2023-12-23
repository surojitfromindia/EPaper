import { Router } from "express";
import * as ContactController from "../../Controllers/v1/Contact.Controller";

const contactRouter = Router();

contactRouter.post("/", ContactController.createContactController);
contactRouter.get("/", ContactController.getAllContactDetailsController);
contactRouter.get("/edit_page", ContactController.getContactEditPageController);

export default contactRouter;
