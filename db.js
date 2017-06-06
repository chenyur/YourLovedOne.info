'use strict';

const conf = require('./conf');
const mongoose = require('mongoose');

let Post = new mongoose.Schema({
    datePosted: String,
    message: {type: String, required: true}
});

let Diaster = new mongoose.Schema({
    title: {type: String, required: true},
    posts: {type: [Post], required: true}
});

let Person = new mongoose.Schema({
    name: {type: String, required: true},
    posts: {type: [Post], required: true}
});

mongoose.model('Post', Post);
mongoose.model('Diaster', Diaster);
mongoose.model('Person', Person);

mongoose.connect(`mongodb://${conf.get('DATABASE_URL')}/${conf.get('DATABASE_NAME')}`);
