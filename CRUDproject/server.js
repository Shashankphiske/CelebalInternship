const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "'unsafe-inline'"],
        "script-src-attr": ["'unsafe-inline'"],
      },
    },
  })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const uri = 'mongodb+srv://ssp:ssp0511@cluster0.wvb3x.mongodb.net/crudproject?retryWrites=true&w=majority&appName=Cluster0'


const connectdb = async () => {
    mongoose.connect(uri, {
    }).then(() => console.log("Db connected"))
    .catch((err) => console.log(err));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/sendUser", async (req, res) => {
    const { name, age } = req.body;
    const user = new userSchema({
        name : name,
        age : age
    })

    await user.save();
    console.log("new user added");
    res.send("New user added");
})

app.get("/getUsers", async (req, res) => {
    const data = await userSchema.find();
    console.log("User data fetched :");
    console.log(data);
    res.send(data);
})

app.post("/updateUser", async (req, res) => {
    const { name, age } = req.body;
    await userSchema.updateOne({ name : name }, {age : age });
    console.log("user updated");
    res.send("User updated");
})

app.post("/deleteUser", async (req, res) => {
    const { name } = req.body;
    await userSchema.deleteOne({ name : name });
    console.log("User deleted");
    res.send("User deleted");
})

app.listen(3000, () => {
    connectdb();
    console.log("App is listening on PORT : 3000");
});