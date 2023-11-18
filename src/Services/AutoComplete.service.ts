type AutoCompleteBasicType = {
  id: number;
  text: string;
};
type AutoCompleteServiceReturnType<R> = Array<R & AutoCompleteBasicType>;
type AutoCompleteConsumeType<R> = {
  results: AutoCompleteServiceReturnType<R>;
  page_context: {
    limit: number;
    skip: number;
  };
};

interface IAutoCompleteAble<R> {
  fetchEntries(p: {
    organization_id: number;
    search_text: string;
    search_option?: any;
    limit_and_offset: { limit: number; offset: number };
  }): Promise<AutoCompleteServiceReturnType<R>>;
}

class AutoCompleteService<R, S extends IAutoCompleteAble<R>> {
  private search_text: string;
  private results: Array<R & AutoCompleteBasicType> = [];
  private readonly organization_id: number;
  private readonly limit: number;
  private skip: number;
  private service: S;
  private search_option: any;

  constructor({
    organization_id,
    service,
    limit_and_page,
  }: {
    organization_id: number;
    service: S;
    limit_and_page: { limit: number; page: number };
  }) {
    this.organization_id = organization_id;
    this.limit = limit_and_page.limit;
    this.skip = limit_and_page.limit * (limit_and_page.page - 1);
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
    // on each call, increment the skip by the limit
    // and call the service and store the new data in results
    const results = await this.service.fetchEntries({
      organization_id: this.organization_id,
      search_text: this.search_text,
      limit_and_offset: { limit: this.limit, offset: this.skip },
      search_option: this.search_option,
    });
    this.results = [...this.results, ...results];
    this.skip += this.limit;

    return this;
  }

  consume(): AutoCompleteConsumeType<R> {
    //on consumption, return the results and empty the results
    const results = this.results;
    this.results = [];
    return { results, page_context: { limit: this.limit, skip: this.skip } };
  }
}

export { AutoCompleteService };
export type { IAutoCompleteAble, AutoCompleteBasicType };
