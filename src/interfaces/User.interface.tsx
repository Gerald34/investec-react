export interface UserInterface {
    user: UserInformationInterface,
    auth: {
        original: {
            token: string,
            token_type: string,
            expires_in: number
        }
    }
}

interface UserInformationInterface {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role: number,
    created_at: string,
    updated_at: string
}