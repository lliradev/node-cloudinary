const Photo = require('../models/photo');
const photoCtrl = {};
const path = require('path');
const { unlink } = require('fs-extra');

photoCtrl.getPhotos = async (req, res) => {
    const photos = await Photo.find();
    res.json(photos);
};

photoCtrl.createPhoto = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const { title, description } = req.body;
    const photo = new Photo({
        title,
        description,
        filename: req.file.filename,
        imageURL: url + '/uploads/' + req.file.filename,
        originalname: req.file.originalname
    });
    await photo.save();
    res.json({ status: "Photo saved!" });
};

photoCtrl.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.json(photo);
};

photoCtrl.editPhoto = async (req, res) => {
    let imageURL = req.body.imageURL;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imageURL = url + '/uploads/' + req.file.filename
    }
    const { id } = req.params;
    const photo = {
        title: req.body.title,
        description: req.body.description,
        imageURL: imageURL
    };
    console.log(photo);
    await Photo.findByIdAndUpdate(id, { $set: photo }, { new: true });
    res.json({ status: "Photo updated!" })
};

photoCtrl.deletePhoto = async (req, res) => {
    //const url = req.protocol + '://' + req.get('host');
    const photo = await Photo.findByIdAndDelete(req.params.id);
    //await unlink(path.resolve('./server/public/' + photo.imageURL));
    res.json({ status: "Photo deleted!" });
};

module.exports = photoCtrl;