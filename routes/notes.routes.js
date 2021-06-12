const Router = require("express").Router;
const db = require("../db/connection")
const { ObjectId } = require("mongodb");

const router = Router();

//Form criação de rota
router.get("/", (req, res)=>{
   res.render("notes/create");
})


//Envio da nota para inserção no banco
router.post("/", (req, res)=>{
   const data = req.body;
   const title = data.title;
   const description = data.description;

   db.getDb()
      .db()
      .collection("notes")
      .insertOne({ title: title, description: description });

   res.redirect(301, "/");

})


module.exports = router;
