export interface ResponseDto<T> {
  isSuccess: boolean;
  error: string;
  data: T;
}
