# 📧 Email Yapılandırma Rehberi

Bu rehber, Papatyavadisi backend'inde Gmail email gönderimini yapılandırmak için gereken adımları açıklar.

## 🔐 Gmail App Password Oluşturma

### Adım 1: 2 Adımlı Doğrulamayı Etkinleştir
1. [Google Hesap Ayarları](https://myaccount.google.com/) sayfasına gidin
2. **Güvenlik** sekmesine tıklayın
3. **2 Adımlı Doğrulama** bölümünü bulun
4. Eğer etkin değilse, **Başlat** butonuna tıklayın ve adımları takip edin

### Adım 2: Uygulama Şifresi Oluştur
1. **Güvenlik** sekmesinde **2 Adımlı Doğrulama** altına gidin
2. **Uygulama şifreleri** bölümünü bulun
3. **Uygulama şifresi oluştur** butonuna tıklayın
4. Açılan pencerede:
   - **Uygulama seçin**: "Mail" seçin
   - **Cihaz seçin**: "Diğer (Özel ad)" seçin ve "Papatyavadisi Backend" yazın
5. **Oluştur** butonuna tıklayın
6. **16 haneli şifre** ekranda görünecek - Bu şifreyi kopyalayın (örnek: `abcd efgh ijkl mnop`)

## ⚙️ Backend Yapılandırması

### Adım 1: .env Dosyasını Düzenle
`server/.env` dosyasını açın ve aşağıdaki gibi düzenleyin:

```env
EMAIL_USER=papatyavadisi80@gmail.com
EMAIL_PASS=abcdefghijklmnop
PORT=3001
```

**ÖNEMLİ:** 
- `EMAIL_PASS` değerine kopyaladığınız **16 haneli Gmail App Password'ü** yapıştırın
- Şifrede boşluk varsa kaldırın (örn: `abcdefghijklmnop`)
- Normal Gmail şifrenizi değil, sadece **App Password** kullanın

### Adım 2: Backend'i Yeniden Başlatın
```bash
cd server
npm run dev
```

## ✅ Test Etme

Form gönderildiğinde:
1. Backend console'da `✅ Email sent successfully` mesajı görünmeli
2. `papatyavadisi80@gmail.com` adresine email gelmelidir

## 🔍 Sorun Giderme

### Email gönderilemiyor
- ✅ Gmail App Password'ün doğru kopyalandığından emin olun
- ✅ `.env` dosyasında boşluk veya ekstra karakter olmadığından emin olun
- ✅ 2 Adımlı Doğrulama'nın etkin olduğunu kontrol edin
- ✅ Backend console'daki hata mesajlarını kontrol edin

### "Invalid login" hatası
- Gmail App Password yerine normal şifre kullanılıyor olabilir
- App Password'ü yeniden oluşturmayı deneyin

### Email gelmiyor ama başarı mesajı gösteriliyor
- Backend'de email gönderimi loglanıyor mu kontrol edin
- Spam klasörünü kontrol edin
- Gmail hesap güvenlik ayarlarını kontrol edin

## 📝 Notlar

- Email gönderim hatası olsa bile form gönderimi başarılı olarak işaretlenir
- Form verileri backend console'da loglanır
- Production'da email gönderimi için mutlaka EMAIL_PASS yapılandırılmalıdır

