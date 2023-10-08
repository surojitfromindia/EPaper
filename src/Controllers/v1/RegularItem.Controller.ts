import { RegularItemService } from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import RegularItemDTO from "../../DTO/RegularItem.dto";
import { RegularItemDto } from "../../DTO/index";
import { Request } from "express";

let createItem = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const itemDetailsFromPayload = RegularItemDto.toItemCreate(body);
  const createdItem = await RegularItemService.create({
    item_details: itemDetailsFromPayload,
    client_info: clientInfo,
  });
  return { item: RegularItemDto.toItem(createdItem) };
};
const createItemController = SuccessErrorWrapper(
  createItem,
  "item created",
  201,
);

let getAllItems = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const items = await RegularItemService.getAllItems({
    client_info: clientInfo,
  });
  return { items: items.map((item) => RegularItemDto.toItem(item)) };
};
const getAllItemController = SuccessErrorWrapper(getAllItems, "done", 200);

let getAnItem = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const itemId = req.params.item_id;
  const item = await RegularItemService.getAnItem({
    item_id: itemId,
    client_info: clientInfo,
  });
  return { item: RegularItemDto.toItem(item) };
};
const getAnItemController = SuccessErrorWrapper(getAnItem, "done", 200);

let updateAnItem = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const itemId = req.params.item_id;
  const itemDetailsFromPayload = RegularItemDto.toItemUpdate(body);
  const item = await RegularItemService.updateAnItem({
    item_details: itemDetailsFromPayload,
    item_id: itemId,
    client_info: clientInfo,
  });
  return { tax_rate: RegularItemDto.toItem(item) };
};
const updateAnItemController = SuccessErrorWrapper(
  updateAnItem,
  "item updated",
  204,
);

let getItemEditPage = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const itemId = req_query.item_id && Number(req_query.item_id);

  const editPage = await RegularItemService.getEditPage({
    client_info: clientInfo,
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
