// Company
// ------------------
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


// Department
// ------------------
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


// Users
// ------------------
export interface User {
    id: number,
    email: string,
    role: string,
    birthdate: Date,
    lastConnection?: Date
}

export interface FormCreateUser {
    departmentId: number,
    email: string,
    password: string,
    birthdate: Date,
}

export interface FormUpdateUser {
    index: number,
    id: number,
    email: string,
    password: string,
    birthdate: Date,
}


// Forms
// ------------------

export interface FormField {
    [name: string] : number
}

export interface ClientRoles {
    id: number,
    name: string
}