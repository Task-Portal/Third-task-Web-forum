import React, {useEffect} from "react";
import {gql, useQuery} from "@apollo/client";
import {useDispatch} from "react-redux";
import {UsersDateType} from "../../../store/usersData/UsersDataReducer";


const GetAllUsers = gql`
    query getAllUsers {
        getAllUsers {
            id
            userName
            email
            status
            createdOn
            lastModifiedOn            
        }
    }
`;




const Main = () => {
    const { data: usersDate } = useQuery(GetAllUsers);
    const dispatch = useDispatch();
    useEffect(() => {
        if (usersDate && usersDate.getAllUsers) {
            console.log("Getting data")
            dispatch({
                type: UsersDateType.USERS_DATE_TYPE,
                payload: usersDate.getAllUsers,
            });
        }
    }, [dispatch, usersDate]);

    return (<table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>

                <td>Mark</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>

            </tbody>
        </table>

    );
};

export default Main;
