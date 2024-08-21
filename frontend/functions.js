import dataStore, {stateStore} from "./dataStore.js";
import api from "./apiCaller.js";

// HELPER
function rerender(domId){

  if(domId){
    document.getElementById(domId).style.display = 'none';
    document.getElementById(domId).style.display = 'block';
    return
  } 
  
  document.getElementById("allBody").style.display = 'none';
  document.getElementById("allBody").style.display = 'block';  
}

function loading(){
  document.getElementById("allBody").style.display = 'none';
}


function stopLoading(){
  document.getElementById("allBody").style.display = 'flex';
}



function checkDataStore(){

  if (dataStore.length < 1){
    document.getElementById("addTask").disabled="true";
    return
  } else {
    rerender("addTask")
    return
  }

}

function checkState(stateParam){
  console.log(stateParam)
  const state = stateStore.state === stateParam ? "flex" : "none"
  document.getElementById(`${stateParam}Modal`).style.display = state
}

function makeDomStateDefault(){
stateStore.state = "none"
document.getElementById(`updateTaskModal`).style.display=stateStore.state;
document.getElementById(`addTaskModal`).style.display=stateStore.state;
document.getElementById("updateProjectModal").style.display=stateStore.state;
document.getElementById("addProjectModal").style.display=stateStore.state;
document.getElementById("addDirectTaskModal").style.display=stateStore.state;
}


function firstLoad(){
  makeDomStateDefault()
  apiCallGetAll()
}

function updateDOM(){
  loading()
  for (let index = 0; index < dataStore.length; index++) {
    dataStore.pop()
  }
  makeDomStateDefault()
  apiCallGetAll()
}

// API ASYNC FUNCTION

async function apiCallGetAll(){

  const tasks = await api.getAllTask()
  const projects = await api.getAllProject()

  const newDataStore = projects.projects.map((item, index) => {
    const tasksOfProject = tasks.tasks.filter((task, index) => task.project_id === item.id)
    return {...item, task: tasksOfProject}
  })

  for (let index = 0; index < newDataStore.length; index++) {
    dataStore.push(newDataStore[index]);
  }

  sessionStorage.setItem("lastApiCall", newDataStore)

  iterateProject()
  iterateTask()

  checkDataStore()
  return stopLoading()
}


async function apiCallAddTask(id, projectId, task, weight){
  await api.addTask(id, projectId, task, weight)

}

async function apiCallUpdateTask(id, projectId, task, weight, status){
    await api.updateTask(id, projectId, task, weight, status)
}

async function apiCallDeleteTask(id){
  await api.deleteTask(id)
}

async function apiCallAddProject(project){
  await api.addProject(project)

}

async function apiCallUpdateProject(id, project){
    await api.updateProject(id, project)
}

async function apiCallDeleteProject(id){
  await api.deleteProject(id)
}



// DOM ITERATOR - DOM MANIPULATION

function iterateProject(){
  return document.getElementById("iterateProjectTask").innerHTML = dataStore.map((item, index) => {
    return (
      `
        <p class="font-bold text-black pl-4 max-w-8 text-start py-1 mr-3" onclick="clickProject(${item.id})" id=project${index}>${item.project}</p>
        <button class="font-bold text-white rounded-lg px-2 py-1 max-w-4 bg-blue-900" id="editProject${index}" onClick="clickDirectAddTask(${item.id}, '${item.project}')">+</button>
        <div class="pl-8 text-black font-medium w-full py-2 flex flex-wrap pb-3" id="taskIteratorProject${index}">
        </div>
      `
    )
  });
}

function iterateTask(){
  dataStore.map((item, index) => {

    return document.getElementById(`taskIteratorProject${index}`).innerHTML = item.task.map((task, taskIndex) => {
      return (
        `
          <div class="w-full flex flex-wrap hover:cursor-pointer" onClick="clickTask(this.id)" id="project${index}task${taskIndex}taskId${task.id}">
            <p class="font-bold text-black pl-4 max-w-9 text-start pb-1 mr-3" id=task${taskIndex}>${task.task}</p>
          </div>
        `
      )
    })
  } )
}

//CLICK TO SHOW MODAL EVENT

function clickTask(id) {
  makeDomStateDefault()
  stateStore.state = "updateTask"

  const num = id.match(/\d+/g);
  const projectIndex = num[0]
  const taskIndex = num[1]
  const taskId = num[2]


  document.getElementById("deleteUpdateTask").setAttribute('id-element', taskId)
  document.getElementById("saveUpdateTask").setAttribute( 'id-element', `id${num[2]}project_id${dataStore[projectIndex].task[taskIndex].project_id}`, taskId)

  document.getElementById("projectInTaskUpdate").innerText = `Project ${dataStore[projectIndex].task[taskIndex].project}`

  document.getElementById("updateTaskWeight").value = dataStore[projectIndex].task[taskIndex].weight
  document.getElementById("updateTaskName").value = dataStore[projectIndex].task[taskIndex].task
  document.getElementById("updateTaskStatus").value = dataStore[projectIndex].task[taskIndex].status

  checkState(stateStore.state)

}


function clickAddTask(){
  makeDomStateDefault()

  stateStore.state = "addTask"

  checkState(stateStore.state)

  rerender(stateStore.state)

  document.getElementById("projectInTaskSelect").innerHTML = dataStore.map((project, index) => {
    return `
      <option value=${project.id}>${project.project}</option>
    `
  })

}

function clickDirectAddTask(projectId, projectName){

  makeDomStateDefault()

  document.getElementById("saveDirectAddTask").setAttribute('id-element', projectId)
  document.getElementById("projectInTaskDirectAdd").innerText = `Project ${projectName}`

  stateStore.state = "addDirectTask"

  checkState(stateStore.state)

  rerender(`${stateStore.state}Modal`)
  
}


function clickAddProject(){
  makeDomStateDefault()

  stateStore.state = "addProject"

  checkState(stateStore.state)

  rerender(`${stateStore.state}Modal`)
  
}

function clickProject(id){
  makeDomStateDefault()

  stateStore.state = "updateProject"
  const project = dataStore.filter((item, index) => item.id === id)

  document.getElementById("saveUpdateProject").setAttribute('id-element', id)
  document.getElementById("deleteUpdateProject").setAttribute('id-element', id)

  document.getElementById("updateProjectName").value = project[0].project
  document.getElementById("updateProjectStatus").innerText = "Status: " + project[0].finalStatus
  document.getElementById("updateProjectProgress").innerText = "Progress: " + parseFloat(project[0].progressCalc).toFixed(2) + "%"

  checkState(stateStore.state)

  rerender(`${stateStore.state}Modal`)

}

// MODAL BUTTTONS EVENTS

function saveAddTask(){

  const weight = document.getElementById("addTaskWeight").value
  const task = document.getElementById("addTaskName").value
  const status = document.getElementById("addTaskStatus").value
  const projectId = document.getElementById("projectInTaskSelect").value

  apiCallAddTask(projectId, task, weight, status)

  updateDOM()

  window.location.reload()
}

function deleteAddTask(){
  updateDOM()
}

function saveUpdateTask(){
  
  const string = document.getElementById('saveUpdateTask').getAttribute("id-element")

  const num = string.match(/\d+/g);

  const weight = document.getElementById("updateTaskWeight").value
  const task = document.getElementById("updateTaskName").value
  const status = document.getElementById("updateTaskStatus").value
  const id  = num[0]
  const projectId = num[1]
  
  apiCallUpdateTask(id, projectId, task, weight, status)

  updateDOM()

  window.location.reload()
}

function deleteUpdateTask(){
  const id = document.getElementById('deleteUpdateTask').getAttribute("id-element")
  console.log({id})
  apiCallDeleteTask(id)
  updateDOM()
}

function saveDirectAddTask(){

  const string = document.getElementById('saveDirectAddTask').getAttribute("id-element")

  const num = string.match(/\d+/g);

  const weight = document.getElementById("addDirectTaskWeight").value
  const task = document.getElementById("addDirectTaskName").value
  const status = document.getElementById("addDirectTaskStatus").value
  const projectId = num[0]

  apiCallAddTask(projectId, task, weight, status)

  updateDOM()

  window.location.reload()
}

function deleteDirectAddTask(){
  updateDOM()
}

function saveAddProject(){
  const name = document.getElementById("addProjectName").value
  apiCallAddProject(name)
  updateDOM()
  window.location.reload()
}

function deleteAddProject(){
  updateDOM()
}

function saveUpdateProject(){
  const name = document.getElementById("updateProjectName").value
  const id = document.getElementById('saveUpdateProject').getAttribute("id-element")
  apiCallUpdateProject(id, name)
  updateDOM()
  window.location.reload()
}

function deleteUpdateProject(){
  const id = document.getElementById('deleteUpdateProject').getAttribute("id-element")
  apiCallDeleteProject(id)
  updateDOM()
  window.location.reload()
}

// REGISTER TO WINDOW TO BE USED IN DOM

window.clickTask = clickTask;
window.clickAddTask = clickAddTask;
window.clickDirectAddTask = clickDirectAddTask;

window.saveAddTask = saveAddTask
window.deleteAddTask = deleteAddTask
window.saveUpdateTask = saveUpdateTask
window.deleteUpdateTask = deleteUpdateTask
window.saveDirectAddTask = saveDirectAddTask
window.deleteDirectAddTask = deleteDirectAddTask

window.clickProject = clickProject;
window.clickAddProject = clickAddProject;

window.saveAddProject = saveAddProject
window.deleteAddProject = deleteAddProject
window.saveUpdateProject = saveUpdateProject
window.deleteUpdateProject = deleteUpdateProject


const functions = {
  firstLoad,
  apiCallGetAll,
  clickTask,
  clickAddTask
}

export default functions;