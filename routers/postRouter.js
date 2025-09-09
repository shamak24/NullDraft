import express from 'express';
import Post from '../models/postModel.js';
const router = express.Router();
import Posts from '../controllers/postController.js';

//get all posts
router.get('/posts', Posts);
