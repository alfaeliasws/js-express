const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const token = require("./Tokens");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

function variablesInitiator () {
    let success = 0;
    let status = 204;
    let user = [];
    let message = "Data not found";
    let resToken = "";
    let userDetail = {};

    return {success, status, user, message, resToken, userDetail}
}

async function login(req) {

    let {success, status, user, message, resToken, userDetail} = variablesInitiator()

    const result = await db.query(
        `SELECT username, id FROM users WHERE (username='${req.username}') AND password = MD5('${req.password}') `
    );
    message = "Account not found";
    user = helper.emptyOrRows(result);
    
    if (result.length > 0) {
        userDetail = {}
        success = 1;
        status = 200;
        message = "Data found";
        userDetail = {
            id: result[0].id,
            username: result[0].username,
        };

        try {
            resToken = token.generateAccessToken({ userDetail });
        } catch (err) {
            console.error(`Error generate token `, err.message);
        }
    }

    return {
        success,
        status,
        message,
        userDetail,
        token: resToken,
    };
}

async function register(req) {

    let {success, status, user, message, resToken, userDetail} = variablesInitiator()
    message = "Email or Username has been used"

    const validateExistence = await db.query(
        `SELECT username, email, uuid, project_id FROM users WHERE (username='${req.username}') `    );
    
    message = "Account not found";
    user = helper.emptyOrRows(validateExistence);
    
    if (validateExistence.length < 0) {
        const insertUser = await db.query(
            `INSERT INTO users SET username='${req.username}', email='${req.email}', password=MD5('${req.password}')`
        )

        if(insertUser){
            userDetail = {}
            success = 1;
            status = 200;
            message = "Data found";
            userDetail = {
                id: result[0].id,
                email: result[0].email,
                name: result[0].name,
                phone: result[0].phone,
                org_id: result[0].org_id,
            };
        } else {
            message = "Register Failed"
        }

        try {
            resToken = token.generateAccessToken({ userDetail });
        } catch (err) {
            console.error(`Error generate token `, err.message);
        }
    }

    return {
        success,
        status,
        message,
        userDetail,
        token: resToken,
    };
}

module.exports = {
  login,
  register
};
