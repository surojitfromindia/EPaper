import { RegularItemService } from "../../Services/index.js";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper.js";
import RegularItemDTO from "../../DTO/RegularItem.dto.js";
import { RegularItemDto } from "../../DTO/index.js";

let createItem = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const itemDetailsFromPayload = RegularItemDto.toItemCreate(body);
  const createdItem = await RegularItemService.create({
    item_details: itemDetailsFromPayload,
    client_info: clientInfo,
  });
  return { item: RegularItemDto.toItem(createdItem) };
};
createItem = SuccessErrorWrapper(createItem, "item created", 201);

let getAllItems = async (req) => {
  const clientInfo = req.clientInfo;
  const items = await RegularItemService.getAllItems({
    client_info: clientInfo,
  });
  return { items: items.map((item) => RegularItemDto.toItem(item)) };
};
getAllItems = SuccessErrorWrapper(getAllItems, "done", 200);

let getAnItem = async (req) => {
  const clientInfo = req.clientInfo;
  const itemId = req.params.item_id;
  const item = await RegularItemService.getAnItem({
    item_id: itemId,
    client_info: clientInfo,
  });
  return { item: RegularItemDto.toItem(item) };
};
getAnItem = SuccessErrorWrapper(getAnItem, "done", 200);

let updateAnItem = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const itemId = req.params.item_id;
  const item = await RegularItemService.updateAnItem({
    item_details: body,
    item_id: itemId,
    client_info: clientInfo,
  });
  return { tax_rate: RegularItemDto.toItem(item) };
};
updateAnItem = SuccessErrorWrapper(updateAnItem, "item updated", 204);

let getItemEditPage = async (req) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const itemId = req_query.item_id && Number(req_query.item_id);

  const editPage = await RegularItemService.getEditPage({
    client_info: clientInfo,
    item_id: itemId,
  });
  return RegularItemDTO.toItemEditPage(editPage);
};
getItemEditPage = SuccessErrorWrapper(getItemEditPage, "done", 200);

export { createItem, getAllItems, getAnItem, updateAnItem, getItemEditPage };
