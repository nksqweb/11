export const handleClick = (
  inputRef: React.RefObject<HTMLInputElement>,
  editorRef: React.RefObject<HTMLDivElement>,
  fromRef: React.RefObject<HTMLInputElement>,
  textLock: string,
  setText: React.Dispatch<React.SetStateAction<string>>
) => {
  if (
    !fromRef.current?.value.trim() ||
    !textLock.trim() ||
    !editorRef.current?.textContent?.trim()
  ) {
    alert("Заполните все поля!");
    return
  }

  if (inputRef.current && fromRef.current && editorRef.current !== null) {
    console.log(inputRef.current.files)
    console.log(fromRef.current.value)
    console.log(textLock.valueOf())
    console.log(editorRef.current.textContent)

    inputRef.current.value = ""
    fromRef.current.value = ""
    setText('')
    editorRef.current.textContent = " "
  }
  return
}