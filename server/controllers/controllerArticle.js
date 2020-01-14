const {Article} = require('../models/modelArticle');

class controllerArticle {
    static viewArticle(req, res, next) {
        Article.find({
            author: req.token.userId
        }).populate(
            "author", "name"
        ).then(data => {
            if (data.length === 0) throw "Data is empty";
            res.status(200).json(data);
        }).catch(next)
    }

    static createArticle(req, res, next) {
        let path = "";

        if (!req.file) {
            path = "";
        } else {
            path = req.file.path;
        }

        Article.create({
            title: req.body.title,
            category: req.body.category,
            author: req.token.userId,
            content: req.body.content,
            quillContent: req.body.quillContent,
            featured_image: path,
            created_at: Date.now()
        }).then(data => {
            res.status(200).json({
                message: "data successfully inserted",
                details: data
            });
        }).catch(next)
    }

    static findArticle(req, res, next) {
        Article.find({
            title: {
                $regex: req.params.title, $options: 'i'
            }
        }).populate(
            "author", "name"
        ).then(data => {
            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                throw "Data is not found !!!"
            }
        }).catch(next)
    }

    static deleteArticle(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
            .then(data => {
                if (data) {
                    res.status(200).json({
                        message: "data successfully deleted",
                        details: data
                    })
                } else {
                    throw "data not found !!!"
                }
            })
            .catch(next)
    }
}

module.exports = controllerArticle;