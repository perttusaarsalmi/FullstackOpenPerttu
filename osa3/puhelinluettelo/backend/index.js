const express = require('express')
const app = express()

let persons = [
  { name: "Arto Hellas", number: "040-123456" },
  { name: "Ada Lovelace", number: "39-44-5323523" },
  { name: "Dan Abramov", number: "12-43-234345" },
  { name: "Mary Poppendieck", number: "39-23-6423122" },
];

app.get("/api/persons", (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(persons));
});


const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
