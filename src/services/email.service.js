const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch((err) =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}



const sendEmail = async (to, subject, html) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);

};

const sendEmailVerification = async (to, otp) => {
  console.log("sendEmailVerification", to, otp);
  const subject = "User verification code";
  const html = `
  <body style="background-color: #f3f4f6; padding: 2rem; font-family: Arial, sans-serif; color: #333;">
    <div
        style="max-width: 32rem; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); text-align: center;">
        <img src="https://test-prediction-website.netlify.app/Images/Auth/Header-logo.png"
            alt="Contest Hunters" style="max-width: 10rem; margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937;">Welcome to Contest Hunters
        </h1>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">Thank you for joining Contest Hunters! Your account is almost
            ready.</p>
        <div
            style="background: linear-gradient(135deg, #704AAA, #704AAA); color: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 2rem; font-weight: 800; letter-spacing: 0.1rem; margin-bottom: 1.5rem;">
            ${otp}
        </div>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">Collect this code to verify your account.</p>
        <p style="color: #ff0000; font-size: 0.85rem; margin-top: 1.5rem;">This code expires in <span
                id="timer">15:00</span>
            minutes.</p>
    </div>
  </body>
  `;

  try {
    const res = await sendEmail(to, subject, html);
    console.log(res);
    return res;
  } catch (error) {
    // Log error details for debugging
    console.error("Error sending email:");
    console.log(error);
  }
};


const sendResetPasswordEmail = async (to, otp) => {
  console.log("Password Reset Email", to, otp);
  const subject = "Password Reset Email";
  const html = `
      <body style="background-color: #f3f4f6; padding: 2rem; font-family: Arial, sans-serif; color: #333;">
          <div
              style="max-width: 32rem; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); text-align: center;">
              <img src="https://test-prediction-website.netlify.app/Images/Auth/Header-logo.png"
                  alt="NEXMO-TAG" style="max-width: 8rem; margin-bottom: 1.5rem;">
              <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937;">Password Reset Request
              </h1>
              <p style="color: #4b5563; margin-bottom: 1.5rem;">You requested a password reset for your account. Use the code
                  below to reset your password:</p>
              <div
                  style="background: linear-gradient(135deg, #704AAA, #704AAA); color: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 2rem; font-weight: 800; letter-spacing: 0.1rem; margin-bottom: 1.5rem;">
                  ${otp}
              </div>
              <p style="color: #d6471c; margin-bottom: 1.5rem;">Collect this code to reset your password. This code is valid
                  for
                  15
                  minutes.</p>
              <p style="color: #6b7280; font-size: 0.875rem; margin-top: 1.5rem;">If you did not request a password reset,
                  please ignore this email.</p>

          </div>
      </body>
`;
  try {
    await sendEmail(to, subject, html);

  } catch (error) {
    console.log(error);
  }
};


const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailVerification,
};


// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const logger = require("../config/logger"); // optional if you have a logger

// // Create transporter using Titan SMTP
// const transport = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT),
//   secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// // Verify connection
// transport.verify()
//   .then(() => logger ? logger.info("Connected to Titan SMTP server") : console.log("Connected to Titan SMTP server"))
//   .catch((err) => logger ? logger.warn("Unable to connect to Titan SMTP server", err) : console.warn("Unable to connect to Titan SMTP server", err));

// // Generic send email function
// const sendEmail = async (to, subject, html) => {
//   const msg = {
//     from: process.env.EMAIL_FROM,
//     to,
//     subject,
//     html,
//   };

//   return transport.sendMail(msg);
// };

// // Send verification OTP email
// const sendEmailVerification = async (to, otp) => {
//   const subject = "User verification code";
//   const html = `
//   <body style="background-color: #f3f4f6; padding: 2rem; font-family: Arial, sans-serif; color: #333;">
//     <div style="max-width: 32rem; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); text-align: center;">
//         <img src="https://test-prediction-website.netlify.app/Images/Auth/Header-logo.png"
//             alt="Contest Hunters" style="max-width: 10rem; margin-bottom: 1.5rem;">
//         <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937;">Welcome to Contest Hunters
//         </h1>
//         <p style="color: #4b5563; margin-bottom: 1.5rem;">Thank you for joining Contest Hunters! Your account is almost ready.</p>
//         <div style="background: linear-gradient(135deg, #704AAA, #704AAA); color: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 2rem; font-weight: 800; letter-spacing: 0.1rem; margin-bottom: 1.5rem;">
//             ${otp}
//         </div>
//         <p style="color: #4b5563; margin-bottom: 1.5rem;">Collect this code to verify your account.</p>
//         <p style="color: #ff0000; font-size: 0.85rem; margin-top: 1.5rem;">This code expires in 3 minutes.</p>
//     </div>
//   </body>
//   `;

//   try {
//     return await sendEmail(to, subject, html);
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//   }
// };

// // Send password reset email
// const sendResetPasswordEmail = async (to, otp) => {
//   const subject = "Password Reset Email";
//   const html = `
//       <body style="background-color: #f3f4f6; padding: 2rem; font-family: Arial, sans-serif; color: #333;">
//           <div style="max-width: 32rem; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); text-align: center;">
//               <img src="https://test-prediction-website.netlify.app/Images/Auth/Header-logo.png"
//                   alt="Contest Hunters" style="max-width: 8rem; margin-bottom: 1.5rem;">
//               <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937;">Password Reset Request</h1>
//               <p style="color: #4b5563; margin-bottom: 1.5rem;">You requested a password reset for your account. Use the code below:</p>
//               <div style="background: linear-gradient(135deg, #704AAA, #704AAA); color: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 2rem; font-weight: 800; letter-spacing: 0.1rem; margin-bottom: 1.5rem;">
//                   ${otp}
//               </div>
//               <p style="color: #d6471c; margin-bottom: 1.5rem;">This code is valid for 3 minutes.</p>
//               <p style="color: #6b7280; font-size: 0.875rem; margin-top: 1.5rem;">If you did not request a password reset, please ignore this email.</p>
//           </div>
//       </body>
//   `;

//   try {
//     return await sendEmail(to, subject, html);
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//   }
// };

// // Send verification link email
// const sendVerificationEmail = async (to, token) => {
//   const subject = "Email Verification";
//   const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
//   const text = `Dear user,
// To verify your email, click on this link: ${verificationEmailUrl}
// If you did not create an account, ignore this email.`;

//   try {
//     return await sendEmail(to, subject, text);
//   } catch (error) {
//     console.error("Error sending verification link email:", error);
//   }
// };

// module.exports = {
//   transport,
//   sendEmail,
//   sendEmailVerification,
//   sendResetPasswordEmail,
//   sendVerificationEmail,
// };
