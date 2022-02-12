import React, {useEffect} from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import Home from "./components/routes/Home";
import {useDispatch} from "react-redux";
import {gql, useQuery} from "@apollo/client";
import {UsersDateType} from "./store/usersData/UsersDataReducer";


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

function App() {

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

    const renderHome = (props: any) => <Home {...props} />;

    return (
        <Switch>
            <Route exact={true} path="/" render={renderHome}/>
        </Switch>
    );
}

export default App;
