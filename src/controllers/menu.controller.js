const Menu = require('../models/menu');
const menuCtrl = {};
const cloudinary = require('./cloudinary.controller');
const fs = require('fs-extra');

menuCtrl.findAll = async (req, res) => {
  const findAll = await Menu.find().sort({ _id: -1 });
  res.json(findAll);
}

menuCtrl.createMenu = async (req, res) => {
  if (!req.body.type) {
    res.status(400).send({
      message: 'El tipo no puede estar vacio'
    });
    return;
  }
  if (!req.body.name) {
    res.status(400).send({
      message: 'El nombre no puede estar vacio'
    });
    return;
  }
  if (!req.body.description) {
    res.status(400).send({
      message: 'El descripcion no puede estar vacio'
    });
    return;
  }
  if (!req.body.price) {
    res.status(400).send({
      message: 'El precio no puede estar vacio'
    });
    return;
  }
  if (!req.file) {
    res.status(400).send({
      message: 'La imagen no puede estar vacia'
    });
    return;
  }
  const { type, name, description, price } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const menu = new Menu({
    type,
    name,
    description,
    price,
    image: result.secure_url,
    public_id: result.public_id
  });
  await menu.save();
  await fs.unlink(req.file.path);
  res.json({ status: 'Imagen guardada con éxito.' });
}

menuCtrl.getMenu = async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  res.json(menu);
}

menuCtrl.editMenu = async (req, res) => {
  const { id } = req.params;
  const menuFind = await Menu.findById(id);
  console.log(menuFind);

  if (req.file) {
    const deleteImage = await cloudinary.v2.uploader.destroy(menuFind.public_id);
    console.log(deleteImage);
    const resultUpdate = await cloudinary.v2.uploader.upload(req.file.path);
    console.log('si existe path');
    var menu = {
      type: req.body.type,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: resultUpdate.secure_url,
      public_id: resultUpdate.public_id
    };
    console.log('resultado 1');
    console.log(menu);
  } else {
    console.log('no existe path');
    var menu = {
      type: req.body.type,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    };
    console.log('resultado 2');
    console.log(menu);
  }
  await Menu.findByIdAndUpdate(id, { $set: menu }, { new: true });
  if (req.file) {
    await fs.unlink(req.file.path);
  }
  res.json({ status: "Menu updated!" });
}

menuCtrl.deleteMenu = async (req, res) => {
  const menu = await Menu.findByIdAndRemove(req.params.id);
  const result = await cloudinary.v2.uploader.destroy(menu.public_id);
  console.log(result);
  res.json({ status: "Menu deleted!" });
}

module.exports = menuCtrl;