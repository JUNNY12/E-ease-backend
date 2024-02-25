const nodeMailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


const sendEmail = async (email, subject, payload, template) => {

    try {
        const oauth2Client = new OAuth2(
            process.env.OAUTH_CLIENT_ID,
            process.env.OAUTH_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.OAUTH_REFRESH_TOKEN
        });


        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    console.log("*ERR: ", err)
                    reject();
                }
                resolve(token);
            });
        });
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                accessToken,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            }
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);

        const options = () => {
            return {
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        transporter.sendMail(options(), (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.status(200).json({
                    success: true,
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = sendEmail;