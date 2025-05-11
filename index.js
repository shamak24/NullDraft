import express from 'express';
import blogs from './Posts.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

//MIDDLEWARE FOR EJS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/', (req,res)=>{
    res.render('index.ejs');
})

app.get('/newpost', (req,res) => {
    res.render('newpost.ejs');
})

app.get('/posts', (req,res) => {
    res.render('posts.ejs', {
        posts: blogs
    });
})

app.get('/posts/:id', (req,res)=>{
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
    const date = new Date().toLocaleString();
    const { title, description, author, content } = req.body;
    console.log('Form Data:', { author, title, date, description, content });
})



app.use((req, res) => {
    res.status(404).render('404.ejs');
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})