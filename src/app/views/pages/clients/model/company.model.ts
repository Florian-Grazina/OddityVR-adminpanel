export interface Company {
    id: number,
    name: string,
    number: number,
    street: string,
    city: string,
    postalCode: string,
    country: string
    numberOfDepartments: number
}

export interface FormCreateCompany {
    name: string,
    number: number,
    street: string,
    city: string,
    postalCode: string,
    country: string
}

export interface FormUpdateCompany {
    id: number,
    name: string,
    number: number,
    street: string,
    city: string,
    postalCode: string,
    country: string
}


export interface Department {
    id: number,
    name: string,
    numberOfEmployees: number
}

export interface FormCreateDepartment {
    companyId: number,
    name: string,
}

export interface FormUpdateDepartment {
    index: number,
    id: number,
    name: string,
    companyId: number
}