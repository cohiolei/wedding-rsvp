import { Resend } from "resend";

export async function handler(event) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = JSON.parse(event.body);

    const response = await resend.emails.send({
      from: "Meet The Baileys <rsvp@meetthebaileys2026.online>",
      to: ["meetthebaileys2026@gmail.com"], // ← YOUR EMAIL
      subject: "A new RSVP has been submitted",
      html: `
        <h2>New RSVP</h2>
        <p><strong>First Name:</strong> ${data.first_name}</p>
        <p><strong>Last Name:</strong> ${data.last_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
	<p><strong>Attending:</strong> ${data.primary_attending ? "Yes" : "No"}</p>
        <p><strong>Guests:</strong> ${data.additional_guest_count}</p>
        <p><strong>Time:</strong> ${data.submitted_at}</p>
      `,
    });
await resend.emails.send({
  from: "Meet The Baileys <rsvp@meetthebaileys2026.online>",
  to: [data.email],
  subject: "RSVP Confirmation",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
    <img 
      src="https://thunderous-medovik-958d49.netlify.app/background.jpg" 
      alt="Chelsea and David" 
      style="width: 100%; border-radius: 12px; display: block; margin-bottom: 24px;"
    />

    <h2 style="text-align: center;">Thank you for your RSVP</h2>

    <p>Hi ${data.first_name},</p>

    <p>Thank you for your response. We’ve recorded your RSVP.</p>

    <p><strong>Attending:</strong> ${data.primary_attending ? "Yes" : "No"}</p>
    <p><strong>Additional guests:</strong> ${data.additional_guest_count}</p>

    <p>With love,<br>Chelsea & David</p>
  </div>
  `,
});


    console.log("EMAIL SENT:", response);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("EMAIL ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
