// Test email script
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const testEmail = async () => {
  const emailUser = process.env.EMAIL_USER || "papatyavadisi80@gmail.com";
  const emailPass = process.env.EMAIL_PASS;

  console.log("🧪 Testing email configuration...");
  console.log(`📧 Email User: ${emailUser}`);
  console.log(`🔑 Email Pass: ${emailPass ? "✅ Configured" : "❌ NOT configured"}`);

  if (!emailPass) {
    console.error("❌ EMAIL_PASS not found in .env file");
    console.log("💡 Please set EMAIL_PASS in server/.env file with your Gmail App Password");
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  try {
    // Test email
    const info = await transporter.sendMail({
      from: `"Papatyavadisi Test" <${emailUser}>`,
      to: "papatyavadisi80@gmail.com",
      subject: "🧪 Test Email - Backend Mail Entegrasyonu",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #C7A664;">✅ Test Email Başarılı!</h2>
          <p>Backend mail entegrasyonu çalışıyor.</p>
          <p><strong>Tarih:</strong> ${new Date().toLocaleString("tr-TR")}</p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log(`📨 Message ID: ${info.messageId}`);
    console.log(`📧 To: ${info.accepted.join(", ")}`);
    
  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error(error.message);
    if (error.responseCode === 535) {
      console.error("\n💡 This is usually an authentication error. Check:");
      console.error("   1. EMAIL_PASS is correct (Gmail App Password)");
      console.error("   2. 2-Step Verification is enabled on Gmail");
      console.error("   3. App Password was created correctly");
    }
    process.exit(1);
  }
};

testEmail();

