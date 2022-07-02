
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const UserModel = mongoose.model('User');

router.get('/', async (req, res, next) => {
    try {
      const users = await UserModel.find({}).select("username acesso");
    
      res.status(200).json({
        count: users.length,
        users: users.map(user => {
          return {
            username: user.username,
            acesso: user.acesso,
            _id: user._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/users/" + user._id
            }
          }
        })
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/signup', async (req, res, next) => {
    try {
  
      let user = new UserModel({});
      user.username = req.body.username;
      user.name = req.body.name;
      //password: req.body.password
      user.setPassword(req.body.password);
      
      user = await user.save();
      res.status(201).json({
        message: 'Created user successfully',
        createdUser: {
            username: user.username,
            _id: user._id,
            request: {
                type: "GET",
                url: "http://localhost:3000/users/" + user._id
            }
        }
      })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/login', function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Por favor, preencha todos os campos'});
    }
  
    passport.authenticate('local', function(err, user, info){
      if(err){ return next(err); }
  
      if(user){
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  
router.delete('/:userId', async (req, res, next) => {
    const id = req.params.userId;
    try {
      let status = await UserModel.deleteOne({_id: id});
  
      res.status(200).json({
          message: 'Delete user',
          status: status
      })
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  
  module.exports = router;