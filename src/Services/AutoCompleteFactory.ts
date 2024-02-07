import { ContactAutoCompleteType } from "./Contact/Contact.AutoComplete.service";
import { AutoCompleteService } from "./AutoComplete.service";
import { ItemAutoCompleteType } from "./RegularItemServices/RegularItem.AutoComplete.service";
import {
  ContactAutoCompleteService,
  RegularItemAutoCompleteService,
} from "./index";

class AutoCompleteFactory {
  private readonly organization_id: number;
  private readonly limit: number;
  private readonly current_page: number;

  constructor({ organization_id, limit, current_page }) {
    this.organization_id = organization_id;
    this.limit = limit;
    this.current_page = current_page;
  }

  forContact() {
    return new AutoCompleteService<ContactAutoCompleteType, any>({
      organization_id: this.organization_id,
      limit_and_page: { limit: this.limit, page: this.current_page },
      service: new ContactAutoCompleteService(),
    });
  }

  forItems() {
    return new AutoCompleteService<ItemAutoCompleteType, any>({
      organization_id: this.organization_id,
      limit_and_page: { limit: this.limit, page: this.current_page },
      service: new RegularItemAutoCompleteService(),
    });
  }
}

export { AutoCompleteFactory };
