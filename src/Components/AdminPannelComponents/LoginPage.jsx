import React from "react";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const eventSelector = useSelector((state) => state.eventId.value);
  return <div>Home and your event Id :{eventSelector.eventId} </div>;
};

export default LoginPage;
