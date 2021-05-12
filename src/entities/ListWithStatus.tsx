import { Product, StatusEnum, User } from "../interfaces";
import { ListScrap } from "./ScrapEntity";

export interface ListWithStatus {
  listProdScrap: ListScrap;
  listProd?: Product[];
  status: StatusEnum;
}
