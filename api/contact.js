import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    const { name, email, phone, services, message } = req.body;

    try {
        // Send the email
        await resend.emails.send({
        from: 'Website Contact <https://sushi-guy.vercel.app/>', // 👈 change to your domain (or use on@resend.dev for testing)
        to: 'jdalisaymo.10@gmail.com', // 👈 your actual inbox email address
        subject: 'New Contact Form Submission',
        html: `
            <h2>New Message Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service Interested In:</strong> ${services}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
        });

        res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
}
