import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Grid,
  TextareaAutosize,
} from "@material-ui/core"
import React, { useState } from "react"

export const FillInTheBlank = () => {
  const [text, setText] = useState("")
  const [wordList, setWordList] = useState([])

  const handleChange = (e) => {
    setText(e.target.value)
    setWordList(SplitTextIntoButton())
  }
  const SplitTextIntoButton = () => {
    var getWordRe = /\w+/g

    const wordOnly = text.match(getWordRe)
    console.log(wordOnly)
    //   wordOnly.map((item) => (
    //         <Typography>{item}</Typography>
    //     ))
    return wordOnly
  }

  return (
    <Grid item container justify={"space-evenly"}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={"Fill In The Blank"} />
          <CardContent>
            <form>
              <FormControl>
                <FormLabel component={"legend"}>Enter sentences</FormLabel>
                <TextareaAutosize
                  onKeyDown={handleChange}
                  style={{ flex:1, width:"40vw", marginTop: 10 }}
                  rowsMin={10}
                />
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {wordList &&
        wordList.map((word, i) => (
          <Grid item xs={4}>
            <Button key={i.toString()}>{word}</Button>
          </Grid>
        ))}
    </Grid>
  )
}
