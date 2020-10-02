import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './accounts_table.scss';

class DataTable extends React.Component<{ accounts: any }> {

    render() {
        let { accounts } = this.props;
        return (
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Account Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>

                {(accounts.accounts.length > 0) ? accounts.accounts.map((account: any, index: number) => {
                    if(account.account.status !== 1) {
                        return(
                            <TableRow key={ index }>
                                <TableCell>{ account.id }</TableCell>
                                <TableCell>{ account.names }</TableCell>
                                <TableCell>{ account.email }</TableCell>
                                <TableCell>{ account.account.account_number }</TableCell>
                                <TableCell><span className='inactive'>Inactive</span></TableCell>
                            </TableRow>
                        )
                    }
                    return(
                        <TableRow key={ index }>
                            <TableCell>{ account.id }</TableCell>
                            <TableCell>{ account.names }</TableCell>
                            <TableCell>{ account.email }</TableCell>
                            <TableCell>{ account.account.account_number }</TableCell>
                            <TableCell><span className='active'>Active</span></TableCell>
                        </TableRow>
                    )
                }) : <TableRow><TableCell>Loading...</TableCell></TableRow> }
                </TableBody>
            </Table>
            </TableContainer>
        );
    }
}

export default DataTable;