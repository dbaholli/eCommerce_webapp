import axios from "axios";

export const createupdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/createupdate-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};