const input = document.getElementById('input');
const date = document.getElementById('date');
const circle = document.querySelector('.circle');
const list = document.getElementById('list-toDos');
const clear = document.getElementById('clear');


circle.addEventListener('click', () => {
    input.style.display = 'block';
});

//date

let options = { weekday: 'long', month: 'short', day: 'numeric' };

let today = new Date();

date.innerHTML = today.toLocaleDateString("en-US", options);

//Add Todo

const CHECK = "tick-through";
const LINE_THROUGH = "line-through";
const UNCHECK = "tick";

//VARIABLES
let LIST, id;

//GET ITEM FROM LOCALSTORAGE
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}


//LOADING DATA FROM LOCALSTORAGE
function loadList(array) {
    array.forEach(item => {
        addTodo(item.title, item.id, item.done, item.trash);
    });
}



function addTodo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    let text = `
        <li class="item">
            <i class="fa fa-circle-thin ${DONE}" id="${id}" job="complete"></i>
            <span id="${id}" class="${LINE} toDo">${toDo}</span>
            <i class="fa fa-trash-o delete" id="${id}" job="delete"></i>
        </li>
    `;

    let position = "beforeend";

    list.insertAdjacentHTML(position, text);
}


document.addEventListener("keyup", (event) => {

    if (event.keyCode == 13) {
        const toDo = input.value;

        if (toDo != "") {
            addTodo(toDo, id, false, false);

            LIST.push({
                title: toDo,
                id: id,
                done: false,
                trash: false
            });


        }
        //ADD ITEM TO LOCALSTORAGE
        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
        input.value = "";
    }
});


function completeTodo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);

    element.parentNode.querySelector(".toDo").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener('click', (event) => {
    let element = event.target;
    let elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeTodo(element);
    } else if (elementJob == "delete") {
        removeTodo(element);
    }

    //ADD ITEM TO LOCALSTORAGE
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


//clear item from localstorage
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})