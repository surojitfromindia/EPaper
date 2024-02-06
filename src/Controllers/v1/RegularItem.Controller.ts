import {
  RegularItemEditPageService,
  RegularItemService,
} from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import RegularItemDTO from "../../DTO/RegularItem.DTO";
import { RegularItemDto } from "../../DTO/index";
import { Request } from "express";

const createItem = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const itemDetailsFromPayload = RegularItemDto.toItemCreate(body);
  const regularItemService = new RegularItemService({
    client_info: clientInfo,
  });
  const createdItem = await regularItemService.create({
    item_details: itemDetailsFromPayload,
  });
  return { item: RegularItemDto.toItem(createdItem) };
};
const createItemController = SuccessErrorWrapper(
  createItem,
  "item created",
  201,
);

const getAllItems = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const regularItemService = new RegularItemService({
    client_info: clientInfo,
  });

  const items = await regularItemService.getAllItems();
  return { items: items.map((item) => RegularItemDto.toItem(item)) };
};
const getAllItemController = SuccessErrorWrapper(getAllItems, "done", 200);

const getAnItem = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const itemId = req.params.item_id;
  const regularItemService = new RegularItemService({
    client_info: clientInfo,
  });

  const item = await regularItemService.getAnItem({
    item_id: itemId,
  });
  return { item: RegularItemDto.toItem(item) };
};
const getAnItemController = SuccessErrorWrapper(getAnItem, "done", 200);

const updateAnItem = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const itemId = req.params.item_id;
  const itemDetailsFromPayload = RegularItemDto.toItemUpdate(body);
  const regularItemService = new RegularItemService({
    client_info: clientInfo,
  });

  const item = await regularItemService.updateAnItem({
    item_details: itemDetailsFromPayload,
    item_id: itemId,
  });
  return { tax_rate: RegularItemDto.toItem(item) };
};
const updateAnItemController = SuccessErrorWrapper(
  updateAnItem,
  "item updated",
  200,
);

const getItemEditPage = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const itemId = req_query.item_id && Number(req_query.item_id);
  const regularItemEditPageService = new RegularItemEditPageService({
    client_info: clientInfo,
  });

  const editPage = await regularItemEditPageService.getEditPage({
    item_id: itemId,
  });
  return RegularItemDTO.toItemEditPage(editPage);
};
const getItemEditPageController = SuccessErrorWrapper(
  getItemEditPage,
  "done",
  200,
);

export {
  createItemController,
  getAllItemController,
  getAnItemController,
  updateAnItemController,
  getItemEditPageController,
};
