// * ———————————————————————————————————————————————————————— * //
// * 	image upload endpoint
// *
// * 	simples version adds the
// *	@return {response} - success boolean
// * ———————————————————————————————————————————————————————— * //
var api_call = function () {}

// vendor dependencies
var Promise = require('bluebird')

// local dependencies
var file_uploader = require(ENDURO_FOLDER + '/libs/admin_utilities/file_uploader')
var admin_sessions = require(ENDURO_FOLDER + '/libs/admin_utilities/admin_sessions')

// routed call
api_call.prototype.call = function(req, res, enduro_server){
	admin_sessions.get_user_by_session(req.body.sid)
		.then((user) => {
			return file_uploader.upload(req.files.file)
		}, (user) => {
			throw new Error('abort promise chain');
		})
		.then((image_url) => {
			res.send({
				success: true,
				image_url: image_url
			})
		}, () => {
			res.send({success: false})
		})
}

module.exports = new api_call()