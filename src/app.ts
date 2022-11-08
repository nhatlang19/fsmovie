import express from 'express';
import path from "path";
import * as routes from "./routes";

const port = process.env.PORT || 3000;
let app = express();

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

routes.register(app);

app.listen(port, () => {    
    console.log( `server started at http://localhost:${port}`);
});