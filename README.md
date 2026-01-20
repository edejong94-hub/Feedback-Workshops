# 🚀 Founded Workshop Feedback Widget

A fun, animated feedback widget for collecting workshop reviews. Built with React, Framer Motion, and confetti! 🎉

## Features

- **Engaging UX**: Emoji-based energy slider, animated interactions, confetti celebration
- **Quick to complete**: 4 questions, ~90 seconds max
- **HubSpot integration ready**: Passes contact data via URL parameters
- **Mobile responsive**: Works beautifully on all devices
- **Founded branded**: Dark theme with lime green accents

## How It Works

### URL Parameters

Link to the feedback form with these URL parameters:

```
https://your-site.netlify.app/?email=person@email.com&contactId=12345&workshop=Startup%20Basics&date=2025-01-20
```

| Parameter | Description |
|-----------|-------------|
| `email` | Contact's email address |
| `contactId` | HubSpot contact ID (optional) |
| `workshop` | Workshop name (URL encoded) |
| `date` | Workshop date (YYYY-MM-DD) |

### Data Collected

1. **Energy Level** (0-100): How energized they feel after the workshop
2. **Highlights** (multi-select): What they enjoyed most
3. **Magic Word**: One word/phrase to describe the workshop
4. **Would Recommend** (yes/no): NPS-style recommendation

## HubSpot Integration

### Option 1: HubSpot Forms (Recommended)

1. Create a HubSpot form with these fields:
   - `email` (Email)
   - `workshop_energy_level` (Number)
   - `workshop_highlights` (Multiple checkboxes or text)
   - `workshop_magic_word` (Single-line text)
   - `workshop_recommend` (Single checkbox or dropdown)
   - `workshop_name` (Single-line text)
   - `workshop_date` (Date)

2. Get your Portal ID and Form ID from HubSpot

3. Update `App.jsx` - uncomment the HubSpot Forms API section:

```javascript
const hubspotFormId = 'YOUR_FORM_ID'
const hubspotPortalId = 'YOUR_PORTAL_ID'

const response = await fetch(
  `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: [
        { name: 'email', value: urlParams.email },
        { name: 'workshop_energy_level', value: feedback.energyLevel },
        { name: 'workshop_highlights', value: feedback.highlights.join(', ') },
        { name: 'workshop_magic_word', value: feedback.magicWord },
        { name: 'workshop_recommend', value: feedback.wouldRecommend ? 'Yes' : 'No' },
        { name: 'workshop_name', value: urlParams.workshopName },
        { name: 'workshop_date', value: urlParams.workshopDate }
      ]
    })
  }
)
```

### Option 2: Backend API + HubSpot API

Create a Netlify Function or external API that:
1. Receives the feedback data
2. Uses HubSpot's Contacts API to update the contact record
3. Creates a note or engagement on the contact timeline

Example Netlify Function (`netlify/functions/feedback.js`):

```javascript
const hubspot = require('@hubspot/api-client')

exports.handler = async (event) => {
  const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_TOKEN })
  const data = JSON.parse(event.body)
  
  // Update contact properties
  await hubspotClient.crm.contacts.basicApi.update(data.contactId, {
    properties: {
      last_workshop_rating: data.energyLevel,
      last_workshop_date: data.workshopDate,
      last_workshop_feedback: data.magicWord
    }
  })
  
  return { statusCode: 200, body: 'OK' }
}
```

## Deployment to Netlify

### Quick Deploy

1. Push this code to a GitHub repository

2. Go to [Netlify](https://app.netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Connect your GitHub repo

5. Netlify will auto-detect the build settings from `netlify.toml`

6. Click "Deploy site"

### Manual Deploy (CLI)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Sending Feedback Links via HubSpot

Create a HubSpot workflow or email template that includes a personalized link:

```
https://your-feedback-site.netlify.app/?email={{contact.email}}&contactId={{contact.hs_object_id}}&workshop=Workshop%20Name&date=2025-01-20
```

## Customization

### Change highlight options

Edit `src/components/QuickPicks.jsx`:

```javascript
const options = [
  { id: 'content', emoji: '📚', label: 'Great content' },
  // Add or modify options here
]
```

### Change colors

Edit `src/index.css`:

```css
:root {
  --founded-lime: #c8ff00;  /* Primary accent */
  --founded-black: #0a0a0a; /* Background */
  /* etc */
}
```

## License

MIT - Feel free to adapt for your own organization!
