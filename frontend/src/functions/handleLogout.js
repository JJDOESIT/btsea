import userLogout from "./userLogout";
import { useNavigate } from "react-router-dom";

export default function HandleUserLogout() {
  const navigate = useNavigate();
  function logOut() {
    userLogout().then((status) => {
      if (status.status == 200) {
        navigate("/login/");
        navigate(0);
      }
    });
  }
  return (
    <div style={{ padding: "1em" }}>
      <input
        type="button"
        value="Logout"
        onClick={logOut}
        className="hover:cursor-pointer hover:opacity-70"
        style={{
          backgroundColor: "red",
          color: "white",
          borderRadius: "2rem",
          borderStyle: "solid",
          borderColor: "red",
        }}
      ></input>
    </div>
  );
}
