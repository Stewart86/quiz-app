import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { getCategories, getQuestions } from "../firestore/questions"

import { Dropdown } from "../components/Dropdown"
import { Loading } from "../components/Loading"
import { Printable } from "../pages/Printable"
import { getFirstArrayInObj } from "../helper/utilities"

export default function QuestionsSelection() {

  const [state, setState] = useState({})
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState({})
  const [showPrintable, setShowPrintable] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories()
      setState(getFirstArrayInObj(categories))
      setData(categories)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleOnChange = (e, type) => {
    setState({
      ...state,
      [type]: e.target.value,
    })
  }

  const handlePrintable = async () => {
    setLoading(true)
    setQuestions(await getQuestions(state))
    setShowPrintable(true)
    setLoading(false)
  }

  const handleGetQuestions = async () => {
    setLoading(true)
    setQuestions(await getQuestions(state))
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : showPrintable ? (
        <Printable questions={questions} />
      ) : (
        <Card>
          <CardContent>
            <CardHeader title={"Question Selection"} />
            {Object.keys(data).map((k, i) => {
              return (
                <Dropdown
                  key={i}
                  handleOnChange={handleOnChange}
                  state={state}
                  data={data}
                  type={k}
                />
              )
            })}
          </CardContent>
          <CardActionArea>
            <CardActions>
              <Button onClick={handlePrintable}>Printable</Button>
              {/* TODO: number of question, timer, generate pdf, questions */}
              <Button onClick={handleGetQuestions}>Start</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      )}
    </>
  )
}
