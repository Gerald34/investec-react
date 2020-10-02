import axios from 'axios';
import {UserInterface} from "../interfaces/User.interface";

class AxiosResponse<T> {
}

export async function UserAuthService (email: string, password: string): Promise<AxiosResponse<UserInterface>> {
    return axios.post<UserInterface>('http://localhost:8000/api/signin',
        { email: email, password: password });
}

export async function getAccounts() {
    const data = localStorage.getItem('userInformation');
    if (data != null) {
        const token = JSON.parse(data);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token.token_type + ' ' + token.token
        };
        return axios.get('http://localhost:8000/api/profiles/all', {
            headers: headers
        });
    } else {
        return { error: true, message: 'Token not found' };
    }
}