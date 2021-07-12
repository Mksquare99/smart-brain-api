const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '2dfb65a9838443de9de28617613e32e9'
});

const handleApiCall = (req, res ) => {
app.models
.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
	res.json(data);
})	
.catch(err => res.status(400).json('unable to work with API'))
}
         //Another solution
        // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
        // so you would change from:
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        // to:
        // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
       

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  })
	  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}