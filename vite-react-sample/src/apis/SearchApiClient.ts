import axios, { AxiosResponse } from "axios";
import { getErrorInfo } from "../utils/utils";
import { ResponseDto } from "./dto/ResponseDto";
import { SearchCondition } from "./dto/SearchCondition";
import { SearchResult } from "./dto/SearchResult";

export const searchApi = async (condition: SearchCondition): Promise<ResponseDto<Array<SearchResult>>> => {
  try {
    // APIコール
    // const response: AxiosResponse<Array<SearchResult>> = await axios.post<Array<SearchResult>>("", condition);
    const result: ResponseDto<Array<SearchResult>> = {
      isSuccess: true,
      error: "",
      // data: response.data,
      data: sample,
    };
    return result;
  } catch (error: unknown) {
    const result: ResponseDto<Array<SearchResult>> = {
      isSuccess: false,
      error: getErrorInfo(error),
      data: [],
    };
    return result;
  }
};

const sample: SearchResult[] = [
  {
    product_code: "A001",
    product_name: "品番1",
    count: 100,
    product_classification: 0,
  },
  {
    product_code: "A002",
    product_name: "品番2",
    count: 50,
    product_classification: 0,
  },
];
