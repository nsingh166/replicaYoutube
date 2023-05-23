// inorder to access these features, you have to be logged in


module.exports = {
    isLoggedIn: function(req,res,next){
            if(req.session.user){
                next()
            }else{
                req.flash("error",`You must be logged in.`);
                req.session.save(function(err){
                    if(err) next(err);
                    res.redirect('/login');
                })
            }
    },
    // middleware functions
    isMyProfile: function(req,res,next){
        var {id} = req.params;
        if(id == req.session.user.userId){
            next();
        }else{
            req.flash("error",`This is not your profile, the profile is private.`);
            req.session.save(function(err){
                if(err) next(err);
                res.redirect('/');
            })
        }
    }
}