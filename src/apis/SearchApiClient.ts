import axios, { AxiosResponse } from "axios";
import { getErrorInfo } from "@utils/utils";
import { ResponseDto } from "@apis/dto/ResponseDto";
import { SearchCondition } from "@apis/dto/SearchCondition";
import { SearchResult } from "@apis/dto/SearchResult";

export const searchApi = async (condition: SearchCondition): Promise<ResponseDto<Array<SearchResult>>> => {
  try {
    // APIコール
    const response: AxiosResponse<Array<SearchResult>> = await axios.post<Array<SearchResult>>("/api/search", condition);
    const result: ResponseDto<Array<SearchResult>> = {
      isSuccess: true,
      error: "",
      // data: response.data,
      data: response.data,
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
