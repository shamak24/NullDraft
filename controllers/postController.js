import Post from './models/postModel.js';
import express from 'express';

const Posts = async(req, res)=>{
    try{
        const posts = await Post.find({}).sort({date: -1});
        
        res.status(200).json(posts);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export default Posts;