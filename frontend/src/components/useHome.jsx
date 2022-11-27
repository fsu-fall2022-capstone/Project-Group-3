import { useReducer, useContext } from "react";
import { create_post, get_current_user } from "../Utilities/FetchFunction";
import { UserContext } from "..";
import { updateUsers } from "../Utilities/updateUsers";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useHome = () => {
  const [info, setInfo] = useReducer(infoReducer, initialInfo);
  const { user, loginWithRedirect } = useAuth0();
  const [current, setCurrent] = useState("");
  let updatedUser = false;

  useEffect(() => {
    async function getCurrent() {
      if (!!user) {
        let response = await get_current_user(user.email);
        if (!response) {
          updatedUser = await updateUsers(user);
          response = await get_current_user(user.email);
        }
        setCurrent(response);
      }
    }
    getCurrent().catch(console.error);
  }, [user, updatedUser]);

  const submit = (e) => {
    e.preventDefault();
    if (!!current) {
      if (info.post && info.file) {
        if (info.file.type === "text/csv") {
          setInfo({ hasSubmitted: true });
          const formData = new FormData();

          formData.append("csv_file", info.file);
          formData.append("Username", current.Username);
          formData.append("Description", info.post);
          formData.append("Tags", null);
          create_post(formData).then((res) => {
            if (res === 200) {
              setInfo({
                hasSubmitted: false,
                post: "",
                file: null,
                hasError: false,
              });
              window.location.reload(true);
            } else {
              setInfo({
                hasSubmitted: false,
                hasError: true,
                errorMessage: "Error in posting, please try again.",
              });
            }
          });
        } else {
          setInfo({
            hasSubmitted: false,
            hasError: true,
            errorMessage: "File must be in csv format",
          });
        }
      } else {
        setInfo({
          hasSubmitted: false,
          hasError: true,
          errorMessage: "Please upload a file and/or write a description.",
        });
      }
    } else {
      loginWithRedirect();
    }
  };

  return { info, setInfo, submit };
};

export default useHome;

const initialInfo = {
  post: "",
  file: null,
  hasError: false,
  errorMessage: "",
  hasSubmitted: false,
};

const infoReducer = (state, action) => {
  return {
    ...state,
    ...action,
  };
};
