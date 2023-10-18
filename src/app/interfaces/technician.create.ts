export interface TechnicianCreate {
  code: string
  name: string
  salary: number
  listItems: ListItem[]
}
export interface ListItem {
  idItem: string
  itemQuantity: number
  idBranchOffice: string
}
