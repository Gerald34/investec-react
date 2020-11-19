import React, { Component } from 'react';
import { getAccounts } from '../../services/UserAuthService';
import DataTable from "../TableComponent/Table.component";
import BrandComponent from "../Brand/Brand.component";
import './account.scss';
import { Redirect } from 'react-router-dom';
import { Button } from "reactstrap";

class AccountsComponent extends Component<{ isLoggedIn: any }> {
    state = {
        albums: [],
        accounts: []
    };

    componentDidMount = () => {
        getAccounts().then((response: any) => {
            this.setState({ accounts: response.data });
        });
    };

    refreshDataHandler = () => {
        getAccounts().then((response: any) => {
            this.setState({ accounts: response.data });
        })
    };

    render = () => {
        const local = localStorage.getItem('status');
        if(local === null) {
            return <Redirect to='/' from='/accounts' />
        }
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 mb-2'>
                        <BrandComponent/>
                    </div>

                    <div className='col-lg-6 mb-2'>
                        <Button onClick={ this.refreshDataHandler } variant="contained" color="primary">Refresh Accounts</Button>
                    </div>

                    <div className='col-lg-12'>
                        <DataTable accounts={ this.state }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountsComponent;
