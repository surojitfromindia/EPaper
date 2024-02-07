import {
  AutoCompleteBasicType,
  IAutoCompleteAble,
} from "../AutoComplete.service";
import { RegularItemDao } from "../../DAO";

type ItemAutoCompleteType = AutoCompleteBasicType & {
  name: string;
  sellingPrice: number;
  purchasePrice: number;
};

class RegularItemAutoCompleteService
  implements IAutoCompleteAble<ItemAutoCompleteType>
{
  async fetchEntries({
    organization_id,
    search_text,
    search_option,
    limit_and_offset,
  }): Promise<Array<ItemAutoCompleteType>> {
    const { limit, offset } = limit_and_offset;

    const itemFor = [];
    switch (search_option.item_for) {
      case "sales":
        itemFor.push("sales", "sales_and_purchase");
        break;
      case "purchase":
        itemFor.push("purchase", "sales_and_purchase");
        break;
      default:
        itemFor.push("sales", "purchase", "sales_and_purchase");
    }

    const items = await RegularItemDao.getItemsAutoComplete({
      organization_id: organization_id,
      skip: offset,
      next: limit,
      item_name: search_text,
      item_for: itemFor,
    });

    return items.map((item) => ({
      id: item.id as number,
      text: item.name as string,
      name: item.name,
      purchasePrice: item.purchasePrice,
      sellingPrice: item.sellingPrice,
    }));
  }
}

export { RegularItemAutoCompleteService };
export type { ItemAutoCompleteType };
