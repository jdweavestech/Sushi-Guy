import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    let body = req.body;

    if (typeof body === 'string') {
        try {
        body = JSON.parse(body);
        } catch (err) {
        return res.status(400).json({ error: 'Invalid JSON' });
        }
    }

    const { name, email, phone, services, message } = body;

    console.log("Received contact form:", body);

    try {
        const data = await resend.emails.send({
        from: 'Website Contact <on@resend.dev>',
        to: 'jdalisaymo.10@gmail.com',
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

        res.status(200).json({ success: true, message: 'Email sent successfully.', data });
    } catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
    }
}
