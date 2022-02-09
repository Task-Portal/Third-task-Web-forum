import React, {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";
import {UsersDateType} from "../../../store/usersData/UsersDataReducer";
import {AppState} from "../../../store/AppState";



const Main = () => {

    const usersState = useSelector((state: AppState) => state.users);
    const [users, setUsers] = useState<JSX.Element>(
        <div>Main</div>
    );
    useEffect(() => {
        if (usersState) {
            console.log(usersState);
            let count =1
            const us = usersState.map((u) => {
                return (

                <tr id={u.id}>
                    <th scope="row">{count++}</th>

                    <td><input className="form-check-input" type="checkbox" id={u.id}/></td>
                    <td>{u.userName}</td>
                    <td>{u.email}</td>
                    <td>{u.status}</td>
                    <td>{u.createdOn}</td>
                    <td>{u.lastModifiedOn}</td>
                </tr>

            );
            });
            setUsers(<tbody>{us}</tbody>);
        }
    }, [usersState]);

    return (<table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Select all</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Created on</th>
                <th scope="col">Last Modified</th>
            </tr>
            </thead>
            {users}
            {/*<tbody>*/}
            {/*<tr>*/}
            {/*    <th scope="row">1</th>*/}

            {/*    <td>Mark</td>*/}
            {/*    <td>Mark</td>*/}
            {/*    <td>Otto</td>*/}
            {/*    <td>@mdo</td>*/}
            {/*</tr>*/}

            {/*</tbody>*/}
        </table>

    );
};

export default Main;
