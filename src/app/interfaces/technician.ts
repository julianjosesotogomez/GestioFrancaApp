export interface Technician {
  idTechnician: string
  code: string
  name: string
  salary: number
  technicianInfo: TechnicianInfo[]
}

export interface TechnicianInfo {
  idTechnicianItem: string
  nameBranchOffice: string
  nameItem: string
  itemQuantity: number
}
