import { Router } from "express";
import * as ContactController from "../../Controllers/v1/Contact.Controller";

const contactRouter = Router();

contactRouter.post("/", ContactController.createContactController);

export default contactRouter;
