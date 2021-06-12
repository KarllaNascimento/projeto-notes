// Configurações
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");


const app = express()
const PORT = 8000;

//DB
const db = require("./db/connection")


// Template engine
app.engine("handlebars", exphbs()); // vai usar o handlebars para renderizar as views 
app.set("view engine", "handlebars");
app.use(express.static("public")) // dizemos de onde vamos pegar o css
app.use(bodyParser.urlencoded({ extended: true }))

//Importação de rotas
const notesRoutes = require("./routes/notes.routes");

//Rotas 
app.get("/", async (req, res)=>{

      const notes = await db.getDb().db().collection("notes").find({}).toArray();
      res.render("home", {notes});
   
})

app.use("/notes", notesRoutes)

db.initDb((err, db)=>{
   if(err){
      console.log(err);
   }else{
      console.log("Banco conectado com sucesso!")
      app.listen(PORT, ()=>{
         console.log(`O projeto está rodando na porta: ${PORT}`);
      })
   }
})