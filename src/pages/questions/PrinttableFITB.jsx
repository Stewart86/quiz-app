import { Card, CardContent, CardHeader } from "@material-ui/core"

import { ConvertToFillInTheBlank } from "../../components/ConvertToFillInTheBlank"
import React from "react"

export const PrinttableFITB = ({ question, count }) => {
  return (
    <Card>
        <CardHeader
          title={`Question ${count}`}
          subheader={`${question.subject} | ${question.level} | ${question.topic}`}
        />
      <CardContent>
        <ConvertToFillInTheBlank rawText={question.question} />
      </CardContent>
    </Card>
  )
}
