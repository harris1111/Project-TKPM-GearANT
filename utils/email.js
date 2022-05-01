import nodemailer from 'nodemailer';

const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'horizon.corp.hcmus@gmail.com',
        pass: 'cqqacscybcymtade'
    }
});

export default sender;


