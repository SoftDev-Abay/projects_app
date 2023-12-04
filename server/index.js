const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const uploadMiddleware = require("./middlewares/uploadMiddleware");
const fs = require("fs");
const { get } = require("http");

const { config } = require("dotenv");
config();

const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// middleware
app.use(cors());
app.use(express.json());

// socet io

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //Listens and logs the message to the console
  socket.on("message", (data) => {
    console.log(data);
    socketIO.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

//Routes

// create chatroom

app.post("/chats", async (req, res) => {
  console.log(req.body);
  try {
    const { users } = req.body;
    if (users.length === 0) {
      res.status(404).json({ message: "No users selected" });
    } else if (users.length === 2) {
      const checkChat = await pool.query(
        "SELECT * FROM chatrooms WHERE name = $1",
        [users.join(",")]
      );
      if (checkChat.rows.length !== 0) {
        res.json(checkChat.rows[0]);
      } else {
        const newChat = await pool.query(
          "INSERT INTO chatrooms(name) VALUES ($1) RETURNING *",
          [users.join(",")]
        );
        users.forEach(async (user) => {
          const newChatUser = await pool.query(
            "INSERT INTO users_chatrooms(chatroom_id, user_id) VALUES ($1, (select id from users where username = $2))",
            [newChat.rows[0].id, user]
          );
        });
        res.json(newChat.rows[0]);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});

// store message

app.post("/messages", async (req, res) => {
  try {
    const { chatroom_id, sender_id, text, date } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO messages(chatroom_id, sender_id, text, date) VALUES ($1,$2,$3,$4) RETURNING *",
      [chatroom_id, sender_id, text, date]
    );
    res.json(newMessage.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get chatroom messages

app.post("/chats/messages", async (req, res) => {
  try {
    const { chatID, userID } = req.body;
    const messages = await pool.query(
      "SELECT * FROM messages WHERE chatroom_id = $1",
      [chatID]
    );
    res.json(messages.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get chatrooms where user is a member

app.get("/user_chatrooms/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const userChatrooms = await pool.query(
      "select c.* from chatrooms c inner join users_chatrooms uc on c.id = uc.chatroom_id where uc.user_id = $1;",
      [user_id]
    );

    for (let index = 0; index < userChatrooms.rows.length; index++) {
      const chatroomMembers = await pool.query(
        "select u.* from users_chatrooms inner join users u on u.id = users_chatrooms.user_id where chatroom_id = $1 and u.id != $2",
        [userChatrooms.rows[index].id, user_id]
      );
      userChatrooms.rows[index] = {
        ...userChatrooms.rows[index],
        members: chatroomMembers.rows,
      };
    }

    res.json(userChatrooms.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// auth a user

app.post("/users/auth", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [user_email, user_password]
    );
    console.log(checkUser.rows);
    if (checkUser.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(checkUser.rows[0]);
      //   res.json(checkUser.rows[0]);
    }
  } catch (error) {
    console.error(error.message);
  }
});

//create a user
app.post("/users", async (req, res) => {
  try {
    const { user_email, username, user_password, admin } = req.body;
    const userEmailUnique = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [user_email]
    );
    const userNameUnique = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userEmailUnique.rows.length !== 0) {
      res.status(404).json({ message: "Email already exist" });
    } else if (userNameUnique.rows.length !== 0) {
      res.status(404).json({ message: "Username already exist" });
    } else {
      const newUser = await pool.query(
        "INSERT INTO users(email,username,password,admin) VALUES ($1,$2,$3, $4) RETURNING *",
        [user_email, username, user_password, admin]
      );

      res.json(newUser.rows[0]);
    }
  } catch (error) {
    console.error(error.message);
  }
});
// get all users

app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("select username from users");
    console.log(users.rows);
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// add project
app.post("/projects", async (req, res) => {
  try {
    const { name, description, date_created, date_due, category, members } =
      req.body;
    const newProject = await pool.query(
      "INSERT INTO projects(name, description, date_created, date_due, category) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, description, date_created, date_due, category]
    );

    const project_id = newProject.rows[0].id;

    for (let i = 0; i < members.length; i++) {
      const newMember = await pool.query(
        "insert into projects_members(project_id, user_id, user_role) values ($1,(select id from users where username = $2 ), $3);",
        [project_id, members[i].username, members[i].role]
      );
    }
    res.json(newProject.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get projects where user is a member
app.get("/user_projects/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const userProjects = await pool.query(
      "select p.* from projects p inner join projects_members pm on p.id = pm.project_id where pm.user_id = $1;",
      [user_id]
    );

    for (let index = 0; index < userProjects.rows.length; index++) {
      const projectMembers = await pool.query(
        "select u.*, projects_members.user_role  from projects_members inner join users u on u.id = projects_members.user_id where project_id = $1",
        [userProjects.rows[index].id]
      );
      userProjects.rows[index] = {
        ...userProjects.rows[index],
        members: projectMembers.rows,
      };
    }

    res.json(userProjects.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// create a task

app.post("/tasks", uploadMiddleware, async (req, res) => {
  try {
    const files = req.files;
    const {
      name,
      description,
      status,
      date_created,
      projectName,
      subtasks,
      members,
    } = req.body;

    const newTask = await pool.query(
      "insert into   tasks(name, description, status, project_id, date_created) values ($1,$2,$3, (select p.id from projects p where p.name = $4) , $5) RETURNING *",
      [name, description, status, projectName, date_created]
    );
    res.json(newTask.rows[0]);

    // files.forEach((file) => {
    //   const filePath = `attachments/${file.filename}`;
    //   fs.rename(file.path, filePath, (err) => {
    //     if (err) {
    //       // Handle error appropriately and send an error response
    //       return res.status(500).json({ error: "Failed to store the file" });
    //     }
    //   });
    // });

    // Send an appropriate response to the client
    res.status(200).json({ message: "File upload successful" });
  } catch (error) {
    console.error(error.message);
  }
});

http.listen(5000, () => {
  console.log("listening on port 5000");
});
