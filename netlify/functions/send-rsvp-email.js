export default async (request) => {
  try {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = await request.json();

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Meet The Baileys <onboarding@resend.dev>",
        to: ["meetthebaileys2026@gmail.com"],
        subject: "A new RSVP has been submitted",
        html: `
          <h2>A new RSVP has been submitted</h2>
          <p><strong>First name:</strong> ${body.first_name}</p>
          <p><strong>Last name:</strong> ${body.last_name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>No. of additional guests:</strong> ${body.additional_guest_count}</p>
          <p><strong>Date:</strong> ${body.submitted_at}</p>
        `
      })
    });

    const text = await response.text();

    return new Response(text, { status: 200 });

  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};