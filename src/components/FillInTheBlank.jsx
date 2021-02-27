import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextareaAutosize,
} from "@material-ui/core"
import React, { useState } from "react"

import { ConvertToFillInTheBlank } from "./ConvertToFillInTheBlank"
import { FillInTheBlankGuideModal } from "./FillInTheBlankGuideModal"
import { Help } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  editor: {
    width: "100%",
    padding: theme.spacing(1),
    fontSize: theme.typography.fontSize,
    lineHeight: 2,
  },
  input: {
    textAlign: "center",
    width: "7.5em",
  },
}))

export const FillInTheBlank = ({ question, handleSetQuestion }) => {
  const classes = useStyles()
  const [rawText, setRawText] = useState(question.question || "")
  const [openGuide, setOpenGuide] = useState(false)

  const convertToBlank = (event) => {
    setRawText(event.target.value)
    handleSetQuestion(event.target.value)
  }

  const handleGuideClose = () => {
    setOpenGuide(false)
  }

  return (
    <>
      <Grid item>
        <Card>
          <CardHeader
            title={"Fill in The Blank - Builder"}
            action={
              <IconButton onClick={() => setOpenGuide(true)} size={"small"}>
                <Help />
              </IconButton>
            }
          />
          <CardContent>
            <TextareaAutosize
              value={rawText}
              rowsMin={8}
              onChange={(event) => convertToBlank(event)}
              className={classes.editor}
              placeholder={"Type your sentence here..."}
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardHeader title={"Preview"} />
          <CardContent>
            <ConvertToFillInTheBlank rawText={rawText} />
          </CardContent>
        </Card>
      </Grid>
      <FillInTheBlankGuideModal
        open={openGuide}
        handleClose={handleGuideClose}
      />
    </>
  )
}
