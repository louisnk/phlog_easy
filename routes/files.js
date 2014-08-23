
exports.serve = function(req,res) {
	this.pictureSet = req.query.pictureSet;
	this.searchDir = path.join(__dirname, '..', 'public', 'images', this.pictureSet);

	dirWalker.findAll(this.searchDir, function(err, list) {
		if (list.length > 0) {
			this.imageList = [];
			list.forEach(function(file, i) {
				this.imageList.push({
					'src': file.split('public\\')[1].replace('\\', '/'),
					'description': 'A photo from ' + this.pictureSet
				});
			}.bind(this));
			console.log(this.imageList);
			this.sendJSON(res, JSON.stringify({'images': this.imageList}));
		}
	}.bind(this));
}
