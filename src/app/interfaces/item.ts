export interface Item {
  idItem: string
  code: string
  nameItem: string
}
export interface ApiResponseItem {
  successful: boolean;
  errorMessage: string;
  message: string;
  result: Item[];
}
