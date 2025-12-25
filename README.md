# Papatyavadisi Backend Server

Backend server for Papatyavadisi website with email integration.

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Email Yapılandırması
Detaylı adımlar için [EMAIL_SETUP.md](./EMAIL_SETUP.md) dosyasına bakın.

**Hızlı Kurulum:**
1. `.env` dosyasını düzenleyin:
```env
EMAIL_USER=papatyavadisi80@gmail.com
EMAIL_PASS=your_gmail_app_password_here
PORT=3001
```

2. Gmail App Password nasıl alınır:
   - [Google Hesap Ayarları](https://myaccount.google.com/) > Güvenlik
   - 2 Adımlı Doğrulama'yı etkinleştir
   - Uygulama şifreleri > Mail için yeni şifre oluştur
   - 16 haneli şifreyi kopyalayıp `.env` dosyasındaki `EMAIL_PASS` değerine yapıştırın

### 3. Backend'i Başlat
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### `POST /api/contact`
İletişim formu gönderimi için endpoint.

**Request Body:**
```json
{
  "project": "Papatyavadisi - Faz 1",
  "name": "Ad Soyad",
  "phone": "05301234567",
  "email": "user@example.com",
  "message": "Mesaj (opsiyonel)",
  "language": "tr"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mesajınız başarıyla gönderildi. En kısa sürede size ulaşacağız."
}
```

### `GET /api/health`
Server sağlık kontrolü.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 📧 Email Yapılandırması

- **Email gönderim adresi:** `papatyavadisi80@gmail.com`
- **Alıcı adres:** `papatyavadisi80@gmail.com`
- **Servis:** Gmail SMTP

### Email Gönderimi
- Email yapılandırması yoksa form gönderimi yine de başarılı olur
- Form verileri backend console'da loglanır
- Email gönderimi için `EMAIL_PASS` `.env` dosyasında ayarlanmalıdır

## 🔍 Sorun Giderme

**Email gönderilemiyor:**
- `.env` dosyasında `EMAIL_PASS` değerini kontrol edin
- Gmail App Password'ün doğru olduğundan emin olun
- Backend console'daki hata mesajlarını kontrol edin

**Daha fazla bilgi için:** [EMAIL_SETUP.md](./EMAIL_SETUP.md)

## 📝 Notlar

- Backend çalışıyor ancak email gönderimi için Gmail App Password gereklidir
- Email gönderim hatası olsa bile form gönderimi başarılı olarak işaretlenir
- Tüm form gönderimleri console'da loglanır

