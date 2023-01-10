const express = require("express");
var cors = require("cors");
const crypto = require("crypto");
var key = "abcdefghijklmnopqrstuvwx";
var encrypt = crypto.createCipheriv("des-ede3", key, "");
const bodyParser = require("body-parser");
var { Client } = require("pg");
const app = express();
const dotenv = require("dotenv").config();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());
const pdf = require("html-pdf");
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
const pool = new Client({
  user: dotenv.parsed.USER,
  host: dotenv.parsed.HOST,
  database: dotenv.parsed.DATABASE,
  password: dotenv.parsed.PASSWORD,
});
pool.connect();

//API for new user signup
app.post("/signup", (req, res) => {
  const user = req.body;
  const password = user.password;
  var encrypt = crypto.createCipheriv("des-ede3", key, "");
  var theCipher = encrypt.update(password, "utf8", "base64");
  theCipher += encrypt.final("base64");
  console.log(theCipher);
  let selectQuery = `select count(email) from users where email='${user.email}'`;
  try {
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 0) {
          let insertQuery = `insert into users (email, password)
                              values('${user.email}', '${theCipher}') `;
          pool.query(insertQuery, (err, result1) => {
            if (!err) {
              res.json("User Registered successfully");
            } else {
              console.log(err.message);
            }
          });
        } else {
          console.log("inside else");
          res.send({
            exists: "True",
          });
        }
      } else {
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//API for login verification
app.post("/login", (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  let selectQuery = `select count(email) from users where email='${user.email}'`;
  try {
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 1) {
          let passQuery = `Select password from users where email = '${email}'`;
          pool.query(passQuery, (err, result) => {
            console.log(result);
            let passdb = result.rows[0].password;
            var decrypt = crypto.createDecipheriv("des-ede3", key, "");
            var s = decrypt.update(passdb, "base64", "utf8");
            var decryptedData = s + decrypt.final("utf8");
            if (decryptedData == password) {
              res.json({
                message: "True",
                password: result.rows[0].password,
              });
            } else {
              res.json({
                message: "False",
              });
            }
          });
        }
      } else {
        res.json({
          message: "Could not find user associated with this mail",
        });
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//App to get user-id who login
app.post("/userId", (req, res) => {
  const email = req.body.email;
  let searchQuery = `Select count(email) from users where email = '${email}'`;
  try {
    pool.query(searchQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 1) {
          let passQuery = `Select user_id from users where email = '${email}'`;
          pool.query(passQuery, (err, result1) => {
            console.log(result1);
            let user_id = result1.rows[0].user_id;
            // console.log(user_id);
            res.json({
              success: user_id,
            });
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//API to store profile details
app.post("/profileDetails", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into profile (user_id,name,location,github,linkedin,website, photo)
  values('${user.user_id}', '${user.name}','${user.location}','${user.github}','${user.linkedin}','${user.website}','${user.photo}')`;
  try {
    pool.query(insertQuery, (err, result1) => {
      if (!err) {
        res.json("Profile details inserted successfully");
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//API to store about details
app.post("/aboutDetails", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into about (user_id,about)
  values('${user.user_id}', '${user.about}')`;
  try {
    pool.query(insertQuery, (err, result1) => {
      if (!err) {
        res.json("About details inserted successfully");
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//API to store skills details
app.post("/skillsDetails", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into skills (user_id,skills)
  values('${user.user_id}', array['${user.skills}'])`;
  try {
    pool.query(insertQuery, (err, result1) => {
      if (!err) {
        res.json("Skills details inserted successful");
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//API to store education details
app.post("/educationDetails", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into education (user_id,institute,degree,field_of_study,start_year,end_year, grade)
  values('${user.user_id}', '${user.institute}','${user.degree}','${user.field_of_study}','${user.start_year}','${user.end_year}','${user.grade}')`;
  try {
    pool.query(insertQuery, (err, result1) => {
      if (!err) {
        res.json("Education details inserted successfully");
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//API to store experience details
app.post("/experienceDetails", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into experience (user_id,job_title,company,isworking,start_month,start_year, end_month,end_year,location,description)
  values('${user.user_id}', '${user.job_title}','${user.company}','${user.isworking}','${user.start_month}','${user.start_year}','${user.end_month}',
  '${user.end_year}','${user.location}','${user.description}')`;
  try {
    pool.query(insertQuery, (err, result1) => {
      if (!err) {
        res.json("Experience details inserted successfully");
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
