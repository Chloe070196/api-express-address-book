const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts");
const meetings = require("../data/meetings")

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// CORE
const findContactBy = (id) => contacts.find((contact) => contact.id === id);
const findMeetingtBy = (id) => meetings.find((meeting) => meeting.id === id);

const getIdFromParams = (params) => {
  const { id } = params;
  const idNum = parseInt(id);
  return idNum;
};

app.get("/contacts", (req, res) => {
  return res.json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;

  newContact.id = contacts.length + 1;
  contacts.push(newContact);

  return res.status(201).json({ contact: newContact });
});

app.get("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  return res.json({ contact: foundContact });
});

app.delete("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  const index = contacts.indexOf(foundContact);

  contacts.splice(index, 1);

  return res.json({ contact: foundContact });
});

app.put("/contacts/:id", (req, res) => {
	const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  const index = contacts.indexOf(foundContact);
	const updatedContact = req.body;

	updatedContact.id = id;
	contacts.splice(index, 1, updatedContact)

	return res.json({"contact": updatedContact})
});

// EXTENSION

app.get('/meetings', (req, res) => (res.json({"meetings": meetings})))

app.get('/meetings/:id', (req, res) => {
	const id = getIdFromParams(req.params)
	const foundMeeting = findMeetingtBy(id)
	return res.json({"meeting": foundMeeting})
})

app.delete('/meetings/:id', (req, res) => {
	const id = getIdFromParams(req.params)
	const foundMeeting = findMeetingtBy(id)
  const index = meetings.indexOf(foundMeeting);

	meetings.splice(index, 1)
	return res.json({"meeting": foundMeeting})
})

module.exports = app;
