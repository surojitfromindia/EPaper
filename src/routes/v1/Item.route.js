import { Router } from "express";
import * as RegularItemController from "../../Controllers/v1/RegularItem.Controller.js";

const itemRouter = Router();

itemRouter
  .post("/", RegularItemController.createItem)
  .get("/edit_page", RegularItemController.getItemEditPage)
  .get("/:item_id", RegularItemController.getAnItem)
  .get("/", RegularItemController.getAllItems)
  .put("/:item_id", RegularItemController.updateAnItem);
export default itemRouter;
