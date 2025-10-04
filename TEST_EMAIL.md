# Test the Email Functionality

You can test the quote request email functionality right now:

1. **Open the website**: http://localhost:3000
2. **Click "Request a Quote"** button on the homepage
3. **Fill out the form** with test data
4. **Submit the form**

## What happens:

### If email is configured (with .env.local):
- ✅ Email sent directly to shubham16394@gmail.com
- ✅ Professional HTML formatted email
- ✅ Success message shown to user

### If email is NOT configured:
- ⚡ Opens user's email client (Gmail, Outlook, etc.)
- ⚡ Pre-fills recipient: shubham16394@gmail.com
- ⚡ Pre-fills subject and body with all form data
- ⚡ User just needs to click "Send"

## Sample Test Data:

```
Company Name: Test Logistics Inc
Contact Person: John Doe
Contact Number: +91 9876543210
Email: john.doe@testlogistics.com
Pickup Location: Mumbai, Maharashtra
Drop Location: Delhi, NCR
Nature of Goods: Electronics Equipment
Weight: 500 kg
Type of Packing: Carton Boxes
Type of Load: Part Truck
Dimensions: 4ft x 3ft x 2ft
```

## Current Status:
✅ **Ready to use** - The email functionality is fully implemented and will work immediately with the mailto fallback method.

To enable direct email sending, follow the setup instructions in `EMAIL_SETUP.md`.
