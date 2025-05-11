import express from 'express';
import blogs from './Posts.js';

const app = express();
const port = 3000;
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index.ejs');
})

app.get('/newPost', (req,res) => {
    res.render('newpost.ejs');
})

app.get('/posts', (req,res) => {
    res.render('posts.ejs');
})

app.use((req, res) => {
    res.status(404).render('404.ejs');
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})