const express= require('express');
const app= express();
const path = require('path');



app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let notes= [];
let id=1;
app.get('/notes', (req,res)=>{
	res.send(notes);
});

app.post('/notes', (req,res)=>{
	const notedata= {
		id: id++,
		body: req.body.body
	};
	notes.push(notedata);
	res.send('note received');
});
app.delete('/notes/:id', (req,res)=>{
	const idToDelete = parseInt(req.params.id);
	notes = notes.filter(note => note.id !== idToDelete);
	res.json({ message: 'Note deleted' });
})

app.listen(3000, ()=>{
	console.log('Server is running at http://localhost:3000');
})
