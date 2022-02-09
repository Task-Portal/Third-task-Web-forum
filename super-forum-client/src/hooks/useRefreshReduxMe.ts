import { gql, QueryLazyOptions, useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { UserProfileSetType } from "../store/user/UserReducer";
import internal from "stream";
import { useHistory } from "react-router-dom";

export const Me = gql`
  query me {
    me {
      ... on EntityResult {
        messages
      }
      ... on User {
        id
        userName
      }
    }
  }
`;

interface UseRefreshReduxMeResult {
  execMe: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
  deleteMe: () => void;
  updateMe: () => void;
}

const useRefreshReduxMe = (): UseRefreshReduxMeResult => {
  const [execMe, { data }] = useLazyQuery(Me);
  const reduxDispatcher = useDispatch();
  const history = useHistory();

  const deleteMe = () => {
    reduxDispatcher({
      type: UserProfileSetType.USER_PROFILE_SET,
      payload: null,
    });
   // history.replace(`/`);
  };
  const updateMe = () => {
    console.log("useRefreshReduxMe->UpdateMe->data.me: ", data?.me);
    if (data && data.me && data.me.userName) {
      reduxDispatcher({
        type: UserProfileSetType.USER_PROFILE_SET,
        payload: data.me,
      });
     // history.push(`home/${data.me.id}`);
    }
  };

  return { execMe, deleteMe, updateMe };
};
export default useRefreshReduxMe;
