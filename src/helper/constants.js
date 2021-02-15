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
  { field: "id", headerName: "ID", width: 140 },
  { field: "subject", headerName: "Subject", width: 140 },
  { field: "level", headerName: "Level", width: 140 },
  { field: "type", headerName: "Type", width: 140 },
  { field: "question", headerName: "Question", width: 300 },
  { field: "answer", headerName: "Answer", type: "number", width: 70 },
  { field: "explain", headerName: "Explaination", width: 300 },
]
