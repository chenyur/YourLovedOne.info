'use strict';

//Boilerplate/generated
var express = require('express');
var router = express.Router();
require('.././db.js');

let mongoose = require('mongoose');

let Post = mongoose.model('Post');
let Diaster = mongoose.model('Diaster');
let Person = mongoose.model('Person');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/submit', (req, res) => {
   res.render('submit');
});

router.post('/submit', (req, res) => {
	let newDiaster = new Diaster({
        title: req.body.title
    });
    let newPerson = new Person({
    	name: req.body.name
    });
    let newPost = new Post({
    	datePosted: Date.now(),
    	message: req.body.message
    });
    newDiaster.posts.push(newPost);
    newPerson.posts.push(newPost);

    newDiaster.save( (e, newPost, count) => {
        if (e) return res.render('submit', {error: 'Both Fields are required!', e});
    });

    newPerson.save( (e, newPost, count) => {
        if (e) return res.render('submit', {error: 'Both Fields are required!', e});
        else res.redirect('/view');
    });
});

router.get('/view', (req, res) => {
	res.render('view');
});

router.post('/view', (req, res) => {
    let filter;
    if(req.body.query === '') filter = {};
    else if (req.body.name === 'true') filter = {'name': new RegExp('\b?'+req.body.query+'\b?', 'i')};
    else filter = {'title': new RegExp('\b?'+req.body.query+'\b?', 'i')};

    if(req.body.name === 'true') {
        Person.find(filter, function(err, person, count) {
            if(err) return res.render('view', {error: 'Queryerror', e});
            for (let p of person) {
            }
            //From hw8 repo
            let json = person.map((ele) => {
                return {
                    'name': ele.name,
                    'message': ele.posts[0].message
                };
            });
            res.json(json);
        });

    } else if(req.body.diaster =='true') {
        Diaster.find(filter, function(err, diaster, count) {
            if(err) return res.render('view', {error: 'Queryerror', e});
            for (let d of diaster) {
            }
            let json = diaster.map((ele) => {
                return {
                    'title': ele.title,
                    'message': ele.posts[0].message
                };
            });
            res.json(json);
        });
    }   else {
    }

});

module.exports = router;
