let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textArea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');


//form validation 
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    formValidation();
});

let formValidation = () =>{
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Text cannot be blank";
    }else{
        console.log('Success')
        msg.innerHTML = "";
        acceptData();

        //how to make modal close automatically
        add.setAttribute("data-bs-dismiss", "modal")
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();

    }
};

//collection of data

let data= [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textArea.value,
    });
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
};


//creating new tasks

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };

  //the reset form function 
  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
  };

  //function to delete a task

  let deleteTask = (e) =>{
      e.parentElement.parentElement.remove();
      data.splice(e.parentElement.parentElement.id, 1);
      localStorage.setItem("data", JSON.stringify(data));
      console.log(data)
  };

  let editTask = (e) =>{
      let selectedTask = e.parentElement.parentElement;
      textInput.value = selectedTask.children[0].innerHTML;
      dateInput.value = selectedTask.children[1].innerHTML;
      textArea.value = selectedTask.children[2].innerHTML;

      deleteTask(e);
  };

  //retrive data from local storage after refreshig

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })()
