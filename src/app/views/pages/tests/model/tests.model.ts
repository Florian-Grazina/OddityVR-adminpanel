// Users
// ------------------
export interface TestUser {
    id: number,
    email: string,
    role: string,
    company: string,
    department: string,
}

export interface Test {
    id: number,
    [softskill: string] : number
}