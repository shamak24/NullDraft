import express from 'express';
import blogs from './Posts.js';

const app = express();
const port = 3000;
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

app.use((req, res) => {
    res.status(404).render('404.ejs');
});

// app.post('/newpost/submit', (req,res)=>{
//     const date = new Date().toLocaleString('en-US');
//     const { title, description, image, author, content } = req.body;
//     const newPost = {
//         id: blogs.length + 1,
//         title,
//         date,
//         description,
//         image,
//         author,
//         content
//     };
//     blogs.push(newPost);
//     res.redirect('/posts');
// })

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})