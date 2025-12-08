# Email Integration Setup for Contact Form

## Current Status
The contact form is currently configured to log submissions but **does not send emails**. To enable email functionality, you need to integrate with an email service.

## Contact Form Destination
- **To Email**: drnamanya@gmail.com
- **From Email**: datacollectorslimited@gmail.com

## Recommended Solution: SendGrid (Free Tier Available)

### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com/
2. Sign up for free account (12,000 emails/month free)
3. Verify your email address
4. Complete sender authentication

### Step 2: Get API Key
1. Go to Settings → API Keys
2. Click "Create API Key"
3. Give it full access permissions
4. Copy the API key (save it securely!)

### Step 3: Add API Key to Cloudflare
```bash
cd /home/user/webapp
npx wrangler secret put SENDGRID_API_KEY
# Paste your SendGrid API key when prompted
```

### Step 4: Update the Contact Form API

Replace the contact form endpoint in `src/index.tsx` with this code:

```typescript
// Contact form API endpoint with SendGrid
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, company, service, message } = body
    
    // Get SendGrid API key from environment
    const SENDGRID_API_KEY = c.env.SENDGRID_API_KEY
    
    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured')
      return c.json({ 
        success: false, 
        message: 'Email service not configured. Please contact us directly at drnamanya@gmail.com' 
      }, 500)
    }
    
    // Prepare email data
    const emailData = {
      personalizations: [{
        to: [{ email: 'drnamanya@gmail.com' }],
        subject: `New Contact Form Submission from ${name}`
      }],
      from: {
        email: 'datacollectorslimited@gmail.com',
        name: 'Data Collectors Limited'
      },
      content: [{
        type: 'text/html',
        value: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Service Interested In:</strong> ${service || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>Submitted from Data Collectors Limited website</small></p>
        `
      }]
    }
    
    // Send email via SendGrid API
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })
    
    if (response.ok) {
      return c.json({ 
        success: true, 
        message: 'Thank you for contacting us! We will get back to you soon.' 
      })
    } else {
      const error = await response.text()
      console.error('SendGrid error:', error)
      return c.json({ 
        success: false, 
        message: 'Failed to send email. Please contact us directly at drnamanya@gmail.com' 
      }, 500)
    }
    
  } catch (error) {
    console.error('Contact form error:', error)
    return c.json({ 
      success: false, 
      message: 'Failed to submit form. Please try again or contact us directly at drnamanya@gmail.com' 
    }, 400)
  }
})
```

### Step 5: Update TypeScript Types

Add SendGrid API key to your bindings type:

```typescript
type Bindings = {
  SENDGRID_API_KEY: string;
}

const app = new Hono<{ Bindings: Bindings }>()
```

### Step 6: Deploy
```bash
npm run build
npx wrangler pages deploy dist --project-name data-collectors-ltd
```

## Alternative Email Services

### Option 2: Resend (Developer-Friendly)
- Website: https://resend.com/
- Free: 100 emails/day
- Simple API, similar setup to SendGrid
- API endpoint: https://api.resend.com/emails

### Option 3: Mailgun (Robust)
- Website: https://www.mailgun.com/
- Free: 5,000 emails/month for 3 months
- Good for high volume
- API endpoint: https://api.mailgun.net/v3/

### Option 4: Form Services (No Code Required)

**Formspree**
- Website: https://formspree.io/
- Free: 50 submissions/month
- No backend code needed
- Just change form action to their endpoint

**Basin**
- Website: https://usebasin.com/
- Free: 100 submissions/month
- Similar to Formspree

## Testing Email Functionality

After setup, test the contact form:

1. Visit your website
2. Fill out the contact form
3. Click "Send Message"
4. Check drnamanya@gmail.com inbox
5. Check spam folder if email doesn't arrive

## Troubleshooting

**Emails not arriving?**
- Check SendGrid dashboard for delivery status
- Verify sender authentication is complete
- Check spam folder
- Verify API key has correct permissions
- Check browser console for errors

**"Email service not configured" error?**
- API key not set in Cloudflare
- Run: `npx wrangler secret put SENDGRID_API_KEY`
- Redeploy after adding secret

**SendGrid sender authentication?**
- You need to verify datacollectorslimited@gmail.com in SendGrid
- Or use your personal email as sender
- Domain authentication is best for production

## Current Contact Information

**Email Addresses:**
- datacollectorslimited@gmail.com
- drnamanya@gmail.com

**Phone/WhatsApp:**
- +256 701 634653

**Locations:**
- Kampala
- Jinja
- Gulu
- Hoima

## Notes

- Form submissions are currently only logged to console
- No data is stored in database
- Emails will only send after completing this setup
- Free tier of SendGrid is sufficient for most needs
- Consider upgrading if you receive 100+ inquiries per day
