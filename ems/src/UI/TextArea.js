import { useRef } from "react";
const TextArea = (props) => {
  const textElement = useRef();
  const { type } = props;
  function handleTextAreaChange(event) {
    props.onTextChange(event.target.value,type);
  }
  return (
    <>
      <textarea
        id="message"
        type="text"
        name="message"
        rows={"5"}
        ref={textElement}
        defaultValue=""
        style={{ width: "100%" }}
        onChange={handleTextAreaChange}
      />
    </>
  );
};

export default TextArea;
