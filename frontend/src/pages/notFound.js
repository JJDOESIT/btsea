import "../styles/notFound.css";
import modifyDocumentBody from "../functions/modifyDocumentBody";
import { useEffect } from "react";
export default function NotFound() {

  //Modify .error-pg height on re-size
  useEffect(() => {
    setTimeout(() => {
      modifyDocumentBody("body", ".navbar-container", ".error-pg");
      window.addEventListener("resize", () => {
        modifyDocumentBody("body", ".navbar-container", ".error-pg");
      });
    }, 50);
  }, []);
  
  return (
    <div class="error-pg">
      <div class="error-number">
        <div class="number left-coffee">4</div>
        <div class="coffee-mug"></div>
        <div class="number right-coffee">4</div>
      </div>
      <div class="sm-screen">404</div>
      <div class="mean-msg">
        Nothing to see here, <a href="/">go back home!</a>
      </div>
    </div>
  );
}
