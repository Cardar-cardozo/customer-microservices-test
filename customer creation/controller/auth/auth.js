const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../../models/database"); 
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require("uuid");

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password} = req.body;

    
    try {
        
        // check if email already exists
        const checkEmail = `SELECT * FROM users WHERE email=?`;
        const value = [email];
        pool.request()
        pool.query(checkEmail, value, (err, result) => {
            if (!result || !Array.isArray(result)) {
                return res.status(400).json({
                    status: "error",
                    error: "error fetching user",
                });
            }
            if (result.length == 1) {
                return res.status(400).json({
                    status: "error",
                    error: "User already exist.",
                });
            }
    })
        // generate bcrypt salt
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(password, salt);

              // users sign up
              const signUpQuery = `INSERT INTO users (id,firstName, lastName, email, password) VALUES (?, ?, ?, ?,?)`;
              const userValue = [uuidv4(),firstName, lastName, email, hashedPassword];
              pool.query(signUpQuery, userValue, (err, result) => {
              if (result) {
                return res.status(400).json({
                    status: "success",
                  data: {
                    firstName,
                    lastName,
                    email,
                  },
                  message: "User account successfully created",
                });
              } else {
                console.log(err)
                return res.status(400).json({
                  status: "error",
                  error: "Unable to create an account at the moment, Pls try again later.",
                });
              }
            });
        
    } catch (error) {
        console.log(error)
      return res.status(500).send({message:'server error', status:500});
    }
}

exports.login = async (req, res) => {
    // body values
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
    const { emailBody, passwordBody } = req.body;

    try {
      // empty body values


      // email check (if user with email exist)
      const logInQuery = `SELECT * FROM users WHERE email=?`;
      const value = [emailBody];
      console.log(logInQuery)
      pool.query(logInQuery, value, (err, result) => {
        if (err) {
          return res.status(400).json({
            status: "error",
            error: "You cannot login at the moment.",
          });
        }
        if (result.length == 0) {
          return res.status(400).json({
            status: "error",
            error: "User does not exist, please sign up",
          });
        } else {
          // compare password
          const [{id, email, password}] = result
          bcrypt.compare(passwordBody, password, (err, deocoded) => {
            // user login
            if (emailBody === email && deocoded === true) {
              jwt.sign({ id, email, password }, process.env.SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
                console.log(token)
                  return res.status(201).json({
                    status: "success",
                    message: "User successfully loged in",
                    data: {
                      token,
                      result,
                    },
                  });
                }
              );
            }
            // incorrect email and password
            else {
              res.status(403).json({
                status: "error",
                error: "Incorrect email or password",
              });
            }
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
