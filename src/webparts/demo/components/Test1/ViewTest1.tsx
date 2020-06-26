import * as React from "react";
import { useContext, useEffect, useState } from "react";
import RootStore from "../RootComponent/RootStore";
import { Link, RouteComponentProps, useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    fieldLabel: {
        backgroundColor: "#e6ebe9",
        padding: 5,
        width: "150px",
        textAlign: "right"

    },
    fieldValue: {
        backgroundColor: "#f0f5f3",
        padding: 5,
        width: "350px",
        textAlign: "left"

    },
});


const ViewTest1: React.FC = () => {

    const { testStore } = useContext(RootStore);
    let { id } = useParams();
    let history = useHistory();
    const [load, setLoad] = useState(false);

    const classes = useStyles();
    testStore.setLoading = setLoad;

    useEffect(() => {
        testStore.getItemById(id);
    }, []);

    return (
        <div>
            {load ? (
                <h2>Loading... </h2>
            ) : (
                    <div>
                        <h1>View</h1>
                        {testStore.item &&
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table" size="small">
                                    <TableBody>
                                        <TableRow >
                                            <TableCell className={classes.fieldLabel} align="right">Title</TableCell>
                                            <TableCell className={classes.fieldValue} align="right">{testStore.item.Title}</TableCell>
                                            {/* <TextField id="standard-basic" label="Title" /> */}
                                        </TableRow>
                                        <TableRow >
                                            <TableCell className={classes.fieldLabel} align="right">Description</TableCell>
                                            <TableCell className={classes.fieldValue} align="right">{testStore.item.Description}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        <Button variant="contained" color="primary" onClick={() => { history.push(`/`) }}>Back to listing</Button>
                    </div>
                )
            }
        </div>
    );
};
//export default TestComp;
export default ViewTest1;
