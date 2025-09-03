const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

morgan.token("body", (req) => {
  return req.method === "POST" || req.method === "PUT"
    ? JSON.stringify(req.body)
    : "";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

app.get("/info", (request, response) => {
  response.writeHead(200, {});
  Person.find({}).then((persons) => {
    response.end(
      `Phonebook has info for ${
        persons.length
      } people\n\n${new Date().toString()}`
    );
  });
});

app.get("/api/persons", (request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
  });
  Person.find({}).then((persons) => {
    response.end(JSON.stringify(persons));
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: "name or phone number is missing",
    });
  }

  // if (persons.map((person) => person.name).includes(body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({
    number: body.number,
    name: body.name,
    //id: generateId(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);
