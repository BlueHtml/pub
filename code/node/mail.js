const readline = require('readline');
const nodemailer = require("nodemailer");

const TITLE = process.env.TITLE;
const KEY = process.env.KEY;
const EMAIL = process.env.EMAIL;//服务器, 端口, 发送邮箱, 密码, 接收邮箱
const arr = EMAIL.split(',');
const port = parseInt(arr[1]);
const reg = new RegExp(KEY, "i");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: arr[0],
    port: port,
    secure: port == 465, // true for 465, false for other ports
    auth: {
        user: arr[2],
        pass: arr[3],
    },
});

const mailOptions = {
    from: arr[2], // sender address
    to: arr[4] // list of receivers
    // subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
};


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

let canSend = true;
rl.on('line', async (line) => {
    if (canSend && reg.test(line)) {
        canSend = false;
        console.log(await transporter.sendMail(Object.assign(mailOptions, { subject: TITLE, text: line })));
    }
});

rl.once('close', () => {
    // end of input
    console.log('end of input');
});
