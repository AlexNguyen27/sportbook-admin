import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import Button from "@material-ui/core/Button";

const TextEditor = ({ className, style, value, placeholder, onChange }) => {
  // EDIT RAW STATE
  const [raw, setRaw] = useState({
    rawHtml: value,
    editorHtml: ""
  });
  // SHOW EDIT RAW STATE
  const [showRaw, setShowRaw] = useState(false);
  // DESTRUCTURE EDIT RAW DATA
  const { rawHtml, editorHtml } = raw;
  // CALL WHEN CHANGE TEXT INPUT
  useEffect(() => {
    setRaw({
      ...raw,
      editorHtml: value
    });
  }, [value]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["link", "image", "video"],
      ["clean"]
    ]
  };

  // HANDLE ON CLICK RAW
  const handleClickShowRaw = () => {
    setShowRaw(!showRaw);
    syncViews(!showRaw);
  };

  // ON CHANGE TEXT RAW INPUT
  const handleChangeRaw = html => {
    setRaw({ ...raw, rawHtml: html });
  };

  const syncViews = fromRaw => {
    if (fromRaw) setRaw({ ...raw, editorHtml: rawHtml });
    else setRaw({ ...raw, rawHtml: editorHtml });
  };

  return (
    <div className={(showRaw ? "showRaw " : " ") + className}>
      {/* RAW BUTTON */}
      <div>
        <Button
          component="span"
          className="rawButton d-none"
          onClick={() => {
            handleClickShowRaw();
          }}
        >
          Raw Text
        </Button>
      </div>

      <ReactQuill
        placeholder={placeholder}
        style={style}
        value={value}
        modules={modules}
        onChange={value => {
          onChange(value);
          handleChangeRaw(value);
        }}
      />

      {/* TEXTAREA FOR RAW */}
      <textarea
        className={"raw-editor d-none"}
        onChange={e => {
          handleChangeRaw(e.target.value);
          onChange(e.target.value);
        }}
        value={rawHtml}
      />
    </div>
  );
};

export default TextEditor;
