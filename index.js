import express from "express"
import bodyParser from "body-parser";
import {dirname} from "path"
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const PORT = process.env.PORT || 3000;
let blogs = [];
app.use(express.static("public")); 

app.use(bodyParser.urlencoded({ extended: true })); 

let i = 1;
// implementing the home page 
app.get("/", (req, res) => {
  res.render("index.ejs",{
    blogs,
  });
});
// creating the blog post
app.get("/create",(req,res)=>{
   res.sendFile(__dirname + "/public/create.html")

})
// posting the  created blog post
app.post("/post",(req,res)=>{
  
   let data = {
    index : i++,
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.content
   }
   blogs.push(data);
    res.render("index.ejs", {
        blogs
    })
})
// viewing the blog post 
app.get("/view/:id",(req,res)=>{
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].index == req.params.id) {
            res.render("views.ejs", {
                blog: blogs[i]
            });
            return;
        }
    }})
// editing the blog post
app.get("/edit/:id", (req, res) => {
    for (let i = 0; i < blogs.length; i++) {  
      if (blogs[i].index == req.params.id) {
        res.render("edit.ejs", {
          blog: blogs[i]
        });
        return;
      }
    }});
// updating the blog post after editing it. 
app.post("/update/:id", (req, res) => {
    for (let i = 0; i < blogs.length; i++) {
      
    
      if (blogs[i].index == req.params.id) {
        blogs[i].title = req.body.title; // Update the title
        blogs[i].subtitle = req.body.subtitle; // Update the subtitle
        blogs[i].content = req.body.content; // Update the content
        res.redirect("/"); // Redirect to the home page after updating
        return;
      }
    }
    });

// deleting the blog post 
app.get("/delete/:id", (req, res) => {
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].index == req.params.id) {
         // Remove the blog post from the array
        blogs.splice(i, 1);
        break; // Exit the loop after deletion
        
      }
    }
    res.redirect("/"); // Redirect to the home page after deletion
  });
  app.get("/update", (req, res) => {
      res.render("index.ejs",{
        blogs,
      })
    });
    


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
