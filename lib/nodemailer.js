/**
 * nodemailer.js
 */


// import nodemailer from 'nodemailer'

// import { v4 as uuidv4 } from 'uuid';

// import prisma from './prisma';

// export const sendActivationTokenEmail = async (email) => {


//   const user = await prisma.user.findFirst({
//     where: {
//       email: email,
//       // active: false,
//     },
//   })

//   if (user.active === true) {
//     return { message: "Email already activated!", ok: false, status: 200 }
//   }

//   const transporter = nodemailer.createTransport({
//     host: 'gmail',
//     // host: 'smtp.gmail.com',
//     // port: 465,
//     // secure: true,
//     auth: {
//       user: 'bitcode222@gmail.com',
//       pass: 'lzbp bipl ronj yjqg'
//     }
//   });
//   const token = await prisma.activateToken.create({
//     data: {
//       userId: user.id,
//       token: `${uuidv4()}${uuidv4()}`.replace(/-/g, ''),
//     },
//   })

//   const mailOptions = {
//     from: 'bitcode222@gmail.com',
//     to: `${email}`,
//     subject: 'Sending Email using Node.js',
//     text: `That was easy! http://localhost:3000/auth/activate/${token.token}`,
//   };
//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.error('Error occurred:', error);
//         reject({ message: 'Error occurred: ' + error.message, success: false, status: 500 });
//       } else {
//         console.log('Email sent successfully:', info.response);
//         resolve({ message: 'Verification Email sent successfully. Check out your inbox!', success: true, status: 200 });
//       }
//     });
//   });

// }


// export const sendResetPasswordEmail = async (email) => {

//   const user = await prisma.user.findFirst({
//     where: {
//       email: email,
//     },
//   })

//   if (!user) {
//     return { message: "Email not in db!", ok: false, status: 200 }
//   }

//   const transporter = nodemailer.createTransport({
//     host: 'gmail',
//     // host: 'smtp.gmail.com',
//     // port: 465,
//     // secure: true,
//     auth: {
//       user: 'bitcode222@gmail.com',
//       pass: 'lzbp bipl ronj yjqg'
//     }
//   });
//   const token = await prisma.passwordResetToken.create({
//     data: {
//       userId: user.id,
//       token: `${uuidv4()}${uuidv4()}`.replace(/-/g, ''),
//     },
//   })

//   const mailOptions = {
//     from: 'Password Reset <bitcode222@gmail.com>',
//     to: `${email}`,
//     subject: 'Reset Password Request',
//     text: `Hello ${user.name}, someone (hopefully you) requested a password reset for this account. If you did want to reset your password, please click here: ${PROTOCOL}://${DOMAIN}/password-reset/${token.token}
//           For security reasons, this link is only valid for four hours.
//           If you did not request this reset, please ignore this email http://localhost:3000/auth/activate/${token.token}`,
//   };
//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.error('Error occurred:', error);
//         reject({ message: 'Error occurred: ' + error.message, success: false, status: 500 });
//       } else {
//         console.log('Email sent successfully:', info.response);
//         resolve({ message: 'Verification Email sent successfully. Check out your inbox!', success: true, status: 200 });
//       }
//     });
//   });

// }



// // var transporter = nodemailer.createTransport({
// //   host: 'smtp.gmail.com',
// //   port: 465,
// //   secure: true,
// //   auth: {
// //     user: 'bitcode222@gmail.com',
// //     pass: 'lzbp bipl ronj yjqg'
// //   }
// // });


// // const send = async (mailOptions) => {
// //   return transporter.sendMail(mailOptions, function (error, info) {
// //     if (error) {
// //       console.error('Error occurred:', error);

// //       // result.message = "Error occured" + error.message
// //       // result.ok = false
// //       // result.status = 500

// //       return { message: 'Error occurred: ' + error.message, ok: false, status: 500 };
// //     } else {
// //       console.log('Email sent successfully:', info.response);
// //       // result.message = "Success"
// //       // result.ok = true
// //       // result.status = 200



// //       return { message: 'Success!', ok: true, status: 200 };
// //     }
// //   });

// //   // return result
// // }

// // export const resendEmailVerification = (recipientEmail) => {
// //   var mailOptions = {
// //     from: 'bitcode222@gmail.com',
// //     to: `${recipientEmail}`,
// //     subject: 'Sending Email using Node.js',
// //     text: 'That was easy!',
// //     // html: <VerifyEmailTemplate />
// //   };

// //   return send(mailOptions)
// // }


