const path = require('path');
var pathTOFFMPEG = require('ffmpeg-static'); // get the correct path for this machine for ffmpeg
var exec = require('child_process').exec;
var db = require('../conf/database');

module.exports = {
  makeThumbnail: function (req, res, next) {
    if (!req.file) {
      next(new Error('File upload failed'));
    } else {
      try {
        // Create the destination path for the thumbnail
        var destinationOfThumbnail = `public/images/uploads/thumbnail-${req.file.filename.split('.')[0]}.png`;
        // 0 means that I want the left side of the split

        // Create the thumbnail command
        var thumbnailCommand = `"${pathTOFFMPEG}" -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
        // This command specifies that the thumbnail should be taken from the first second of the video and saved to the destination path

        exec(thumbnailCommand); // Execute the command to create the thumbnail
        req.file.thumbnail = destinationOfThumbnail; // Add the thumbnail file path to the file object

        next(); // Move to the next middleware
      } catch (error) {
        next(error);
      }
    }
  },

  getPostsForUserBy: function(req,res,next){//todo
//need for the profile page for the list of videos by the specific user
  },
  //todo

  getPostbyID: function(req,res,next){ //one grabs the post, needs the SQL code
        res.locals.currentPost = row[0];
  },
  //todo
  getCommentsForPostById: function(req,res,next){ // this grabs the comments for the post, needs sql code here
    res.locals.currentPost.comments = rows;
  },

  //todo
  getRecentPosts: function(req,res,next){ //
    
  }
};
