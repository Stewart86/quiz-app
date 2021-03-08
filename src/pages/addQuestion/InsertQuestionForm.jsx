import { Card, CardContent, CardHeader } from "@material-ui/core"

import Editor from "rich-markdown-editor"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { uploadImage } from "../../storage/questions"

const useStyles = makeStyles((theme) => ({
  editorWrapper: {
    paddingLeft: theme.spacing(5),
  },
  editor: {
    ...theme.typography.body1,
    backgroundColor: theme.palette.background.paper,
    maxWidth: "50vw",
  },
}))

export const InsertQuestionForm = ({
  question,
  editorTitle,
  handleEditorChange,
}) => {
  const classes = useStyles()

  const handleUploadImage = async (file) => {
    const url = await uploadImage(editorTitle, file)
    return url
  }

  return (
    <Card>
      <CardHeader title={editorTitle} />
      <CardContent className={classes.editorWrapper}>
        <Editor
          value={question}
          className={classes.editor}
          onChange={handleEditorChange}
          placeholder={`Enter your ${editorTitle.toLowerCase()} here...`}
          uploadImage={async (file) => handleUploadImage(file)}
        />
      </CardContent>
    </Card>
  )
}
