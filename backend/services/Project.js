const db = require("./db");
const helper = require("../helper");

function variableInitiator () {
    let success = 0;
    let message = "Data not found";
    let status = 204;
    let jobs = [];
    
    return {success, message, status, jobs}
}
async function getAll() {

  let {success, message, status, projects}  = variableInitiator()

  const result = await db.query(`SELECT r.*, CASE WHEN r.projectStatus = 100 THEN "Done" WHEN r.projectStatus < 100 AND r.projectStatus > 0 THEN "In Progress" ELSE "Draft" END as finalStatus FROM (SELECT p.*, SUM(CASE WHEN t.status = "Done" THEN t.weight ELSE 0 END)/SUM(t.weight)*100 AS progressCalc, SUM(CASE WHEN t.status = "In Progress" THEN t.weight - 1 WHEN t.status = "Done" THEN t.weight ELSE 0 END)/SUM(t.weight)*100 AS projectStatus FROM projects p LEFT JOIN tasks t ON t.project_id = p.id WHERE p.deleted_at IS NULL AND t.deleted_at IS NULL GROUP BY p.id) r`)
  projects = helper.emptyOrRows(result);

  
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
    projects
  };
}

async function getById(id) {
    let {success, message, status, projects}  = variableInitiator()
    const result = await db.query(`SELECT p.* FROM projects p LEFT JOIN tasks t ON t.project_id = p.id WHERE p.deleted_at IS NULL AND t.deleted_at IS NULL AND p.id = ? GROUP BY p.id`, [id])
    tasks = helper.emptyOrRows(result);

    if (result) {
      success = 1;
      status = 200;
      message = "Data found";
      projects = result;
    }

    return {
        success,
        status,
        message,
        projects,
    };

}
async function create(project) {
  let {success, message, status, projects}  = variableInitiator()

  const result = await db.query(`INSERT INTO projects (project) VALUES (?)`, [project.project])
  projects = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Data found";
    projects = result;
  }

  return {
      success,
      status,
      message,
      projects,
  };

}

async function update(id, body) {

  console.log(id, body)

  let {success, message, status, projects}  = variableInitiator()
  const result = await db.query(`UPDATE projects set project = ? WHERE id = ? AND deleted_at IS NULL`, [body.project, id])
  projects = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Update Success";
    projects = result;
  }

  return {
      success,
      status,
      message,
      projects,
  };

}

async function remove(id) {
  let {success, message, status, projects}  = variableInitiator()
  
  const result = await db.query(`UPDATE projects set deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [id]);
  await db.query(`UPDATE tasks set deleted_at = NOW() WHERE project_id = ? AND deleted_at IS NULL`, [id]);
  
  projects = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Remove Success";
    projects = result;
  }

  return {
      success,
      status,
      message,
      projects,
  };
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
