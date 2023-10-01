import React from "react";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import TypingIndicator from "typing-indicator";
import Emoji from "./Emoji";
import logo from "../img/emoticon.png";

let typingIndicator = null;
export default function Input({ onSendMessage, onChangeTypingState }) {
  const [text, setText] = useState("");

  useEffect(() => {
     if (typingIndicator === null) {
      typingIndicator = new TypingIndicator();
      typingIndicator.listen((isTyping) => onChangeTypingState(isTyping));
    }
  }, []);

  function onChange(e) {
    const text = e.target.value;
    typingIndicator.onChange(text);
    setText(text);
  }

  function onSubmit(e) {
    e.preventDefault();
    setText("");
    onSendMessage(text);
  }

  function onClick(e) {
    const input = document.getElementsByClassName("text-input")[0];
    input.value = input.value + e.target.innerHTML;

    const text = e.target.innerHTML;
    typingIndicator.onChange(input.value);
    setText(input.value);
  }

  function toggleEmoji(e) {
    e.preventDefault();
    const emoji_list = document.getElementsByClassName("emoji-list")[0];
    if (emoji_list.style.display === "none") {
      emoji_list.style.display = "flex";
    } else emoji_list.style.display = "none";
  }

  return (
    <div className={styles.input}>
      <Emoji onClick={onClick} />
      <form onSubmit={(e) => onSubmit(e)}>
        <button className="emoji-btn" type="button" onMouseDown={toggleEmoji}>
          &#9786;
        </button>
        <input
          className="text-input"
          onChange={(e) => onChange(e)}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus
        />
        <button>Send</button>
      </form>
    </div>
  );
}
