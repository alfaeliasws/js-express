const db = require("./db");
const helper = require("../helper");

function variableInitiator () {
    let success = 0;
    let message = "Data not found";
    let status = 204;
    let jobs = [];
    
    return {success, message, status, jobs, token}
}

const token = helper.jwtUserDetail()

async function getAll() {

  let {success, message, status, tasks}  = variableInitiator()

  const result = await db.query(`SELECT t.*, p.project FROM tasks t LEFT JOIN projects p ON p.id = t.project_id WHERE t.deleted_at IS NULL AND p.deleted_at IS NULL`)
  tasks = helper.emptyOrRows(result);
  
  if ((result?.length ?? 0) > 0) {
    success = 1;
    status = 200;
    message = "Data found";
    tasks = result.slice(0,10);
  }

  return {
    success,
    status,
    message,
    tasks
  };
}

async function getById(id) {
    let {success, message, status, tasks}  = variableInitiator()
    const result = await db.query(`SELECT t.*, p.project FROM tasks t LEFT JOIN projects p ON t.project_id = p.id  WHERE id = ? AND t.deleted_at IS NULL AND p.deleted_at IS NULL`, [id])
    tasks = helper.emptyOrRows(result);

    if (result) {
      success = 1;
      status = 200;
      message = "Data found";
      tasks = result;
    }

    return {
        success,
        status,
        message,
        tasks,
    };

}
async function create(body) {
  let {success, message, status, tasks}  = variableInitiator()
  
  const result = await db.query(`INSERT INTO tasks (task, weight, status, project_id) VALUES (? , ? , ?, ?)`, [body.task, body.weight, body.status, body.project_id])
  tasks = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Create Success";
    tasks = result;
  }

  return {
      success,
      status,
      message,
      tasks,
  };

}

async function update(body) {
  let {success, message, status, tasks}  = variableInitiator()

  const result = await db.query(`UPDATE tasks set task = ?, status = ?, weight = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [body.task, body.status, body.weight, body.id])

  const progressQuery = await db.query(`SELECT SUM(CASE WHEN t.status = "Done" THEN t.weight ELSE 0 END)/SUM(t.weight)*100 AS progressCalc, SUM(CASE WHEN t.status = "In Progress" THEN t.weight - 1 WHEN t.status = "Done" THEN t.weight ELSE 0 END)/SUM(t.weight)*100 AS projectStatus, p.id  FROM tasks t LEFT JOIN projects p ON t.project_id = p.id WHERE t.project_id = ? AND t.deleted_at IS NULL AND t.deleted_at IS NULL GROUP BY p.id`, [body.project_id])

  const queryResult = helper.emptyOrRows(progressQuery);

  console.log({queryResult})

  const progress = queryResult[0].progressCalc
  const projectId = queryResult[0].id
  const projectStatusDb = queryResult[0].projectStatus

  let progressStatus = "Draft"
  let projectStatus = "Draft"

  if(parseInt(projectStatusDb) > 0 && parseInt(projectStatusDb) < 100){
    projectStatus = "In Progress"
  }

  if(parseInt(projectStatusDb) === 100){
    projectStatus = "Done"
  }

  if (progress < 100 && progress > 0) {
    progressStatus = "In Progress"
  }

  if (progress >= 100) {
    progressStatus = "Done"
  }

  console.log(progress, projectStatus, projectId)

  await db.query(`UPDATE projects SET progress = ?, status = ?, updated_at = NOW() WHERE id = ? AND projects.deleted_at IS NULL`, [progress, projectStatus, projectId])

  tasks = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Update Success";
    tasks = result;
  }

  return {
      success,
      status,
      message,
      tasks,
  };

}

async function remove(id) {
  let {success, message, status, tasks}  = variableInitiator()
  
  console.log({id})

  const result = await db.query(`UPDATE tasks set deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [id]);
  tasks = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Remove Success";
    tasks = result;
  }

  return {
      success,
      status,
      message,
      tasks,
  };

}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
