const {Schema, models, model} = require('mongoose');

const ProjectSchema = new Schema({
   title: {type: String},
   slug: {type: String, required: true},
   images: [{type: String}],
}, {
   timestamps: true,
});

export const Photo  = models.Photo || model('Photo', ProjectSchema, 'photos');
