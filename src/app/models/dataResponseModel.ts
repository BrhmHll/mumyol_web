import { BaseResponseModel } from "./baseResponseModel";

export interface DataResponseModel<T> extends BaseResponseModel{
  data:T;
}
