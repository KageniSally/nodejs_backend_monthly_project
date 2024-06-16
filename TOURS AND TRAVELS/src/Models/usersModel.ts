
export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    role_id: number,
    isEmailSent: number,
    isDeleted: number
}

export interface Payload {
    sub: string,
    name: string,
    role_id: number
}