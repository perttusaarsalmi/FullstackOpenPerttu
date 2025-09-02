const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.json());
app.use(cors());

//const password = process.argv[2]
// const url = `mongodb+srv://perttusaarsalmi_db_user:${password}@cluster0.ovwckyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const url = process.env.MONGODB_URI
console.log(url);
mongoose.set('strictQuery',false)
mongoose.connect(url)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

morgan.token("body", (req) => {
  return req.method === "POST" || req.method === "PUT"
    ? JSON.stringify(req.body)
    : "";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static('dist'));


app.get("/info", (request, response) => {
  response.writeHead(200, {});
  response.end(
    `Phonebook has info for ${
      persons.length
    } people\n\n${new Date().toString()}`
  );
});

app.get("/api/persons", (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  Person.find({}).then((persons) => {
    response.end(JSON.stringify(persons));
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: "name or phone number is missing",
    });
  }

  if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    number: body.number,
    name: body.name,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};
