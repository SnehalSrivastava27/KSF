const nodemailer=require("nodemailer");
let transporter=nodemailer.createTransport(
    {
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: 'outlook mail',
          pass: 'outlook pass'
        },
        tls: {
            ciphers: 'SSLv3'
          }
    });
let mailContent={
    from:"Your mail",
    to:"Send mail",
    subject:"Here's you week Data",
    text:"Hope you love it",
    attachments:[{
         filename:'output.pdf',
         path:"output.pdf"
    }
    ]}
transporter.sendMail(mailContent,(error,info)=>
{
    if(error)
    {
        console.log("Galat")
    }
    else{
        console.log("Send mail at",info.response)
    }
});
    
