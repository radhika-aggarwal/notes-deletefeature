const form= document.getElementById('noteForm');
const input= document.getElementById('noteInput');
const button= document.querySelector('button');
const container= document.getElementById('notesContainer');

form.addEventListener('submit', (event)=>{
	event.preventDefault();
	fetch('http://localhost:3000/notes',{
	method:'POST',
	headers: {
    		'Content-Type': 'application/json'
  	},
  	body: JSON.stringify({	
    		body: input.value,
  	})

	})
	.then(res=> res.json())
	.catch(err=> console.error('ERROR:', err));
	loadNotes();
})

const loadNotes= ()=>{
	fetch('http://localhost:3000/notes')
		.then(res=> res.json())
		.then(notes=> {
		container.innerHTML='';

		notes.forEach(note=>{
			const div= document.createElement('div');
			div.className= 'note';
			div.innerText= note.body;
			const dltbtn= document.createElement('button');
			dltbtn.innerText= 'Delete';
			dltbtn.onclick= ()=> deletenote(note.id);
		
			div.appendChild(dltbtn);
			container.appendChild(div);
		});
	})
	.catch(err=> console.log('ERROR:' , err));
	
};
	
const deletenote= (id)=> {
	fetch(`http://localhost:3000/notes/${id}`, {
		method: 'DELETE'
	})
	.then(res=> res.json())
	.then(()=> loadNotes())
	.catch(err=> console.log('error:', err));
}	

