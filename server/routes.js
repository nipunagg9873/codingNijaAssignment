const userService = require('./services/userService');
module.exports = function(router) {
    
    router.get('/', function(req, res) {
        res.send({"message": "coding ninja take home assignment backend"});
    });

    router.post('/login', function(req, res) {
        let {username, password} = req.body;
        if(!username || !password) {
            res.status(401).send();
        }       
        console.log(username, password);
        userService.authenticateUser(username, password);
    });

}