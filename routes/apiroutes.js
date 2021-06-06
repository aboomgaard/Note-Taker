const fs = require('fs');
const path = require("path");


const { v4: uuidv4 } = require('uuid');
//require the database json file
let notesDB = require('../db/db.json');

module.exports = (app) => {


  app.get('/api/notes', (req, res) => {
        return res.json(notesDB)
    });

  app.post('/api/notes', (req, res) => {
            req.body.id=uuidv4()
      //push the notes onto the page
      notesDB.push(req.body);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesDB), function(err)
      {
        if (err)throw err
        console.log(notesDB);
        console.log(__dirname);
        res.json(notesDB);
      });
    
  });

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
