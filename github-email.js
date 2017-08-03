var nodemailer = require('nodemailer');

module.exports = function(ctx, done) {
    // console.log("We got a request!");
    // console.log("Dump the request");
    // console.log(ctx);

    //Let's read the needed info from github's webhook payload
    var repository = ctx.data.repository.name;
    var action = ctx.data.action;
    var issueTitle = ctx.data.issue.title;
    var issueUrl = ctx.data.issue.url;
    var createdBy = ctx.data.issue.user.login;

    //Email template
    var template = "Hi!\n\nThis is an automatic email notification to inform you for the following issue event in Github. These are the details:\n\nAction: <action>\nTitle: <issueTitle>\nUrl: <issueUrl>\nRepository: <repository>\nCreated By: <createdBy>\n\nBest Regards,\nwebtask.io"

    //Replace with actual values in template
    var message = template.replace("<repository>", repository)
        .replace('<action>', action)
        .replace('<issueTitle>', issueTitle)
        .replace('<issueUrl>', issueUrl)
        .replace('<createdBy>', createdBy);

    var from = ctx.data.GMAIL_USER;
    
    //This is the list of the recipients
    //To add more, use comma seperated list 
    var recipients = 'kallige@ceid.upatras.gr';

    //Let's configure nodemailer for GMail SMTP
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: ctx.data.GMAIL_USER,
            pass: ctx.data.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: from,
        to: recipients,
        subject: 'Github ' + repository + ' repository | New Issue Event',
        text: message
    }

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            done(null, error);
        } else {
            console.log("OK!");
            done(null, response);
        }
    });
};