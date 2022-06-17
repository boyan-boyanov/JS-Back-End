
function isUser() {
    return (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    }
}

function isOwner() {
    return function (req, res, next) {
        console.log(req.session.user + "Req session");
        const userId = req.session.user?._id;
        //TODO Change propery name to match collection 
//console.log(res.local.data);
        if (res.local.data.owner == userId) {
            next();
        }else {
            res.redirect('/login');
        }
    }
}

module.exports = {
    isUser,
    isGuest,
    isOwner
}