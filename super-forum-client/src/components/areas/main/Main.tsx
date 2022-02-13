import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../store/AppState";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable, {SelectRowProps} from "react-bootstrap-table-next";
import User from "../../../models/User";
import {SelectedCboxType} from "../../../store/selectedCheckboxes/selectedCboxReducer";

const columns = [
    // {
    //     dataField: "id",
    //     text: "id",
    //     sort: true
    // },

    {
        dataField: "userName",
        text: "Name",
        sort: true
    },
    {
        dataField: "email",
        text: "Email",
        sort: true
    },
    {
        dataField: "status",
        text: "Status",
        sort: true
    },
    {
        dataField: "createdOn",
        text: "Created On",
        sort: true
    }, {
        dataField: "lastModifiedOn",
        text: "Last Modified",
        sort: true
    }

];

const Main = () => {

    const usersState = useSelector((state: AppState) => state.users);
    const userState = useSelector((state: AppState) => state.user);
    const [data, setData] = useState<Array<User>>([])
    const [selectedCbox, setSelectedCbox] = useState<Array<string>>([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (usersState) {
            setData(usersState)
        }
    }, [usersState]);

    const selectRow: SelectRowProps<any> = {
        mode: "checkbox",
        // style: {background: 'navajowhite'},
        bgColor: (row, rowIndex) => {
            return row.id===userState?.id ? "red": "navajowhite"
        },
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {

            let f = [...selectedCbox]
            isSelect ? f.push(row.id) : f = f.filter(m => m !== row.id)
            setSelectedCbox(f)
            dispatch({type: SelectedCboxType, payload: f})
        },
        onSelectAll: (isSelect, rows, e) => {

            const r = isSelect ? rows.map(m => m.id) : []
            setSelectedCbox(r)
            dispatch({type: SelectedCboxType, payload: r})

        },
        selected: [...selectedCbox]
    }

    return (
        <BootstrapTable
            bootstrap4
            keyField="id"
            data={data!}
            columns={columns}
            selectRow={selectRow}
        />

    );
};

export default Main;
