# OneTry Logistics - Website

This is a Next.js web application for OneTry Logistics, featuring a comprehensive company website with quote request functionality.

## Features

### Homepage
- Company branding with tagline "Tried Once. Trusted Forever."
- Quick "Request a Quote" button
- Responsive navigation

### About Us Section
- Mission Statement with company vision
- Vision Statement outlining future goals
- "Why Choose OneTry Logistics?" highlighting unique selling points:
  - Legacy of 26 Years
  - Trusted Network
  - On-Time & Damage-Free Deliveries
  - Value for Money
  - Customer-First Philosophy
  - Future-Ready approach

### Services Section
- Tailored Vehicle Solutions
- Damage-Free & On-Time Delivery
- End-to-End Shipment Monitoring
- Warehousing for Small Consignments
- Professional Loading & Unloading
- Dedicated Client Support
- Consultation & Planning

### Contact Us Section
- Headquarters address in Bangalore
- Branch office in Kanpur
- Phone numbers for both locations
- Email contact information
- Quick quote request button

### Quote Request Modal
A comprehensive form capturing all necessary shipment details:
- Company Name
- Contact Person's Name
- Contact Number
- Email Address
- Pickup Location
- Drop Location
- Nature of Goods
- Weight
- Type of Packing
- Type of Load (Full Truck or Part Truck)
- Dimensions

**Email Integration**: Form submissions are automatically sent to shubham16394@gmail.com with:
- Professional HTML formatting
- All form data organized in a readable format
- Timestamp of submission
- Fallback to mailto if server email fails

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory:
   ```bash
   cd shubham
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

## Email Configuration

The quote request form sends emails to `shubham16394@gmail.com`. To set up email functionality:

### Quick Setup (Recommended):
1. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get a Gmail App Password:
   - Go to Google Account > Security > 2-Step Verification > App passwords
   - Generate a password for this application

3. Update `.env.local` with your credentials:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ```

4. Restart the development server

### Fallback Method:
If email configuration isn't set up, the form will open the user's email client with pre-filled content that they can send manually.

For detailed setup instructions, see `EMAIL_SETUP.md`.

## Technology Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Turbopack
- **Linting**: ESLint
- **Email**: Nodemailer + EmailJS fallback
- **Dependencies**: @emailjs/browser, nodemailer

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── send-quote/
│   │       └── route.ts        # Email API endpoint
│   ├── components/
│   │   └── QuoteModal.tsx      # Quote request modal component
│   ├── lib/
│   │   └── emailService.ts     # EmailJS service (alternative)
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Homepage component
├── public/                     # Static assets
├── .env.local.example          # Environment variables template
├── EMAIL_SETUP.md              # Email configuration guide
└── ...config files
```

## Company Information

**OneTry Logistics**
- Tagline: "Tried Once. Trusted Forever."
- Experience: 26+ years in logistics
- Headquarters: Bangalore, Karnataka
- Branch: Kanpur, Uttar Pradesh
- Email: onetrylogistics@gmail.com
- Phone: 7348998743 (BLR), 9795443012 (KNP)

## Features Implementation

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Components**: Modal for quote requests with form validation
- **Smooth Navigation**: Sticky navigation with smooth scrolling to sections
- **Professional UI**: Clean, modern design reflecting company values
- **Accessibility**: Proper semantic HTML and keyboard navigation support

## Deployment

This project can be deployed on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS
- Any hosting service supporting Node.js

For Vercel deployment, simply connect your Git repository and deploy with zero configuration.
