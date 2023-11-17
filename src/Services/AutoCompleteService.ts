import ContactService, {
  ContactAutoCompleteType,
} from "./Contact/Contact.service";

class AutoCompleteFactory {
  private readonly organization_id: number;
  private readonly limit: number;
  private readonly offset: number;

  constructor({ organization_id, limit, offset }) {
    this.organization_id = organization_id;
    this.limit = limit;
    this.offset = offset;
  }

  forContact() {
    return new AutoCompleteService<
      ContactAutoCompleteType,
      IAutoCompleteAble<ContactAutoCompleteType>
    >({
      organization_id: this.organization_id,
      limit: this.limit,
      offset: this.offset,
      service: ContactService,
    });
  }
}

class AutoCompleteService<T, S extends IAutoCompleteAble<T>> {
  private search_text: string;
  private results: Array<T & AutoCompleteReturnType> = [];
  private organization_id: number;
  private readonly limit: number;
  private offset: number;
  private service: S;
  private search_option: any;

  constructor({
    organization_id,
    limit,
    offset,
    service,
  }: {
    organization_id: number;
    limit: number;
    offset: number;
    service: S;
  }) {
    this.organization_id = organization_id;
    this.limit = limit;
    this.offset = offset;
    this.service = service;
  }

  setSearchText(search_text: string) {
    this.search_text = search_text;
    return this;
  }

  setSearchOption(search_option: any) {
    this.search_option = search_option;
    return this;
  }

  countAll() {}

  async next() {
    // on each call, increment the offset by the limit
    // and call the service and store the new data in results
    this.offset += this.limit;
    const results = await this.service.fetchEntries({
      search_text: "",
      limit: this.limit,
      offset: this.offset,
      search_option: this.search_option,
    });
    this.results = [...this.results, ...results];
    return this;
  }

  consume() {
    //on consumption, return the results and empty the results
    const results = this.results;
    this.results = [];
    return results;
  }
}

interface IAutoCompleteAble<T> {
  fetchEntries(p: {
    offset: number;
    limit: number;
    search_text: string;
    search_option?: any;
  }): Promise<Array<T & AutoCompleteReturnType>>;
}

type AutoCompleteReturnType = {
  id: number;
  text: string;
};

export { AutoCompleteFactory };
export type { IAutoCompleteAble, AutoCompleteReturnType };
