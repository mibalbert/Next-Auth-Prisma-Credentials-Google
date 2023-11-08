/**
 * send-activate-email/route.js
 */


import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {

    const { email } = await req.json()

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (user.active === true) {
      return NextResponse.json({ message: "Email already activated!", ok: false }, { status: 200 })
    }
    // return NextResponse.json({ message: "Email!", email }, { status: 200 })

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'bitcode222@gmail.com',
        pass: 'lzbp bipl ronj yjqg'
      }
    });
    const token = await prisma.activateToken.create({
      data: {
        userId: user.id,
        token: `${uuidv4()}${uuidv4()}`.replace(/-/g, ''),
      },
    })

    const mailOptions = {
      from: 'bitcode222@gmail.com',
      to: `${email}`,
      subject: 'Sending Email using Node.js',
      text: `That was easy! http://localhost:3000/auth/activate/${token.token}
      
      This link is only active for 24 hours`,

    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(NextResponse.json({ message: 'Error occurred: ' + error.message, ok: false }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ message: 'Verification Email sent successfully. Check out your inbox!', ok: true }, { status: 200 }));
        }
      });
    });

  } catch (error) {
    return NextResponse.json({ message: "Server Error", ok: false }, { status: 200 })
  }
}


























































// return NextResponse.json({ message: "asdasd", res }, { status: 200 })

// const emailHtml = render(SpringSalesMail({ userName: name }))

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// })

// const mailOptions = {
//   from: process.env.GMAIL_USER,
//   to: email,
//   subject: "Spring flower sales💐 Don't miss out!",
//   html: emailHtml,
// }

// if (!name || !email) {
//   return new Response(
//     JSON.stringify({ message: 'Please submit your name and email' }),
//     { status: 400 }
//   )
// }

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error(error)
//     return new Response(
//       JSON.stringify({ message: 'Error: Could not send email' }),
//       { status: 400 }
//     )
//   }

//   console.log('Email sent: ' + info.response)
//   return new Response(
//     JSON.stringify({ message: 'Email sent successfully' }),
//     { status: 200 }
//   )
// })