import { Router } from "express";
import { getAllAutoNumberGroupsController } from "../../../Controllers/v1/Settings/AutoNumberSeries.Controller";

const autoNumberSeriesRouter = Router();

// autoNumberSeriesRouter.post("/multiple_auto_number_series/enable");
autoNumberSeriesRouter.get("/", getAllAutoNumberGroupsController);

export default autoNumberSeriesRouter;
