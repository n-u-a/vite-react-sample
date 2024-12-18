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

const sample = [
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
  {
    product_code: "A003",
    product_name: "品番3",
    count: 75,
    product_classification: 1,
  },
  {
    product_code: "A004",
    product_name: "品番4",
    count: 20,
    product_classification: 0,
  },
  {
    product_code: "A005",
    product_name: "品番5",
    count: 60,
    product_classification: 1,
  },
  {
    product_code: "A006",
    product_name: "品番6",
    count: 45,
    product_classification: 0,
  },
  {
    product_code: "A007",
    product_name: "品番7",
    count: 90,
    product_classification: 1,
  },
  {
    product_code: "A008",
    product_name: "品番8",
    count: 10,
    product_classification: 0,
  },
  {
    product_code: "A009",
    product_name: "品番9",
    count: 30,
    product_classification: 1,
  },
  {
    product_code: "A010",
    product_name: "品番10",
    count: 55,
    product_classification: 0,
  },
  {
    product_code: "A011",
    product_name: "品番11",
    count: 80,
    product_classification: 1,
  },
  {
    product_code: "A012",
    product_name: "品番12",
    count: 35,
    product_classification: 0,
  },
  {
    product_code: "A013",
    product_name: "品番13",
    count: 95,
    product_classification: 1,
  },
  {
    product_code: "A014",
    product_name: "品番14",
    count: 25,
    product_classification: 0,
  },
  {
    product_code: "A015",
    product_name: "品番15",
    count: 70,
    product_classification: 1,
  },
  {
    product_code: "A016",
    product_name: "品番16",
    count: 40,
    product_classification: 0,
  },
  {
    product_code: "A017",
    product_name: "品番17",
    count: 85,
    product_classification: 1,
  },
  {
    product_code: "A018",
    product_name: "品番18",
    count: 15,
    product_classification: 0,
  },
  {
    product_code: "A019",
    product_name: "品番19",
    count: 50,
    product_classification: 1,
  },
  {
    product_code: "A020",
    product_name: "品番20",
    count: 65,
    product_classification: 0,
  },
  {
    product_code: "A021",
    product_name: "品番21",
    count: 20,
    product_classification: 1,
  },
  {
    product_code: "A022",
    product_name: "品番22",
    count: 30,
    product_classification: 0,
  },
  {
    product_code: "A023",
    product_name: "品番23",
    count: 45,
    product_classification: 1,
  },
  {
    product_code: "A024",
    product_name: "品番24",
    count: 75,
    product_classification: 0,
  },
  {
    product_code: "A025",
    product_name: "品番25",
    count: 90,
    product_classification: 1,
  },
  {
    product_code: "A026",
    product_name: "品番26",
    count: 10,
    product_classification: 0,
  },
  {
    product_code: "A027",
    product_name: "品番27",
    count: 55,
    product_classification: 1,
  },
  {
    product_code: "A028",
    product_name: "品番28",
    count: 60,
    product_classification: 0,
  },
  {
    product_code: "A029",
    product_name: "品番29",
    count: 15,
    product_classification: 1,
  },
  {
    product_code: "A030",
    product_name: "品番30",
    count: 70,
    product_classification: 0,
  },
  {
    product_code: "A031",
    product_name: "品番31",
    count: 35,
    product_classification: 1,
  },
  {
    product_code: "A032",
    product_name: "品番32",
    count: 85,
    product_classification: 0,
  },
  {
    product_code: "A033",
    product_name: "品番33",
    count: 40,
    product_classification: 1,
  },
  {
    product_code: "A034",
    product_name: "品番34",
    count: 25,
    product_classification: 0,
  },
  {
    product_code: "A035",
    product_name: "品番35",
    count: 65,
    product_classification: 1,
  },
  {
    product_code: "A036",
    product_name: "品番36",
    count: 50,
    product_classification: 0,
  },
  {
    product_code: "A037",
    product_name: "品番37",
    count: 15,
    product_classification: 1,
  },
  {
    product_code: "A038",
    product_name: "品番38",
    count: 55,
    product_classification: 0,
  },
  {
    product_code: "A039",
    product_name: "品番39",
    count: 45,
    product_classification: 1,
  },
  {
    product_code: "A040",
    product_name: "品番40",
    count: 75,
    product_classification: 0,
  },
];
