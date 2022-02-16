const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
    section1_title: { type: String, required: true},
    section1_description: { type: String, required: true},
    section2_title: { type: String, required: true},
    section2_description_line1: { type: String, required: true},
    section2_description_line2: { type: String, required: true},
    section2_steps_first_title: { type: String, required: true},
    section2_steps_first_description: { type: String, required: true},
    section2_steps_second_title: { type: String, required: true},
    section2_steps_second_description: { type: String, required: true},
    section2_steps_third_title: { type: String, required: true},
    section2_steps_third_description: { type: String, required: true},
    section3_title: { type: String, required: true},
    section3_description: { type: String, required: true},
    section4_title: { type: String, required: true},
    section4_subtitle: { type: String, required: true},
    section4_description: { type: String, required: true},
    section5_title: { type: String, required: true},
    section5_subtitle: { type: String, required: true},
    section5_first_title: { type: String, required: true},
    section5_first_subtitle: { type: String, required: true},
    section5_first_description: { type: String, required: true},
    section5_second_title: { type: String, required: true},
    section5_second_subtitle: { type: String, required: true},
    section5_second_description: { type: String, required: true},
    section5_third_title: { type: String, required: true},
    section5_third_subtitle: { type: String, required: true},
    section5_third_description: { type: String, required: true},
    section5_fourth_title: { type: String, required: true},
    section5_fourth_subtitle: { type: String, required: true},
    section5_fourth_description: { type: String, required: true},
    section6_line1: { type: String, required: true},
    section6_line2: { type: String, required: true},
});

const Copyright_DB = mongoose.connection.useDb('copyright');
const textModel = Copyright_DB.model('Text', textSchema);
module.exports = textModel;