import { Editor } from "@tinymce/tinymce-react"
import InsertMultipleChoice from "../components/InsertMultipleChoice";
import React from "react"
import { Typography } from "@material-ui/core"

export default function InsertQuestion() {
   const handleEditorChange = (content, editor) => {
     console.log('Content was updated:', content);
   }
  return (
    <>
      <Typography variant={"h2"}>Insert Question</Typography>

      <Editor
        initialValue='<p>This is the initial content of the editor</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            `undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help`,
        }}
        onEditorChange={handleEditorChange}
      />
      <InsertMultipleChoice/>
    </>
  )
}
