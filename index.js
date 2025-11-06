import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CORS yapılandırması - Production'da güvenlik için domain'e göre ayarlanabilir
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Production'da spesifik domain kullanın: "https://yourdomain.com"
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter configuration - cached for better performance
let cachedTransporter = null;

const createTransporter = async () => {
  // Return cached transporter if available
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const emailUser = process.env.EMAIL_USER || "papatyavadisi80@gmail.com";
  const emailPass = process.env.EMAIL_PASS;

  // If no email password is configured, return null (will log but not send)
  if (!emailPass) {
    console.warn("⚠️ EMAIL_PASS not configured. Email sending will be skipped.");
    console.warn("📝 To enable email sending, set EMAIL_PASS in .env file (Gmail App Password)");
    return null;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    // Additional Gmail settings for better reliability
    pool: true,
    maxConnections: 1,
    maxMessages: 3,
    // Better error handling
    secure: true,
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verify connection - wait for verification
  try {
    await transporter.verify();
    console.log("✅ Email transporter verified successfully");
    cachedTransporter = transporter;
    return transporter;
  } catch (error) {
    console.error("❌ Email transporter verification failed:", error.message);
    if (error.message.includes("Invalid login") || error.message.includes("535")) {
      console.error("💡 Authentication Error - Please check:");
      console.error("   1. EMAIL_PASS must be a Gmail App Password (not your regular password)");
      console.error("   2. Enable 2-Step Verification on your Google account");
      console.error("   3. Generate a new App Password at: https://myaccount.google.com/apppasswords");
      console.error("   4. Copy the 16-character password (without spaces) to .env file");
    }
    // Return null if verification fails, but don't cache
    return null;
  }
};

// Helper function to get logo as base64
const getLogoBase64 = () => {
  try {
    const logoPath = path.join(__dirname, '..', 'logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      const logoBase64 = logoBuffer.toString('base64');
      return `data:image/png;base64,${logoBase64}`;
    } else {
      console.warn("⚠️ Logo file not found at:", logoPath);
      return null;
    }
  } catch (error) {
    console.error("❌ Error reading logo file:", error.message);
    return null;
  }
};

// Helper function to create email templates
const createAdminEmailTemplate = (data, language = "tr") => {
  const { project, name, phone, email, message } = data;
  const date = new Date().toLocaleString(language === "tr" ? "tr-TR" : "en-US");
  const logoBase64 = getLogoBase64();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 15px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #C7A664 0%, #B89654 100%); padding: 25px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                    🏡 Papatya Vadisi
                  </h1>
                  <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.95;">
                    ${language === "tr" ? "Yeni İletişim Formu" : "New Contact Form"}
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 25px;">
                  <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 18px; font-weight: bold; border-bottom: 2px solid #C7A664; padding-bottom: 10px;">
                    ${language === "tr" ? "Form Bilgileri" : "Form Information"}
                  </h2>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                    ${project ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                        <strong style="color: #C7A664; font-size: 12px; text-transform: uppercase; display: inline-block; min-width: 80px;">
                          ${language === "tr" ? "PROJE" : "PROJECT"}:
                        </strong>
                        <span style="color: #333333; font-size: 14px;">${project}</span>
                      </td>
                    </tr>
                    ` : ""}
                    
                    ${name ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                        <strong style="color: #C7A664; font-size: 12px; text-transform: uppercase; display: inline-block; min-width: 80px;">
                          ${language === "tr" ? "İSİM" : "NAME"}:
                        </strong>
                        <span style="color: #333333; font-size: 14px;">${name}</span>
                      </td>
                    </tr>
                    ` : ""}
                    
                    ${phone ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                        <strong style="color: #C7A664; font-size: 12px; text-transform: uppercase; display: inline-block; min-width: 80px;">
                          ${language === "tr" ? "TELEFON" : "PHONE"}:
                        </strong>
                        <a href="tel:${phone.replace(/\s/g, '')}" style="color: #333333; text-decoration: none; font-size: 14px;">
                          ${phone}
                        </a>
                      </td>
                    </tr>
                    ` : ""}
                    
                    ${email ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                        <strong style="color: #C7A664; font-size: 12px; text-transform: uppercase; display: inline-block; min-width: 80px;">
                          ${language === "tr" ? "E-POSTA" : "EMAIL"}:
                        </strong>
                        <a href="mailto:${email}" style="color: #333333; text-decoration: none; font-size: 14px;">
                          ${email}
                        </a>
                      </td>
                    </tr>
                    ` : ""}
                    
                    ${message ? `
                    <tr>
                      <td style="padding: 12px 0;">
                        <strong style="color: #C7A664; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 8px;">
                          ${language === "tr" ? "MESAJ" : "MESSAGE"}:
                        </strong>
                        <div style="color: #333333; font-size: 14px; line-height: 1.5; background-color: #fafafa; padding: 12px; border-left: 3px solid #C7A664; border-radius: 4px;">
                          ${message.replace(/\n/g, "<br>")}
                        </div>
                      </td>
                    </tr>
                    ` : ""}
                  </table>
                  
                  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0; color: #999999; font-size: 11px;">
                    <p style="margin: 3px 0;">
                      <strong>${language === "tr" ? "Dil" : "Language"}:</strong> ${language === "tr" ? "Türkçe" : "English"} | 
                      <strong>${language === "tr" ? "Tarih" : "Date"}:</strong> ${date}
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 2px solid #C7A664;">
                  <p style="margin: 0; color: #666666; font-size: 11px;">
                    ${language === "tr" 
                      ? "Bu email Papatya Vadisi web sitesinden otomatik olarak gönderilmiştir." 
                      : "This email was automatically sent from the Papatya Vadisi website."}
                  </p>
                  <p style="margin: 5px 0 0 0; color: #999999; font-size: 10px;">
                    Kadirli, Osmaniye
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const createThankYouEmailTemplate = (data, language = "tr") => {
  const { name, project } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 15px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #C7A664 0%, #B89654 100%); padding: 30px; text-align: center;">
                  <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    🏡 Papatya Vadisi
                  </h1>
                  <p style="margin: 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                    ${language === "tr" ? "Mesajınız İletildi!" : "Your Message Has Been Received!"}
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px; font-weight: bold;">
                    ${name ? `${language === "tr" ? "Sayın" : "Dear"} ${name},` : (language === "tr" ? "Sayın Müşterimiz," : "Dear Customer,")}
                  </h2>
                  
                  <div style="background-color: #fafafa; padding: 20px; border-radius: 8px; border-left: 4px solid #C7A664; margin-bottom: 25px;">
                    <p style="margin: 0 0 12px 0; color: #333333; font-size: 15px; line-height: 1.6;">
                      ${language === "tr" 
                        ? "Papatya Vadisi iletişim formunuz tarafımıza başarıyla ulaşmıştır. Talebiniz en kısa sürede değerlendirilecek ve sizinle iletişime geçilecektir." 
                        : "Your contact form for Papatya Vadisi has been successfully received. Your request will be evaluated as soon as possible and we will contact you."}
                    </p>
                    
                    <p style="margin: 12px 0 0 0; color: #555555; font-size: 14px; line-height: 1.5;">
                      ${language === "tr" 
                        ? "Bize güvendiğiniz için teşekkür ederiz. Size en iyi hizmeti sunmak için buradayız." 
                        : "Thank you for your trust. We are here to provide you with the best service."}
                    </p>
                  </div>
                  
                  ${project ? `
                    <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 2px solid #C7A664; margin-bottom: 25px; text-align: center;">
                      <p style="margin: 0 0 8px 0; color: #C7A664; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${language === "tr" ? "İlgilendiğiniz Proje" : "Your Selected Project"}
                      </p>
                      <p style="margin: 0; color: #333333; font-size: 18px; font-weight: 600;">
                        ${project}
                      </p>
                    </div>
                  ` : ""}
                  
                  <div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #e8e8e8;">
                    <p style="margin: 0 0 15px 0; color: #333333; font-size: 15px; font-weight: bold;">
                      ${language === "tr" ? "Bize Ulaşın" : "Contact Us"}
                    </p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                          <span style="font-size: 16px; margin-right: 10px;">📞</span>
                          <a href="tel:+905423982666" style="color: #C7A664; text-decoration: none; font-size: 14px;">
                            0542 398 26 66
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                          <span style="font-size: 16px; margin-right: 10px;">📧</span>
                          <a href="mailto:papatyavadisi80@gmail.com" style="color: #C7A664; text-decoration: none; font-size: 14px;">
                            papatyavadisi80@gmail.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="font-size: 16px; margin-right: 10px;">📍</span>
                          <span style="color: #666666; font-size: 14px;">
                            Kadirli, Osmaniye
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                  <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, #C7A664 0%, #B89654 100%); border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      ${language === "tr" ? "Teşekkür Ederiz" : "Thank You"}
                    </p>
                    <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 13px; opacity: 0.9;">
                      Papatya Vadisi Ekibi
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #2c2c2c; padding: 20px; text-align: center;">
                  <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 12px; font-weight: 500;">
                    Papatya Vadisi
                  </p>
                  <p style="margin: 0 0 10px 0; color: #aaaaaa; font-size: 11px;">
                    ${language === "tr" 
                      ? "Doğanın kalbinde modern yaşam" 
                      : "Modern life in the heart of nature"}
                  </p>
                  <p style="margin: 0; color: #888888; font-size: 10px;">
                    © 2025 Papatya Vadisi. ${language === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}
                  </p>
                  <p style="margin: 8px 0 0 0; color: #666666; font-size: 10px;">
                    Kadirli, Osmaniye
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Email validation helper
const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { project, phone, name, email, message, language = "tr" } = req.body;

    // Validation
    if (!phone && !email) {
      return res.status(400).json({ 
        success: false, 
        message: "Telefon veya email gereklidir" 
      });
    }

    // Email validation - geçerli format kontrolü
    const validEmail = email && isValidEmail(email);

    const transporter = await createTransporter();

    // Email to admin (Papatyavadisi)
    const adminMailOptions = {
      from: `"Papatya Vadisi Web Sitesi" <${process.env.EMAIL_USER || "papatyavadisi80@gmail.com"}>`,
      to: "papatyavadisi80@gmail.com",
      replyTo: email || process.env.EMAIL_USER || "papatyavadisi80@gmail.com",
      subject: `🔔 ${language === "tr" ? "Yeni İletişim Formu" : "New Contact Form"} - ${project || (language === "tr" ? "Genel" : "General")}`,
      html: createAdminEmailTemplate({ project, name, phone, email, message }, language),
    };

    // Email to user (thank you email) - only if email is provided AND valid
    let userMailOptions = null;
    
    if (validEmail) {
      userMailOptions = {
        from: `"Papatya Vadisi" <${process.env.EMAIL_USER || "papatyavadisi80@gmail.com"}>`,
        to: email,
        subject: language === "tr" 
          ? "Papatya Vadisi - Mesajınız İletildi!" 
          : "Papatya Vadisi - Your Message Has Been Received!",
        html: createThankYouEmailTemplate({ name, project }, language),
      };
    } else if (email && !validEmail) {
      // Geçersiz email formatı log'la ama formu yine de kabul et
      console.warn(`⚠️ Geçersiz email formatı tespit edildi: ${email}`);
      console.warn(`   Kullanıcıya teşekkür email'i gönderilmeyecek (bounce email önleniyor)`);
    }

    // Try to send emails, but don't fail if email service is not configured
    if (transporter) {
      try {
        // Send email to admin
        await transporter.sendMail(adminMailOptions);
        console.log("✅ Admin email sent successfully to papatyavadisi80@gmail.com");
        console.log("📧 Form details:", { project, name, phone, email });
        
        // Send thank you email to user if email is provided AND valid
        if (userMailOptions) {
          try {
            await transporter.sendMail(userMailOptions);
            console.log(`✅ Thank you email sent successfully to ${email}`);
          } catch (userEmailError) {
            console.error("⚠️ User thank you email send error:", userEmailError.message);
            // Admin email was sent, so we continue
            // Bounce email'i önlemek için hata durumunda log'la ama devam et
          }
        } else if (email && !validEmail) {
          // Geçersiz email - kullanıcıya email gönderme
          console.log(`ℹ️ Geçersiz email formatı nedeniyle kullanıcıya email gönderilmedi: ${email}`);
          console.log(`   Admin email başarıyla gönderildi, form kaydı başarılı`);
        }
      } catch (emailError) {
        console.error("⚠️ Admin email send error (form data still received):", emailError.message);
        console.log("📝 Form submission received:", { project, name, phone, email });
        // Continue even if email fails - form data is still valuable
      }
    } else {
      // Email not configured, but form submission is still logged
      console.log("📝 Form submission received (email not configured):", { 
        project, 
        name, 
        phone, 
        email,
        timestamp: new Date().toISOString()
      });
      console.log("💡 To enable email notifications, configure EMAIL_PASS in .env file");
    }

    // Always return success - form submission is received
    res.status(200).json({
      success: true,
      message: language === "tr" 
        ? "Mesajınız başarıyla gönderildi. En kısa sürede size ulaşacağız." 
        : "Your message has been sent successfully. We will contact you shortly.",
    });
  } catch (error) {
    console.error("❌ Request processing error:", error);
    res.status(500).json({
      success: false,
      message: language === "tr"
        ? "Bir hata oluştu. Lütfen tekrar deneyin."
        : "An error occurred. Please try again.",
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log("🚀 Papatya Vadisi Backend Server");
  console.log("=".repeat(50));
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Email user: ${process.env.EMAIL_USER || "papatyavadisi80@gmail.com"}`);
  console.log(`\n📡 API Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/contact - İletişim formu`);
  console.log(`   GET  http://localhost:${PORT}/api/health - Health check`);
  
  if (process.env.EMAIL_PASS) {
    console.log(`\n✅ Email password configured - Email sending is ENABLED`);
    console.log(`📧 Emails will be sent to: papatyavadisi80@gmail.com`);
  } else {
    console.log(`\n⚠️  Email password NOT configured - Email sending is DISABLED`);
    console.log(`💡 To enable email:`);
    console.log(`   1. Create .env file in server/ directory`);
    console.log(`   2. Add: EMAIL_PASS=your_gmail_app_password`);
    console.log(`   3. See EMAIL_SETUP.md for detailed instructions`);
  }
  console.log("\n" + "=".repeat(50) + "\n");
});

