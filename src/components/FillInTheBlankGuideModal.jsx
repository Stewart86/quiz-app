import { Dialog, Typography } from "@material-ui/core"

import React from "react"

export const FillInTheBlankGuideModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <ul>
        <li>
          <Typography variant={"h6"}>Open Entry</Typography>
          <Typography paragraph variant={"body2"}>
            {`Use curly braces "{}" to encapsulate the answer to be converted into blank space for students to input.`}
          </Typography>
          <Typography variant={"body2"}>
            {`For example, to convert "are" in this sentance into a input area: `}
          </Typography>
          <Typography
            paragraph
            variant={"subtitle1"}
            style={{ color: "gray" }}
            component={"span"}>
            {"How {are} you?"}
          </Typography>
        </li>
        <br />
        <li>
          <Typography variant={"h6"}>Dropdown</Typography>
          <Typography paragraph variant={"body2"}>
            {`To add options for students to choose from, use curly braces "{}" to encapsulate the asnwer follow by colon character ":" and separate each word(s) option with pipe character "|".`}
          </Typography>
          <Typography variant={"body2"}>
            {`For example, to convert the word "are" in this sentence into an input with these options "is, were or are": `}
          </Typography>
          <Typography
            paragraph
            variant={"subtitle1"}
            style={{ color: "gray" }}
            component={"span"}>
            {"How {are: is|were|are} you?"}
          </Typography>
        </li>
      </ul>
    </Dialog>
  )
}
