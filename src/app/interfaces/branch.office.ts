export interface BranchOffice {
  idBranchOffice: string
  code: string
  name: string
}
export interface ApiResponse {
  successful: boolean;
  errorMessage: string;
  message: string;
  result: BranchOffice[];
}

