import express from "express";
import * as path from "path";
import todoRouter from "./routers/todo";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", todoRouter());

app.set("port", process.env.PORT || 3000);   

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
