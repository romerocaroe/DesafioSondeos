const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = [],
	id = 0;

//Obtener los items
let data = localStorage.getItem("TODO");

//Verificar si esta vacio
if (data) {
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);
} else {
	//Si no esta vacio 
	LIST = [];
	id = 0;
}

//
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

//Mostrar la fecha
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("es-ar", options);

//funcion to-do 
function addToDo(toDo, id, done, trash){
	if(trash){return;}
	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";
	const item = '<li class="row border-bottom border-top item">'
					+ '<i class="col-1 col-lg-1 item1 fa '+DONE+' co" job="complete" id="'+id+'"></i>'
					+'<p class="col-8 col-lg-10 item1 text'+LINE+'">'+ toDo +'</p>'
					+'<i class="col-1 col-lg-1 item1 fa fa-trash-o de" job="delete" id="'+id+'"></i>'
					+'</li>';
	const position = "beforeend";

	list.insertAdjacentHTML(position, item); 
}

//"enter" evento
document.addEventListener("keyup", function(even){
	if (event.keyCode == 13) {
		const toDo = input.value;
		if(toDo.length >= 1){
			addToDo(toDo, id, false, false);

			LIST.push({
				name : toDo,
				id : id,
				done : false,
				trash : false
			});
			document.getElementById("input").value = "";
			id++;
		}else if (toDo == "") {alert("No se puede agregar una tarea vacia!");}
	}
});

//Tarea finalizada
function completeToDo(element, elementJob){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Borrar la tarea
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);

	LIST[element.id].trash = true;
}

//Orientar los elementos
list.addEventListener("click", function(event){
	const element = event.target; 
	const elementJob = element.attributes.job.value;

	if(elementJob == "complete"){
		completeToDo(element, elementJob);
	} else if (elementJob == "delete") {
		removeToDo(element);
	}
})