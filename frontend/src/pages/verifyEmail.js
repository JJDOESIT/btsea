import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import postCheckUserActive from "../functions/postCheckUserActive";
import {decode} from 'base-64'

export default function VerifyEmail() {
  const [loaded, setLoaded] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  useEffect(() => {
    var email=sessionStorage.getItem('email')
    email=decode(email)
    postCheckUserActive(email).then((response) => {
      if (response.status == 200) {
        setActiveUser(true);
        setLoaded(true);
      } else if (response.status == 400) {
        setActiveUser(false);
        setLoaded(true);
      }
    });
  }, []);

  if (loaded && activeUser) {
    return (
      <div>
        <p>Already Verified</p>
      </div>
    );
  } else if (loaded && !activeUser) {
    return (
      <div>
        <p>Verify Email</p>
        <input type='button' value='Send new email'></input>
      </div>
    );
  }
  else{
    return <div>Loading ...</div>
  }
}
