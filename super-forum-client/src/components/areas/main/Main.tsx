import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../store/AppState";

const Main = () => {

    const usersState = useSelector((state: AppState) => state.users);
    const [users, setUsers] = useState<JSX.Element>();
    const [arrayCheckboxes, setArrayCheckboxes] = useState<Array<{ id: string, checkbox: boolean }>>()
    const [select, setSelect] = useState<boolean>(false)

    useEffect(() => {
        if (usersState) {

            let count = 1
            const us = usersState.map((u) => {

                return (

                    <tr key={u.id}>
                        <th scope="row">{count++}</th>

                        <td><input className="form-check-input" type="checkbox" id={u.id} onChange={onChange}
                                   checked={arrayCheckboxes ? arrayCheckboxes.filter(v => v.id === u.id).map(u => u.checkbox)[0] : false}/>
                        </td>

                        <td>{u.userName}</td>
                        <td>{u.email}</td>
                        <td>{u.status}</td>
                        <td>{u.createdOn}</td>
                        <td>{u.lastModifiedOn}</td>
                    </tr>

                );
            });
            let arr: Array<{ id: string, checkbox: boolean }> = usersState.map((u) => {
                return ({id: u.id, checkbox: false})
            })

            setArrayCheckboxes(arr);
            setUsers(<tbody>{us}</tbody>);
        }
    }, [usersState]);

    const onSelect = () => {
        console.log("Clicked")
        let arr = [...arrayCheckboxes]
        arr?.forEach(i => i.checkbox = !select)
        // arr?.map(i => { return {id:i.id, checkbox: !select}})
        setSelect(!select)
        setArrayCheckboxes(arr)
    }

    const onChange = () => {}

    return (<table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col" ><button onClick={onSelect} style={{cursor: "pointer"}}>Select All</button> </th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Created on</th>
                <th scope="col">Last Modified</th>
            </tr>
            </thead>
            {users}

        </table>

    );
};

export default Main;
