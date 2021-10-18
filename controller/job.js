const Post = require('../models/jobpost')
const User = require('../models/user')
exports.joblist = async (req, res, next) => {
  const posts = await Post.find()

  res.status(200).json({
    message: 'Fetched posts successfully.',
    posts: posts
  });
}

exports.singlejob = async (req, res, next) => {
  console.log(req.params.jobid)
  const post = await Post.findById(req.params.jobid)
  res.status(200).json({
    message: 'Fetched post successfully.',
    post: post
  });
}

exports.createjob = async (req, res, next) => {

  const title = req.body.title;
  const company = req.body.company;
  const description = req.body.description;
  const link = req.body.link;
  try{
    const user = await User.findById(req.userId);
    const post = new Post({
      title: title,
      Company: company,
      Description: description,
      link: link,
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
