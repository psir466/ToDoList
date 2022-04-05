class TaskClass{

    constructor(indCheck, nameTask, indBarr) {
        this.indCheck = indCheck;
        this.nameTask = nameTask;
        this.indBarr = indBarr;
    }

}


function removeTask(x){

    let parentTask = x.parentElement;

    parentTask.remove();

    reLoadFromDomToArray();


}

function getThrougTask(x){

    let nextSibling = x.nextElementSibling;


    if(nextSibling.style.textDecoration !== "line-through") {

        nextSibling.style.textDecoration = "line-through";

    }else{

        nextSibling.style.textDecoration = "none";

    }

    //nextSibling.setAttribute("style", "text-decoration: line-through;");

    reLoadFromDomToArray();
}

function addJsonObjectList(nameTask, indCheck, indBarr){

    let task = new TaskClass(indCheck, nameTask, indBarr);
    taskListTab.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskListTab));

}

function createLi(task, indCheck, indBarr){
    // créer un <li>
    let newLi = document.createElement('li');
    // créer un span
    let newSpan = document.createElement('span');
    // créer un button delete
    let newDteleteButton = document.createElement("button");
    // créer checkBox
    let newCheckBox = document.createElement("input");

    // association avec li

    newLi.appendChild(newCheckBox);
    newLi.appendChild(newSpan);
    newLi.appendChild(newDteleteButton);

    newLi.classList.add("item");
    newSpan.classList.add("task");
    newDteleteButton.classList.add("delete-btn");
    newDteleteButton.classList.add("fa");
    newDteleteButton.classList.add("fa-close");
    newCheckBox.type = "checkbox";

    newSpan.innerHTML = task;

    if(indBarr === true){
        newSpan.style.textDecoration = "line-through"
    }

    if(indCheck === true){
        newCheckBox.checked = true;
    }

    newDteleteButton.addEventListener("click", function (){
        removeTask(newDteleteButton);
    });

    newCheckBox.addEventListener("change", function (){
        getThrougTask(newCheckBox);
    });


    taskList.appendChild(newLi);


}

function reLoadFromDomToArray(){

    console.log("knlknklnkl");

    taskListTab = [];

    let itemList = document.querySelectorAll(".item");

    itemList.forEach(x => {

        let taskc = x.querySelector(".task");
        let checkTaskc = x.querySelector(".checkTask");

        let indBarr = false;
        let indCheckBox = false;

        if(taskc.style.textDecoration == "line-through"){
            indBarr = true;
            indCheckBox = true;
        }

        addJsonObjectList(taskc.innerHTML, indCheckBox, indBarr);

    })

}

function displayList(){

    if(taskListTab.length !== 0) {

        for(let i = 0; i < taskListTab.length; i++) {

            createLi(taskListTab[i].nameTask, taskListTab[i].indCheck, taskListTab[i].indBarr);
        }
    }
}




let taskListTab = JSON.parse(localStorage.getItem("tasks")) || [];


let btnInputTask = document.getElementById("add-task-button");
let inputTask = document.getElementById("input-task");
let taskList = document.getElementById("task-list")
let btnDelete = document.querySelectorAll(".delete-btn");
let checktask = document.querySelectorAll(".checkTask");


displayList();

btnInputTask.addEventListener("click", function () {

    let task = inputTask.value;

    if (task == " ") {
        alert("Task is empty !!!");
        return;
    }

    createLi(task, false, false);

    addJsonObjectList(task, false, false);

    inputTask.value = " ";


});

btnDelete.forEach(x => x.addEventListener("click", function () {
    removeTask(x);

}));

checktask.forEach(x => x.addEventListener("change", function () {

    getThrougTask(x);

}));