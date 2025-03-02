import styles from "./EmailEditor.module.scss";
import React, { useRef, useState } from "react";
import { Trash2, Bold, Italic, Underline, Paperclip } from "lucide-react";
import {handleClick} from "./submitEmail.ts";

export function EmailEditor() {
  const [textLock, setText] = useState("");
  const [, setTextArea] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const editorRef = useRef<HTMLDivElement>(null!);
  const fromRef = useRef<HTMLInputElement>(null!);
  const [input, setInput] = useState(false);

  const limitText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 80) {
      setText(e.target.value);
    }
  };

  const chekedInput = () => {
    inputRef.current?.click();
    setInput(true);
  };

  const handleFormatClick = (command: string) => {
    if (command === "clear") {

      if (editorRef.current) {
        editorRef.current.textContent = "";
        setTextArea("");
      }
    } else {
      document.execCommand(command, false, "");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__body}>
        <div className={styles.card__body__from}>
          <input
            ref={fromRef}
            maxLength={80}
            placeholder={"Кому:"}
            type="text"
          />
        </div>
        <div className={styles.card__body__topic}>
          <input
            value={textLock}
            onChange={limitText}
            placeholder={"Тема:"}
            type="text"
          />
          <div className={styles.topic}>{80 - textLock.length}</div>
        </div>
          <div className={styles.card__body__areaText}>
            <div className={styles.card__body__areaText}>
              <div
                ref={editorRef}
                contentEditable
                className={styles.textarea}
                onInput={(e) => setTextArea(e.currentTarget.textContent || '')}
              />
            </div>
          </div>
        <input
          ref={inputRef}
          className={`${styles.input_file} ${input ? styles.input_filePut : ""}`}
          type="file"
        />
        <div className={styles.card__body__menu}>
          <div>
            <button onClick={() => handleFormatClick('clear')} className={styles.lucide}><Trash2/></button>
            <button onClick={() => handleFormatClick("bold")} className={styles.lucide}><Bold/></button>
            <button onClick={() => handleFormatClick("italic")} className={styles.lucide}><Italic/></button>
            <button onClick={() => handleFormatClick("underline")} className={styles.lucide}><Underline/></button>
            <button onClick={chekedInput} className={styles.lucide}><Paperclip/></button>
          </div>
          <button
            // onClick={handleClick}
            onClick={() => handleClick(inputRef, editorRef, fromRef, textLock, setText)}
            className={styles.submite}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
