import { Router } from "express";
import * as RegularItemController from "../../Controllers/v1/RegularItem.Controller";

const itemRouter = Router();

itemRouter
  .post("/", RegularItemController.createItemController)
  .get("/edit_page", RegularItemController.getItemEditPageController)
  .get("/:item_id", RegularItemController.getAnItemController)
  .get("/", RegularItemController.getAllItemsController)
  .put("/:item_id", RegularItemController.updateAnItemController);
export default itemRouter;
