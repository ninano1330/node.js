const asyncHandler = require('express-async-handler'); // 에러 체크 모듈에게 맡김
const Contact = require('../models/contactModel');

const getAllContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    
    // res.send(contacts);
    res.render('index', { contacts: contacts });
});

const addContactForm = (req, res) => {
    res.render('add');
}

const createContact = asyncHandler(async(req, res) => {
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        return res.send('필수 값이 입력되지 않았습니다.');
    }

    const contact = await Contact.create({
        name, email, phone
    });

    res.send('Create Contacts');
});

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    // res.send(contact);
    res.render('update', { contact : contact});
});

const updateContact = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const {name, email, phone} = req.body;
    const contact = await Contact.findById(id);

    if(!contact) {
        throw new Error('Contact not found.');
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.save();

    // res.json(contact);
    res.redirect('/contacts');
});

const deleteContact = asyncHandler(async(req, res) => {
    const id = req.params.id;
    // const contact = await Contact.findById(id);

    // if(!contact) {
    //     throw new Error('Contact not found.');
    // }

    // await Contact.deleteOne();
    // res.send('Deleted');

    await Contact.findByIdAndDelete(id);
    res.redirect('/contacts');
});

module.exports = {
    getAllContacts, 
    createContact,
    getContact,
    updateContact,
    deleteContact,
    addContactForm
}; 