import { Router } from "express";
import * as RegularItemController from "../../Controllers/v1/RegularItem.Controller.js";

const itemRouter = Router();

itemRouter
  .post("/", RegularItemController.createItem)
  .get("/:itemId", RegularItemController.getAnItem)
  .get("/", RegularItemController.getAllItems)
  .put("/:itemId", RegularItemController.updateAnItem);
export default itemRouter;
