const Post = require('../models/interviewexperience')
const User = require('../models/user')

exports.experiencelist = async (req, res, next) => {
  const posts = await Post.find()

  res.status(200).json({
    message: 'Fetched posts successfully.',
    posts: posts
  });
}

exports.singleinterview = async (req, res, next) => {
  const post = await Post.findById(req.params.jobid)
  res.status(200).json({
    message: 'Fetched post successfully.',
    post: post
  });
}

exports.createexperience = async (req, res, next) => {
  const title = req.body.title;
  const company = req.body.company;
  const description = req.body.description
  try{
    const user = await User.findById(req.userId);
    const post = new Post({
      title: title,
      Company: company,
      Description: description,
      Date: new  Date().toDateString(),
      creator: user.name
    });

    const result = await post.save();
    console.log("submit")
    res.status(201).json({
      message: 'Post created successfully!',
      post: result
    });

  }catch (err) {
    console.log(err)
     if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
 }
}
