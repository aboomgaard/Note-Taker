const fs = require('fs');
const path = require("path");

//require uuid so that it will assign the notes random ids
const { v4: uuidv4 } = require('uuid');
//require the database json file
let notesDB = require('../db/db.json');

module.exports = (app) => {

//return the json version of notesDB to the url/api/notes
  app.get('/api/notes', (req, res) => {
        return res.json(notesDB)
    });

//post the notes
  app.post('/api/notes', (req, res) => {
      //assign each note a random id
      req.body.id=uuidv4()
      //push the notes onto the page
      notesDB.push(req.body);
      //stringify notes db, check for an error
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesDB), function(err)
      {
        if (err)throw err
        console.log(notesDB);
        console.log(__dirname);
        res.json(notesDB);
      });
    
  });

//delete the notes
  app.delete('/api/notes/:id', (req, res) => {
      //request the random id assigned by uuid
      const id = req.params.id
      //filter the notes by id
      notesDB = notesDB.filter(note => note.id !== id);
      //write to the file that the note has been deleted (remove the note from the file)
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesDB), function
      (err){
        if (err)throw err
        console.log(notesDB);
        console.log(__dirname);
        res.json(notesDB);
      });

  })

};

//This is a note that I am putting in as a test
