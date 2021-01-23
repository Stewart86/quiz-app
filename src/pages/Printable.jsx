import { Grid } from "@material-ui/core"
import Question from "../components/Question"
import React from "react"

export const Printable = () => {
  const questions = [
    {
      question: `<p>This is a test
Spending time at national parks can be an exciting adventure, but this wasn't the type of excitement she was hoping to experience. As she contemplated the situation she found herself in, she knew she'd gotten herself in a little more than she bargained for. It wasn't often that she found herself in a tree staring down at a pack of wolves that were looking to make her their next meal.
</p><p>
The shoes had been there for as long as anyone could remember. In fact, it was difficult for anyone to come up with a date they had first appeared. It had seemed they'd always been there and yet they seemed so out of place. Why nobody had removed them was a question that had been asked time and again, but while they all thought it, nobody had ever found the energy to actually do it. So, the shoes remained on the steps, out of place in one sense, but perfectly normal in another.
</p>
      `,
      choices: ["hello", "world", "this is the answer", "Welcome to my world"],
    },
  ]

  const tempRangeLoop = (questions, range) => {
    let result = []
    for (let i = 0; i < range; i++) {
      result.push(<Question key={i} count={i + 1} question={questions[0]} />)
    }
    return result
  }
  return (
    <Grid container direction='column' xs={12} spacing={7}>
      {tempRangeLoop(questions, 10)}
    </Grid>
  )
}
