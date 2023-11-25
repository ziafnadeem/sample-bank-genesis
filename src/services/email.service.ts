import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'genesisIT@gmail.com',
        pass: 'genesisIT',
      },
    });
  }

  sendBookingCompletedEmail(to: string) {
    const mailOptions = {
      from: 'genesisIT@gmail.com',
      to,
      subject: 'Booking Completed',
      text: 'Thank you for using our service. Your booking has been completed successfully.',
    };

    return this.transporter.sendMail(mailOptions);
  }
}
