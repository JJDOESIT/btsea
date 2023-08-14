import "../styles/navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [title, setTitle] = useState("");
  const [fire, setFire] = useState(true);

  function decodeEffect(word, count, index, originalWord) {
    const wordList = ["!", "@", "#", "$", "^", "&", "*"];
    var finalize = false;
    if (count <= word.length * 5) {
      if (count % 5 == 0 && count != 0) {
        index += 1;
        finalize = true;
      }
      setTimeout(() => {
        const randomLetter =
          wordList[Math.round(Math.random() * (wordList.length - 1))];
        if (finalize) {
          var list = word.split("");
          list[index - 1] = originalWord[index - 1];
          var tempWord = list.join("");
        } else {
          var list = word.split("");
          list[index] = randomLetter;
          var tempWord = list.join("");
        }
        setTitle(tempWord);
        decodeEffect(tempWord, count + 1, index, originalWord);
      }, 50);
    }
  }

  useEffect(() => {
    const wordList = ["!", "@", "#", "$", "^", "&", "*"];
    var list = [];
    for (let i = 0; i < 5; i++) {
      list.push(wordList[Math.round(Math.random() * (wordList.length - 1))]);
    }
    setTitle(list.join(""));
  }, []);

  useEffect(() => {
    if (fire) {
      if (title != "") {
        decodeEffect(title, 0, 0, "BTsea");
        setFire(false);
      }
    }
  }, [title]);
  return (
    <div className="navbar-container">
      <div className="navbar-title">
        <p>
          <a href="/">{title}</a>
        </p>
      </div>
      <div className="navbar-links-container">
        <div className="navbar-links">
          <p>
            <a href="/register/">Sign Up</a>
          </p>
        </div>
        <div className="navbar-links">
          <p>
            <a href="/login/">Login</a>
          </p>
        </div>
        <div className="navbar-links">
          <p>
            <a href="/dashboard/">Dashboard</a>
          </p>
        </div>
        <div className="navbar-links">
          <p>
            <a href="/analytics/">Analytics</a>
          </p>
        </div>
      </div>
    </div>
  );
}
