import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, 'Posts.json');

//MIDDLEWARE FOR EJS
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

function readPosts() {
    if (!fs.existsSync(postsPath)) return [];
    const data = fs.readFileSync(postsPath, 'utf-8');
    return JSON.parse(data);
}

function writePosts(posts){
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
}


app.get('/', (req,res)=>{
    res.render('index.ejs');
})

app.get('/newpost', (req,res) => {
    res.render('newpost.ejs');
})

app.get('/posts', (req,res) => {
    const blogs = readPosts();
    res.render('posts.ejs', {
        posts: blogs
    });
})

app.get('/posts/:id', (req,res)=>{
    const blogs = readPosts();
    const postId = req.params.id;
    const post = blogs.find((blog) => blog.id == postId);
    if (post) {
        res.render('post.ejs', {
            post: post
        });
    } else {
        res.status(404).render('404.ejs');
    }
})

app.post('/submit', (req,res)=>{
    const blogs = readPosts();
    const date = new Date().toLocaleString();
    const id = blogs.length+1;
    const { title, description, author, content } = req.body;
    const newFormData = {id: id, title: title, author: author, description: description, content: content, date: date};
    blogs.push(newFormData);
    writePosts(blogs);
    res.render("posts.ejs", {
        posts: blogs
    });
})



app.use((req, res) => {
    res.status(404).render('404.ejs');
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})