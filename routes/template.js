/*
*
* Serve Hogan precompiled templates as a single js file,
* if not found, try to compile then serve.
*
*/

exports.serve = function(req, res) {
	var fs = require('fs');
	var path = require('path');
	var templateFile = path.join(__dirname, '..', 'views', 'templates.js');

	function serveTemplate(file) {
		fs.readFile(file, {'encoding': 'utf8'}, function(err, datas) {
			if (!err) {
				res.setHeader('content-type', 'application/javascript');
				res.end(datas);
			} 
			else {
				compileTemplates(function(done) {
					if (done) {
						serveTemplate(templateFile);
					} else throw err;
				});
			}
		})
	}

	function compileTemplates(callback) {
		var dir = path.join(__dirname, '..', 'views', 'templates'),
				walker = require('../node/walker'),
				hogan_compiler = require('../node/hogan_compiler');

		walker.findAll(dir, function(err, list) {
			hogan_compiler.makeTemplates(dir,list, function(err, done) {
				return callback(done);
			})
		});  
	}

	serveTemplate(templateFile);
	
};