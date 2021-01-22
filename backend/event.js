const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const EventSchema = new Schema({
	title: {
		type: String,
		required: true,
		index: true
	},
	description: {
		type: String,
		required: true
	},

	start_date: {
		type: Date,
		
		index: true
	},
	end_date: {
		type: Date,
		index: true
		
	},
	location: {
		location_name: {
			type: String,
			index: true
		},
		
    },
		
	image_url: {
		type: String
	}
});

module.exports = mongoose.model('Event', EventSchema);