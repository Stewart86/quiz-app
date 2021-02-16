export const types = ["Multiple Choice", "Fill In The Blank", "Notes"]
export const subjects = ["English", "Maths", "Science", "Chinese"]
export const levels = [
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
]

export const dataColumn = [
  { field: "id", headerName: "ID", width: 210 },
  { field: "type", headerName: "Type", width: 140 },
  { field: "question", headerName: "Question", width: 300 },
  { field: "choices", headerName: "Choices", width: 200 },
  { field: "answer", headerName: "Answer", type: "number", width: 100 },
  { field: "explain", headerName: "Explaination", width: 300 },
]

export const defaultRow = [
  {
    id: "",
    subject: "",
    level: "",
    type: "",
    question: "",
    answer: "",
    explain: "",
  },
]
