function getAllTask() {

  return new Promise((resolve, reject) => {
    // Creating Our XMLHttpRequest object 
    let xhr = new XMLHttpRequest();

    // Making our connection  
    let url = 'http://localhost:4500/api/task/';
    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          return resolve(JSON.parse(this.responseText)); 
        }
    }
    // Sending our request 
    xhr.send();
  })
}

function getAllProject(){
  // Creating Our XMLHttpRequest object 
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    // Making our connection  
    let url = 'http://localhost:4500/api/project/';
    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resolve(JSON.parse(this.responseText))
        }
    }
    // Sending our request 
    xhr.send();  
  })

}

function updateTask(id, projectId, task, weight, status){
  return new Promise((resolve, reject) => {
    const url = "http://localhost:4500/api/task/";
    const data = {id, task, weight, status, project_id : projectId};
    const json = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url+'/'+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            resolve(data)
        } else {
            console.error(data);
        }
    }
    xhr.send(json);
  })
}

function addTask( projectId, task, weight, status){
  return new Promise((resolve, reject) => {
    const url = "http://localhost:4500/api/task";
    const data = {task, weight, status, project_id : projectId};
    const json = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url+'/', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            resolve(data)
        } else {
            console.error(data);
        }
    }
    xhr.send(json);
  })
}

function deleteTask(id){
  return new Promise((resolve, reject) => {
    const url = "http://localhost:4500/api/task/";

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url+'/'+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            resolve(data)
        } else {
            console.error(data);
        }
    }
    xhr.send();
  })
}


function updateProject(id, project){

  console.log(id, project)

  return new Promise((resolve, reject) => {
    const url = "http://localhost:4500/api/project";
    const data = {id, project};
    const json = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url+'/'+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            resolve(data)
        } else {
            console.error(data);
        }
    }
    xhr.send(json);
  })
}

function addProject(project){
  return new Promise((resolve, reject) => {
    const url = "http://localhost:4500/api/project";
    const data = {project};
    const json = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url+'/', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            resolve(data)
        } else {
            console.error(data);
        }
    }
    xhr.send(json);
  })
}

function deleteProject(id){
  return new Promise((resolve, reject) => {
    const url = "http://localhost:4500/api/project/";

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url+'/'+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            resolve(data)
        } else {
            console.error(data);
        }
    }
    xhr.send();
  })
}



const api = {
  getAllTask,
  getAllProject,
  updateTask,
  deleteTask,
  addTask,
  updateProject,
  deleteProject,
  addProject
}

export default api