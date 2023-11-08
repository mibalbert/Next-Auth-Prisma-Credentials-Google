/**
 * send-rest-password-email/route.js
 */

import nodemailer from 'nodemailer'

import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {

    const { email } = await request.json()

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      return { message: "Email not found!", ok: false, status: 200 }
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_ADMIN_EMAIL,
        pass: process.env.NODEMAILER_ADMIN_PASS
      }
    });
    const token = await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: `${uuidv4()}${uuidv4()}`.replace(/-/g, ''),
      },
    })

    const mailOptions = {
      from: `Reset Password <${process.env.NODEMAILER_ADMIN_EMAIL}>`,
      to: `${email}`,
      subject: 'Click the link to change your password',
      text: `That was easy! http://localhost:3000/auth/reset-password/${token.token}
      
        This link is only active for 4 hours
      
      `,
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('Error occurred:', error);
          reject(NextResponse.json({ message: 'Error occurred: ' + error.message, ok: false, status: 500 }));
        } else {
          console.log('Email sent successfully:', info.response);
          resolve(NextResponse.json({ message: 'Password Reset Email sent successfully. Check out your inbox!', ok: true, status: 200 }));
        }
      });
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Failed!', ok: false }, { status: 200 });
  }
}