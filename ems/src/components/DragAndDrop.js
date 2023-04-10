import React, { useEffect } from "react";
import classes from "./DragAndDrop.module.css";
import Card from "../UI/Card"
import { useState } from "react";
const DragAndDrop = (props) => {
    useEffect(() => {
      if(props.undo.length === 0)
        setAdded(false);
    },[props.undo])

    const [added, setAdded] = useState(false);
    const [fileName, setFileName] = useState("");
    const dragOver = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    setFileName(e.dataTransfer.files[0].name)
    props.onFileDrop(e);
    setAdded(true);
  };

  return (
    <>
      <div className={classes.container}>
        <Card>
          <div
            className={classes["drop-container"]}
            onDragOver={dragOver}
            onDragEnter={dragOver}
            onDragLeave={dragOver}
            onDrop={fileDrop}
          >
            {!added && (
              <div className={classes["drop-message"]}>
                <div className={classes["upload-icon"]}></div>
                Drag & Drop Excel files here or click to upload
              </div>
            )}
            {added && (
              <div className={classes["drop-message"] + " " + classes.disabled}>
                {`Added ${fileName} Excel file.`}
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};
export default DragAndDrop;
