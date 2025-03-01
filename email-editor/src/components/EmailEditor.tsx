import styles from "./EmailEditor.module.scss";
import React, { useRef, useState } from "react";
import {Trash2, Bold, Italic, Underline, Paperclip} from "lucide-react";
import {TType} from "./TextArea.ts";
import {editTextArea} from "./TextArea.ts";

export function EmailEditor() {
  const [textLock, setText] = useState('');  // Состояние для "Тема"
  const [text, setTextArea] = useState('');  // Состояние для текста в textarea

  const limitText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 80) {
      setText(e.target.value);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonInInput = () => {
    inputRef.current?.click()
  }

  const textRef = useRef<HTMLTextAreaElement>(null);

  const getSelectionText = (): string => {
    if (!textRef.current) return ''; // если ссылки нет, возвращаем пустую строку

    const cursorStart = textRef.current.selectionStart ?? 0;
    const cursorEnd = textRef.current.selectionEnd ?? 0;

    return textRef.current.value.substring(cursorStart, cursorEnd);
  };

  const handleFormatClick = (type: TType) => {
    const selectedText = getSelectionText(); // Теперь это строка, а не void

    if (selectedText) {
      const start = textRef.current?.selectionStart ?? 0;
      const end = textRef.current?.selectionEnd ?? 0;

      const formattedText = editTextArea(type, selectedText);
      const newText = text.substring(0, start) + formattedText + text.substring(end);

      setTextArea(newText);
    }
  };


  // Обработчик изменений для текста в textarea
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__body}>
        <div className={styles.card__body__from}>
          <input maxLength={80} placeholder={'Кому:'} type="text" />
        </div>
        <div className={styles.card__body__topic}>
          <input
            value={textLock}
            onChange={limitText}
            placeholder={'Тема:'}
            type="text"
          />
          <div className={styles.topic}>{80 - textLock.length}</div>
        </div>
        <div className={styles.card__body__areaText}>
          <textarea
            value={text}  // Используем 'text' для значения textarea
            onChange={handleTextChange}  // Обработчик изменений для textarea
            onClick={getSelectionText}
            ref={textRef}
            placeholder={'Введите текст...'}
          ></textarea>
        </div>
        <input
          ref={inputRef}
          className={styles.input_file} type="file"
        />
        <div className={styles.card__body__menu}>
          <div>
            <button className={styles.lucide}><Trash2/></button>
            <button onClick={() => handleFormatClick('bold')} className={styles.lucide}><Bold/></button>
            <button onClick={() => handleFormatClick('italic')} className={styles.lucide}><Italic/></button>
            <button onClick={() => handleFormatClick('underline')} className={styles.lucide}><Underline/></button>
            <button onClick={buttonInInput} className={styles.lucide}><Paperclip/></button>
          </div>
          <button
            ref={buttonRef}
            className={styles.submite}>Отправить</button>
        </div>
      </div>
    </div>
  );
}
