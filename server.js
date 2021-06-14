const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
let notes = require("./db/db.json");

app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res){
    fs.readFile("db/db.json", "utf8", function (err, data){
        if (err){
            console.log(err);
            return;
        }
        res.json(notes);
    });
});

app.listen(PORT, function(){
    console.log(`App listening on ${PORT}`);
});

app.post("api/notes", function (req, res){
    let randomLetter = String.fromCharCode(65 + Math.floor(Math.random()*26));
    let id = randomLetter + Date.now();
    let newNote = {
        id: id,
        title: req.body.title,
        text:req.body.text,
    };
    console.log(typeof notes);
    notes.push(newNote);
    const stringifyNote = JSON.stringify(notes);
    res.json(notes);
    fs.writeFile("db/db.json", stringifyNote, (err) => {
        if (err) console.log(err);
        else{
            console.log("Your note was saved to db.json");
        }
    });
});

app.delete("/api/notes/:id", function (req, res){
    let noteID = req.params.id;
    fs.readFile("db/db.json", "utf8", function (err, data){
        let updatedNotes = JSON.parse(data).filter((note)=>{
            console.log("note.id", note.id);
            console.log("noteID", noteID);
            return note.id !== noteID;

        });
        notes = updatedNotes;
        const stringifyNote = JSON.stringify(updatedNotes);
        fs.writeFile("db/db.json", stringifyNote, (err) =>{
            if (err) console.log(err);
            else{
                console.log("Your Note was deleted from db.json");
            }
        });
        res.json(stringifyNote);
    });
});

app.get("*", function (req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});