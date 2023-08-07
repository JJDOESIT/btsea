import userLogout from "../functions/userLogout";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate=useNavigate()
    function handleUserLogout(){
        userLogout().then((status)=>{
            if (status.status==200){
                window.localStorage.removeItem('activeUser')
                navigate('/login/')
            }
        })
    }
  return (
    <div className="logout-container">
      <input type="button" value="Logout" onClick={handleUserLogout}></input>
    </div>
  );
}
