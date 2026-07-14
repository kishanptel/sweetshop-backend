const path = require("path");
const sendEmail = require("./sendMail");

async function sendWelcomeEmail(to, name) {
    const subject = `Welcome to Cacao & Crumb, ${name}! 🍫`;

    // Plain text fallback for email clients that do not support HTML
    const text = `Hi ${name},\n\n` +
        `Welcome to Cacao & Crumb! We are absolutely thrilled to welcome you to our family.\n\n` +
        `At Cacao & Crumb, we believe that life is sweeter when celebrated with premium, handcrafted treats. Our master bakers work around the clock using the finest organic ingredients to create cakes and desserts that make every moment unforgettable.\n\n` +
        `Here is a summary of your account details:\n` +
        `- Registered Email: ${to}\n` +
        `- Store Location: Plot No. 45, XYZ, Surat - 666777\n` +
        `- Contact Support: info@cacaoncrumb.in\n\n` +
        `Explore our Cakes Catalog to start planning your next celebration.\n\n` +
        `Baked with love,\n` +
        `The Cacao & Crumb Team`;

    // Responsive HTML Email Template styled in the premium dark chocolate and cream theme
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Cacao & Crumb</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
            /* Client-specific styles to force correct sizing */
            body, table, td, a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            table, td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
            
            /* Basic layout reset */
            body {
                margin: 0;
                padding: 0;
                font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
                background-color: #ffffff;
                color: #0a0a0a;
            }
            
            /* Desktop Styles */
            .wrapper {
                width: 100%;
                background-color: #ffffff;
                padding: 20px 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid rgba(61, 35, 20, 0.08);
                border-bottom: 5px solid rgba(61, 35, 20, 0.15);
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(61, 35, 20, 0.04);
            }
            .header {
                background-color: #3d2314;
                color: #ede2d1;
                padding: 40px 30px;
                text-align: center;
                border-bottom: 5px solid #2b180d;
            }
            .logo-text {
                font-size: 24px;
                font-weight: 800;
                letter-spacing: -0.03em;
                margin: 0;
                color: #ffffff;
            }
            .header-subtitle {
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: rgba(237, 226, 209, 0.85);
                margin: 0;
            }
            .body-content {
                padding: 40px 30px 15px; /* Reduced bottom padding */
                background-color: #ffffff;
            }
            .greeting {
                font-size: 20px;
                font-weight: 800;
                margin: 0 0 16px;
                color: #3d2314;
            }
            .paragraph {
                font-size: 15px;
                line-height: 1.65;
                color: rgba(10, 10, 10, 0.78);
                margin: 0 0 24px;
            }
            .details-box {
                background-color: #fcfaf7;
                border: 1px solid rgba(61, 35, 20, 0.08);
                border-bottom: 3px solid rgba(61, 35, 20, 0.12);
                border-radius: 8px;
                padding: 24px;
                margin-bottom: 30px;
            }
            .details-title {
                font-size: 14px;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin: 0 0 14px;
                color: #3d2314;
            }
            .detail-row {
                font-size: 14px;
                margin: 10px 0;
                color: rgba(10, 10, 10, 0.8);
                line-height: 1.5;
            }
            .detail-label {
                font-weight: 600;
                color: #3d2314;
                margin-right: 4px;
            }
            .detail-value {
                color: rgba(10, 10, 10, 0.78);
            }
            .cta-area {
                text-align: center;
                margin: 35px 0 25px; /* Added 25px bottom margin for spacing */
            }
            .cta-btn {
                display: inline-block;
                background-color: #3d2314;
                color: #ede2d1 !important;
                text-decoration: none;
                font-size: 15px;
                font-weight: 800;
                padding: 14px 28px;
                border-radius: 8px;
                border: 1px solid #2b180d;
                border-bottom: 4px solid #2b180d;
                box-shadow: 0 4px 10px rgba(61, 35, 20, 0.2);
            }
            .footer {
                text-align: center;
                padding: 20px 30px 30px; /* Reduced top padding */
                background-color: #fcfaf7;
                border-top: 1px solid rgba(61, 35, 20, 0.06);
                font-size: 12px;
                line-height: 1.6;
                color: rgba(10, 10, 10, 0.55);
            }
            .footer-links a {
                color: #3d2314;
                text-decoration: underline;
                font-weight: 600;
            }

            /* Responsive Mobile overrides */
            @media only screen and (max-width: 480px) {
                .wrapper {
                    padding: 0 !important; /* Clean margin, avoids extra space at top/bottom */
                    background-color: #ffffff !important;
                }
                .container {
                    width: 100% !important;
                    border-radius: 8px !important;
                }
                .header {
                    padding: 30px 20px !important;
                }
                .body-content {
                    padding: 30px 20px 10px !important; /* Reduced bottom padding on mobile */
                }
                .greeting {
                    font-size: 18px !important;
                }
                .paragraph {
                    font-size: 14px !important;
                    margin-bottom: 18px !important;
                }
                .details-box {
                    padding: 18px !important;
                    margin-bottom: 24px !important;
                }
                .detail-row {
                    margin: 12px 0 !important;
                    font-size: 13.5px !important;
                }
                .detail-label {
                    display: block !important; /* Forces label to separate line on phone screens */
                    margin-bottom: 3px !important;
                }
                .detail-value {
                    display: block !important; /* Clean value display under the label */
                }
                .footer {
                    padding: 15px 20px 24px !important; /* Reduced top padding on mobile */
                }
                .footer-text {
                    font-size: 11.5px !important;
                }
            }
        </style>
    </head>
    <body style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #ffffff; color: #0a0a0a;">
        <div class="wrapper" style="background-color: #ffffff;">
            <div class="container" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #ffffff;">
                <!-- Header -->
                <div class="header" style="background-color: #3d2314;">
                    <!-- Embedded logo CID for universal email client visibility -->
                    <img src="cid:cacaoncrumb_logo" alt="Cacao & Crumb Logo" style="height: 64px; width: 64px; border-radius: 50%; object-fit: cover; background-color: #ffffff; border: 2px solid #ede2d1; margin-bottom: 12px; display: inline-block; padding: 2px;" />
                    <h1 class="logo-text" style="margin: 0 0 6px; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 24px; font-weight: 800; color: #ffffff;">Cacao & Crumb</h1>
                    <p class="header-subtitle" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 600; color: rgba(237, 226, 209, 0.85); margin: 0;">Makers of Happiness Since 1991</p>
                </div>
                
                <!-- Main Body -->
                <div class="body-content" style="background-color: #ffffff; padding: 40px 30px 15px;">
                    <h2 class="greeting" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 800; color: #3d2314; margin: 0 0 16px;">Hi ${name},</h2>
                    <p class="paragraph" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; line-height: 1.65; color: rgba(10, 10, 10, 0.78); margin: 0 0 24px;">
                        We are absolutely thrilled to welcome you to our family! At Cacao & Crumb, we believe that life is sweeter when celebrated with premium, handcrafted treats. Our master bakers work around the clock using the finest organic ingredients to create cakes and desserts that make every celebration unforgettable.
                    </p>
                    
                    <!-- Details Info Box -->
                    <div class="details-box" style="background-color: #fcfaf7; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                        <h3 class="details-title" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 800; color: #3d2314; margin: 0 0 14px;">Your Account Summary</h3>
                        <div class="detail-row" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; margin: 10px 0; color: rgba(10, 10, 10, 0.8);">
                            <span class="detail-label" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 600; color: #3d2314; margin-right: 4px;">Registered Email:</span>
                            <span class="detail-value" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; color: rgba(10, 10, 10, 0.78);">${to}</span>
                        </div>
                        <div class="detail-row" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; margin: 10px 0; color: rgba(10, 10, 10, 0.8);">
                            <span class="detail-label" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 600; color: #3d2314; margin-right: 4px;">Store Location:</span>
                            <span class="detail-value" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; color: rgba(10, 10, 10, 0.78);">Plot No. 45, XYZ, Surat - 666777</span>
                        </div>
                        <div class="detail-row" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; margin: 10px 0; color: rgba(10, 10, 10, 0.8);">
                            <span class="detail-label" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 600; color: #3d2314; margin-right: 4px;">Support Hours:</span>
                            <span class="detail-value" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; color: rgba(10, 10, 10, 0.78);">Mon-Sat (9 AM - 6 PM)</span>
                        </div>
                    </div>
                    
                    <p class="paragraph" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; line-height: 1.65; color: rgba(10, 10, 10, 0.78); margin: 0 0 24px; margin-bottom: 10px;">
                        Ready to make life delicious? Click the button below to browse our latest menu of signature chocolate fudge cakes, cupcakes, and seasonal specials.
                    </p>
                    
                    <!-- CTA Button -->
                    <div class="cta-area" style="text-align: center; margin: 35px 0 25px;">
                        <a href="https://cnc-frontend-sage.vercel.app/our-cakes" class="cta-btn" target="_blank" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; display: inline-block; background-color: #3d2314; color: #ede2d1 !important; text-decoration: none; font-size: 15px; font-weight: 800; padding: 14px 28px; border-radius: 8px; border: 1px solid #2b180d; border-bottom: 4px solid #2b180d; box-shadow: 0 4px 10px rgba(61, 35, 20, 0.2);">Explore Our Cakes</a>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="footer" style="text-align: center; padding: 20px 30px 30px; background-color: #fcfaf7; border-top: 1px solid rgba(61, 35, 20, 0.06); font-size: 12px; line-height: 1.6; color: rgba(10, 10, 10, 0.55);">
                    <p class="footer-text" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0 0 8px;">
                        Questions? Reach out to our bakers at <a href="mailto:info@cacaoncrumb.in" style="color: #3d2314; text-decoration: none; font-weight: 600;">info@cacaoncrumb.in</a>
                    </p>
                    <!-- Split phone address layout to optimize rendering on mobile phone layout -->
                    <p class="footer-text" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0 0 4px;">
                        Plot No. 45, XYZ, Surat - 666777
                    </p>
                    <p class="footer-text" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0 0 16px;">
                        Tel: +91 XXXXXXXXXX
                    </p>
                    <p class="footer-text" style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0;">
                        &copy; 2026 Cacao & Crumb. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    const attachments = [{
        filename: 'cacaoncrumb_logo.png',
        path: path.join(__dirname, 'cacaoncrumb_logo.png'),
        cid: 'cacaoncrumb_logo'
    }];

    return await sendEmail(to, subject, text, html, attachments);
}

module.exports = sendWelcomeEmail
