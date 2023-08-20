import { RegularItemService } from "../../Services/index.js";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper.js";

let createItem = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const data = await RegularItemService.create({
    item_details: body,
    client_info: clientInfo,
  });
  return { item: data };
};
createItem = SuccessErrorWrapper(createItem, 201);

let getAllItems = async (req) => {
  const clientInfo = req.clientInfo;
  const data = await RegularItemService.getAllItems({
    client_info: clientInfo,
  });
  return { items: data };
};
getAllItems = SuccessErrorWrapper(getAllItems, 200);

let getAnItem = async (req) => {
  const clientInfo = req.clientInfo;
  const itemId = req.params.itemId;
  const data = await RegularItemService.getAnItem({
    item_id: itemId,
    client_info: clientInfo,
  });
  return { item: data };
};
getAnItem = SuccessErrorWrapper(getAnItem, 200);

let updateAnItem = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const itemId = req.params.itemId;
  const data = await RegularItemService.updateAnItem({
    item_details: body,
    item_id: itemId,
    client_info: clientInfo,
  });
  return { tax_rate: data };
};
updateAnItem = SuccessErrorWrapper(updateAnItem, 204);

export { createItem, getAllItems, getAnItem, updateAnItem };
