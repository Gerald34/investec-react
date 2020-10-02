export interface Accountinterface {
    uid: string;
    names: string;
    email: string;
    role: string;
    account: Account;
}

export interface Account {
    account_number: string;
    status: number;
}