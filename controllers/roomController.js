// File: ./controllers/roomController.js

var Room = require('../models/room');
var User = require('../models/user');

var userController = require('./userController');

/*

router.get('/', roomController.index);

// GET room info
router.get('/:id', roomController.roomInfo);

// Create room
router.post('/create', roomController.createRoom);

// Update room
router.put('/:id/update', roomController.updateRoom);

// Delete room
router.post('/:id/delete', roomController.deleteRoom);

*/

// Generic error handler used by all endpoints
function handleError(res, error){
    console.log("ERROR: " + error);
    res.status(500).json({"error": error});
}

exports.index = function(req, res){
    if(req.query.name){
        Room.find({ 
            name: {
                $regex: req.query.name,
                $options: 'i'
            } 
        })
        .sort([['roomName', 'ascending']])
        .select('-password')
        .exec(function(err, rooms){
            if (err) { handleError(res, err); }
            res.status(200).json(rooms);
        });
    }
    else{
        Room.find()
        .sort([['roomName', 'ascending']])
        .select('-password')
        .exec(function(err, rooms){
            if (err) { handleError(res, err); }
            res.status(200).json(rooms);
        });
    }
    
}

exports.create = function(req, res){
    var newRoom = new Room(
                    {
                        name: req.body.name, 
                        password: req.body.password,
                        population: 1,
                        users: [req.body.user],
                        owner: [req.body.user]
                    });
                    
    if (newRoom.password.length > 0){
        newRoom.public = false;
    }
    
    newRoom.save(function(err, room){
        if (err) { handleError(res, err); }
        res.status(200).json(room);
    });
}

exports.details = function(req, res){
    Room.findById(req.params.id)
        .exec(function(err, room){
           if (err) { handleError(res, err); }
           res.status(200).json(room);
        });
}

// add user (via user_id) to room
exports.addUser = function(req, res){
    Room.findById(req.params.id, function(err, room){
        if (err) { handleError(res, err); }
        
        console.log(req.body);
        
        var user_id = req.body.user_id;
        
        // check for password if the room is not public
        if(!room.public){
            var room_password = req.body.room_password;
        
            if(room_password !== room.password){
                console.log('incorrect password');
                return res.status(200).json(null);
            }
        }
        
        // check if user parameter is not null
        if(!user_id){
            console.log('incorrect user_id');
            return res.status(200).json(null);
        }
        
        // check if the user already exists
        var users = room.users;
        for(var i = 0; i < users.length; i++){
            if(users[i].toString() === user_id){
                return res.status(200).json(room);
            }
        }
        
        // adds user to room
        room.users.push(user_id);
        // update user location
        User.findById(user_id, function(err, user){
            if (err) { handleError(res, err); }
            
            user.location = room._id;
            console.log("USER LOCATION: " + user.location);
            
            user.save(function(err, user){
                if (err) { handleError(res, err); }
                
                // update & save changes to room
                room.population++;
                room.save(function(err, room){
                    if (err) { handleError(res, err); }
                    return res.status(200).json(room);
                });
                
            });
        });
        
        
    });
}

exports.removeNulls = function(req, res){
        Room.findById(req.params.id, function(err, room){
        if (err) { handleError(res, err); }
        console.log(req.body);
        
        var users = room.users;
        for(var i = 0; i < users.length; i++){
            if(!users[i]){
                users.splice(i,1);
                room.population--;
            }
        }
        
        room.save(function(err, room){
            if (err) { handleError(res, err); }
            res.status(200).json(room);
        });
    });
}
// Remove user, if the user is the room owner, change the room owner to
// one of the remaining users in the room
exports.removeUser = function(req, res){
    
    var user_id = req.body._id;
    
    Room.findById(req.params.id, function(err, room){
        
        if (err) { handleError(res, err); }
        
        for(var i = 0; i < room.users.length; i++){
            
            if(room.users[i].toString() === user_id){
                // remove user from room
                room.users.splice(i,1);
                
                // update user location
                User.findById(user_id, function(err, user){
                    if (err) { handleError(res, err); }
                    user.location = null;
                    user.save(function(err, user){
                        if (err) { handleError(res, err); }
                        
                    });
                });
                
                // remove room if there are no users
                room.population--;
                if(room.users.length == 0){
                    room.remove();
                }
                
                // update room owner (if needed)
                if(room.users[i] === room.owner){
                    room.owner = room.users[0];
                }
                
            }
        }
        
        room.save(function(err, room){
            if (err) { handleError(res, err); }
            return res.status(200).json(room);
        });
    });
}

exports.roomInfo = function(req,res){
    
    Room.findById(req.params.id, function(err, room){
        if (err) { handleError(res,err); }
        console.log(room);
        res.status(200).json(room);
    });
    
}

exports.deleteRoom = function (req, res){
    
    // TODO: Remove users (location) from room
    // Remove room
    Room.findByIdAndRemove(req.params.id, function(err){
        if (err) { handleError(res, err); }
        return res.status(200).json(null);
    });
}