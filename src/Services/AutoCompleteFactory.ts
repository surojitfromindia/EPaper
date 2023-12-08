import {
  ContactAutoCompleteType,
  ContactService,
} from "./Contact/Contact.service";
import { AutoCompleteService } from "./AutoComplete.service";
import { ItemAutoCompleteType } from "./RegularItem.service";
import { RegularItemService } from "./index";

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
      service: new ContactService({
        client_info: {
          organizationId: this.organization_id,
        },
      }),
    });
  }

  forItems() {
    return new AutoCompleteService<ItemAutoCompleteType, any>({
      organization_id: this.organization_id,
      limit_and_page: { limit: this.limit, page: this.current_page },
      service: RegularItemService,
    });
  }
}

export { AutoCompleteFactory };
