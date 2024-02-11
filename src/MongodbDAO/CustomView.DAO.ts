import { CustomViewModel } from "../MongodbModels";

class CustomViewDAO {
  private readonly organization_id: number;

  constructor({ organization_id }) {
    this.organization_id = organization_id;
  }

  getCustomView() {
    return CustomViewModel.findOne(
      {
        organization_id: this.organization_id,
      },
      {
        _id: 0,
        __v: 0,
      },
    ).lean();
  }

  createFullCustomView({ custom_view }) {
    return CustomViewModel.create({
      ...custom_view,
    });
  }
}

export { CustomViewDAO };
