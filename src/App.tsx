import React, {Component, useState} from 'react';
import {BrowserRouter, Switch, Route, Redirect,} from 'react-router-dom';
import './App.scss';

import AccountsComponent from './components/AccountsComponent/Accounts.component';
import BrandComponent from "./components/Brand/Brand.component";
import TextField from "@material-ui/core/TextField";
import {Button} from "reactstrap";
import {UserAuthService} from "./services/UserAuthService";
import MuiAlert from "@material-ui/lab/Alert";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <div className='background'/>
                        <div className='loginWindow'>
                            <div>
                                <div className='row justify-content-md-center'>
                                    <div className='col-lg-12'>
                                        <BrandComponent/>
                                    </div>
                                    <div className='col-lg-12'>
                                        <Form/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Route>
                    <Route exact path='/accounts' component={AccountsComponent} />
                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default App;

export const Form = () => {

        const [email, setEmail] = useState("arno@investec.co.za");
        const [password, setPassword] = useState("arno");
        const [success, setSuccess] = useState({message: ''});
        const [error, setError] = useState({message: ''});
        const [isLoggedIn, setLoggedIn] = useState({ loggedIn: false });
        function formValidator() {
            return email.length > 0 && password.length > 0;
        }

        function signin(e: any) {
            e.preventDefault();
            try {
                UserAuthService(email, password).then((response: any) => {
                    if (typeof response.data.error === 'undefined') {
                        localStorage.setItem('status', JSON.stringify({ loggedIn: true }));
                        localStorage.setItem('userInformation', JSON.stringify(response.data));
                        setSuccess({message: 'Access granted. Redirecting, Please wait...'});

                        setTimeout(() => {
                            setLoggedIn({ loggedIn: true });
                        }, 3000);
                    } else {
                        setError({message: response.data.message});
                    }
                });
            } catch (e) {
                alert(e.message);
            }
        }

        return (
            <form onSubmit={signin}>
                {isLoggedIn.loggedIn &&(
                    <Redirect to='/accounts' />
                )}

                {error.message !== '' && (
                    <MuiAlert severity="error">
                        {error.message}
                    </MuiAlert>
                )}

                {success.message !== '' && (
                    <MuiAlert severity="success">
                        {success.message}
                    </MuiAlert>
                )}

                <TextField value={email}
                           onChange={e => setEmail(e.target.value)}
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           label="Email Address"
                           name="email"
                           autoComplete="email"
                           autoFocus/>

                <TextField value={password}
                           onChange={e => setPassword(e.target.value)}
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           autoComplete="current-password"/>

                <Button disabled={!formValidator()}
                        type="submit"
                        variant="contained"
                        color="primary">
                    Sign In
                </Button>
            </form>
        )
}