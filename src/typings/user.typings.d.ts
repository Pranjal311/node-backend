export as namespace IUser;

export interface User {
    firstName: string
    email: string
    hash: string
    phoneNumber: string
}

interface UserId {
    userId?: string
}

export namespace Request {
    export interface CreateUser {
        firstName: User["firstName"]
        email: User["email"]
        password:string
        phoneNumber?: User["phoneNumber"]
        hash?:string
    }

}