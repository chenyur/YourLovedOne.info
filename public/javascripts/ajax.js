'use strict';

document.addEventListener('DOMContentLoaded', init);
let entriesCount = 0;
let timeout = 1000;

function init() {
	console.log('ajax!!');
	update();
	let interval = window.setInterval(update, timeout);
}

function update() {
	let queryField = document.getElementById('query');
	let nameRadio = document.getElementById('nameRadio');
	let diasterRadio = document.getElementById('diasterRadio');
  	let req = new XMLHttpRequest();
  	req.open('POST', '/view', true);
  	req.addEventListener('load', handleLoad); 
  	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	let body = "query="+queryField.value+"&name="+nameRadio.checked+"&diaster="+diasterRadio.checked;
  	req.send(body);
}

function handleLoad() {
	let data = JSON.parse(this.responseText); 
	console.log(data);

	let searchBy;

	//check if no data
	let noData = false;
	if(data == 0) noData = true;
	if(noData) {
		console.log('nodata!');
		let errorDiv = document.querySelector('#errordiv');
		errorDiv.classList.toggle("hidden");
		setTimeout(() => {errorDiv.classList.toggle("hidden");}, timeout);
	}
	if(!noData) {
		if ('name' in data[0]) searchBy = 'Name';
		else if ('title' in data[0]) searchBy = 'Disaster';
		else console.log('tbody is empty');
	}

	if((searchBy == 'Name') || (searchBy == 'Disaster')) document.getElementById('searchBy').innerHTML = searchBy;
	let tbody = document.querySelector('tbody');

	for (let k = 0; k < entriesCount; k++) {
	    	tbody.removeChild(tbody.lastChild);
	}
	entriesCount = 0;
	if(!noData) {
		for (let entry of data) {
			console.log('entry:', entry);
			let newRow = document.createElement('tr');
			let td1 = document.createElement('td');
			if(searchBy === 'Name') td1.appendChild(document.createTextNode(entry.name));
			else td1.appendChild(document.createTextNode(entry.title));
			let td2 = document.createElement('td');
			console.log(marked(entry.message));
			td2.insertAdjacentHTML('afterbegin', marked(entry.message));
			entriesCount++;
			
			newRow.appendChild(td1);
			newRow.appendChild(td2);
			tbody.appendChild(newRow);	
		}
	}

}
