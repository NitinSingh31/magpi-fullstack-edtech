/**
 * Magπ Email Notification Service
 * Dispatches automated trial booking confirmations and counselor lead alerts.
 */

export const emailService = {
  /**
   * Send Booking Confirmation to Parent & Counselor
   */
  async sendBookingConfirmation(booking) {
    try {
      const { parentName, email, subject, curriculum, grade, preferredDate, preferredTime, referenceCode } = booking;
      
      console.log(`[Email Service] 📧 Dispatching Confirmation for Booking #${referenceCode}`);
      console.log(`[Email Service] To: ${email} (${parentName})`);
      console.log(`[Email Service] Subject: 1-on-1 Trial Confirmed: ${subject} (${curriculum})`);
      console.log(`[Email Service] Slot: ${preferredDate || 'Upcoming'} at ${preferredTime}`);

      // If SMTP or Resend credentials are configured in environment variables:
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== '') {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'Magπ Education <contact@magpiedu.com>',
            to: [email],
            subject: `Confirmed: Free 45-Min Trial Session for ${subject} [Ref: ${referenceCode}]`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #061938; line-height: 1.6;">
                <div style="background: #061938; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Magπ Education</h1>
                  <p style="color: #93C5FD; margin: 6px 0 0 0; font-size: 14px;">Next-Gen 1-on-1 Tuition & Future Skill Labs</p>
                </div>
                <div style="padding: 30px; border: 1px solid #E2E8F0; border-top: none; background: #ffffff;">
                  <h2 style="color: #0072CE; margin-top: 0;">Diagnostic Trial Confirmed! 🎉</h2>
                  <p>Dear <strong>${parentName}</strong>,</p>
                  <p>Thank you for scheduling a diagnostic session with Magπ. Your trial class has been received and our senior academic counselor is matching your child with an accredited board specialist.</p>
                  
                  <div style="background: #F8FAFC; border-left: 4px solid #0072CE; padding: 16px; margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 4px 0;"><strong>Reference ID:</strong> ${referenceCode}</p>
                    <p style="margin: 4px 0;"><strong>Curriculum & Grade:</strong> ${curriculum} (${grade})</p>
                    <p style="margin: 4px 0;"><strong>Target Subject:</strong> ${subject}</p>
                    <p style="margin: 4px 0;"><strong>Slot:</strong> ${preferredDate ? preferredDate + ' • ' : ''}${preferredTime}</p>
                  </div>

                  <h3 style="color: #0A254E;">Next Steps</h3>
                  <ol style="padding-left: 20px; color: #4B6382;">
                    <li>Our academic coordinator will send the Google Meet room link via WhatsApp & Email within 2 hours.</li>
                    <li>Have the student's recent school syllabus or exam papers ready for the initial assessment.</li>
                  </ol>

                  <div style="text-align: center; margin-top: 30px;">
                    <a href="https://wa.me/916283609913?text=Hi%20Magπ,%20inquiring%20about%20booking%20${referenceCode}" 
                       style="background: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                      Connect on WhatsApp
                    </a>
                  </div>
                </div>
                <div style="text-align: center; padding: 16px; color: #7E95B1; font-size: 12px;">
                  Magπ Global Education Labs • London • Dubai • Singapore • New Delhi
                </div>
              </div>
            `
          })
        });

        const resData = await response.json();
        console.log('[Email Service] Resend API Response:', resData);
      }

      return { success: true, simulated: !process.env.RESEND_API_KEY };
    } catch (err) {
      console.warn('[Email Service] Error in email dispatch (non-blocking):', err.message);
      return { success: false, error: err.message };
    }
  }
};
