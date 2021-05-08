// Elements
const elements = document.querySelectorAll('.btn');

// Event
elements.forEach(element => {
	element.addEventListener('click', () => {
		let command = element.dataset['element'];
		
		if (command == 'createLink' || command == 'insertImage') {
			let url = prompt('Enter the link here:', 'http://');
			document.execCommand(command, false, url);
		} else {
			document.execCommand(command, false, null);
		}
	});
});

//redo and undo
const commands = []
const input = document.querySelector('input')

function saveCommand(e) {
  commands.push({
    // the action is also saved for implementing redo, which
    // is not implemented in this example.
    action: { type: 'add', key: e.key, index: input.selectionStart },
    inverse: { type: 'remove', index: input.selectionStart }
  })
}

function undo() {
  let value = input.value.split('')
  const lastCommand = commands.pop()
 
  if (!lastCommand) return
    
  switch (lastCommand.inverse.type) {
    case 'remove':
      value.splice(lastCommand.inverse.index, 1)
      break;      
  }
  
  input.value = value.join('')
}