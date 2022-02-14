import React, { FC, useReducer } from "react";
import ReactModal from "react-modal";
import ModalProps from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helpers";
import { gql, useMutation } from "@apollo/client";
import useRefreshReduxMe, { Me } from "../../hooks/useRefreshReduxMe";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserProfileAction } from "../../store/user/UserReducer";
import { AppState } from "../../store/AppState";

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Login: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
  const [execLogin] = useMutation(LoginMutation, {
    refetchQueries: [
      {
        query: Me,
      },
    ],
  });

  const [{ email, password, resultMsg, isSubmitDisabled }, dispatch] =
      useReducer(userReducer, {
        email: "admin@admin.com",
        password: "1",
        resultMsg: "",
        isSubmitDisabled: true,
      });
  const { execMe, updateMe } = useRefreshReduxMe();

  const onChangeUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    //todo check if trim() working
    dispatch({ type: "email", payload: e.target.value.trim() });
    if (!e.target.value) allowSubmit(dispatch, "Email cannot be empty", true);
    else allowSubmit(dispatch, "", false);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //todo check if trim() working
    dispatch({ type: "password", payload: e.target.value.trim() });
    if (!e.target.value)
      allowSubmit(dispatch, "Password cannot be empty", true);
    else allowSubmit(dispatch, "", false);


  };

  const onClickLogin = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const result = await execLogin({
      variables: {
        email,
        password,
      },
    });
    console.log("login", result);

    dispatch({ type: "resultMsg", payload: result.data.login });
    execMe();
    updateMe();
  };

  const onClickCancel = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClickToggle(e);
  };

  return (
      <ReactModal
          className="modal-menu"
          isOpen={isOpen}
          onRequestClose={onClickToggle}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
      >
        <form>
          <div className="reg-inputs">
            <div>
              <label>email</label>
              <input type="text" value={email} onChange={onChangeUserEmail} />
            </div>
            <div>
              <label>password</label>
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
              />
            </div>
          </div>
          <div className="form-buttons form-buttons-sm">
            <div className="form-btn-left">
              <button
                  style={{
                    marginLeft: ".5em",
                    background: isSubmitDisabled ? "skyblue" : "deepskyblue",
                  }}
                  className="action-btn"
                  disabled={isSubmitDisabled}
                  onClick={onClickLogin}
              >
                Login
              </button>
              <button
                  style={{ marginLeft: ".5em" }}
                  className="cancel-btn"
                  onClick={onClickCancel}
              >
                Close
              </button>
            </div>

            <span className="form-btn-left">
            <strong>{resultMsg}</strong>
          </span>
          </div>
        </form>
      </ReactModal>
  );
};

export default Login;
