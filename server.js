const expres = require("express");
const app = expres();
app.use(expres.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

var swagger_path = path.resolve("./swagger.yaml");

const swaggerDocument = YAML.load(swagger_path);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let courses = [
  {
    id: "1",
    name: "learn react",
    price: 400,
  },
  {
    id: "2",
    name: "learn node-express",
    price: 300,
  },
  {
    id: "3",
    name: "learn mongoDB",
    price: 300,
  },
];

app.get("/", (req, res) => {
  res.status(200).send("<h1>HOME page here</h1>");
});

app.get("/api/v1/lco", (req, res) => {
  res.status(200).send("<h1>Welcome to lco docs</h1>");
});

app.get("/api/v1/newcourse", (req, res) => {
  res.status(200).send({
    id: "4",
    name: "learn MERN stack",
    price: 999,
  });
});

app.get("/api/v1/courses", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/v1/mycourses/:courseId", (req, res) => {
  const resCourse = courses.find((course) => course.id === req.params.courseId);
  res.status(200).send(resCourse);
});

app.post("/api/v1/addcourse", (req, res) => {
  courses.push(req.body);
  res.status(200).send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  const file = req.files.file[0];
  console.log(file);
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    res.send(true);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started...");
});
