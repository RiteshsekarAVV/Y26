import nodemailer from 'nodemailer';
import { logger } from './logger';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    logger.info(`Email sent successfully to ${options.to}`, { messageId: info.messageId });
  } catch (error) {
    logger.error('Failed to send email', { error, to: options.to });
    throw error;
  }
};

export const emailTemplates = {
  userWelcome: (name: string, email: string, tempPassword: string) => ({
    subject: 'Welcome to Yugam Finance Portal',
    html: `
      <h2>Welcome to Yugam Finance Portal</h2>
      <p>Dear ${name},</p>
      <p>Your account has been created successfully. Here are your login credentials:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      <p>Please login and change your password immediately.</p>
      <p>Best regards,<br>Yugam Finance Team</p>
    `,
  }),

  eventCreated: (eventName: string, creatorName: string, coordinatorName: string) => ({
    subject: `New Event Created: ${eventName}`,
    html: `
      <h2>New Event Created</h2>
      <p>Dear ${coordinatorName},</p>
      <p>A new event has been created and assigned to you:</p>
      <p><strong>Event Name:</strong> ${eventName}</p>
      <p><strong>Created by:</strong> ${creatorName}</p>
      <p>Please login to the portal to view details and manage the event.</p>
      <p>Best regards,<br>Yugam Finance Team</p>
    `,
  }),

  budgetSubmitted: (eventName: string, teamLeadName: string) => ({
    subject: `Budget Submitted for Review: ${eventName}`,
    html: `
      <h2>Budget Submitted for Review</h2>
      <p>Dear Finance Team,</p>
      <p>A budget has been submitted for review:</p>
      <p><strong>Event Name:</strong> ${eventName}</p>
      <p><strong>Submitted by:</strong> ${teamLeadName}</p>
      <p>Please login to the portal to review and approve the budget.</p>
      <p>Best regards,<br>Yugam Finance Portal</p>
    `,
  }),

  budgetApproved: (eventName: string, status: string, remarks: string) => ({
    subject: `Budget ${status}: ${eventName}`,
    html: `
      <h2>Budget ${status}</h2>
      <p>Dear Team,</p>
      <p>The budget for your event has been ${status.toLowerCase()}:</p>
      <p><strong>Event Name:</strong> ${eventName}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Remarks:</strong> ${remarks}</p>
      <p>Please login to the portal to view the details.</p>
      <p>Best regards,<br>Yugam Finance Team</p>
    `,
  }),

  expenseAdded: (eventName: string, itemName: string, amount: number, addedBy: string) => ({
    subject: `New Expense Added: ${eventName}`,
    html: `
      <h2>New Expense Added</h2>
      <p>Dear Event Coordinator,</p>
      <p>A new expense has been added to your event:</p>
      <p><strong>Event Name:</strong> ${eventName}</p>
      <p><strong>Item:</strong> ${itemName}</p>
      <p><strong>Amount:</strong> ₹${amount}</p>
      <p><strong>Added by:</strong> ${addedBy}</p>
      <p>Please login to the portal to view the updated budget status.</p>
      <p>Best regards,<br>Yugam Finance Team</p>
    `,
  }),
};