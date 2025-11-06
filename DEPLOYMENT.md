# 🚀 Production Deployment Rehberi

## Backend'i Production'da Sürekli Çalışır Tutma

### Yöntem 1: PM2 (Önerilen) ✅

PM2, Node.js uygulamalarını production'da yönetmek için en popüler çözümdür.

#### Windows'ta PM2 Kurulumu:

```powershell
# PM2'yi global olarak kurun
npm install -g pm2

# PM2 Windows Startup Script'i kurun (bilgisayar açılışında otomatik başlatma için)
pm2 startup
pm2 save
```

#### Backend'i PM2 ile Başlatma:

```powershell
cd server

# PM2 ile başlat
pm2 start index.js --name "papatyavadisi-backend"

# Veya ecosystem.config.cjs dosyasını kullan
pm2 start ecosystem.config.cjs

# Durumu kontrol et
pm2 status

# Logları görüntüle
pm2 logs papatyavadisi-backend

# Backend'i durdurma
pm2 stop papatyavadisi-backend

# Backend'i yeniden başlatma
pm2 restart papatyavadisi-backend

# Backend'i silme
pm2 delete papatyavadisi-backend
```

#### PM2 Faydaları:

- ✅ **Otomatik restart:** Hata olursa otomatik yeniden başlar
- ✅ **Log yönetimi:** Tüm loglar otomatik kaydedilir
- ✅ **Bilgisayar açılışında başlatma:** Sistem yeniden başlasa bile çalışır
- ✅ **Monitoring:** CPU ve RAM kullanımını izler
- ✅ **Zero-downtime:** Yeniden başlatma sırasında kesinti olmaz

---

### Yöntem 2: Windows Service (NSSM)

NSSM (Non-Sucking Service Manager) ile Windows Service olarak çalıştırma:

#### NSSM Kurulumu:

1. [NSSM'i indirin](https://nssm.cc/download)
2. ZIP dosyasını açın
3. `win64` klasöründen `nssm.exe`'yi `C:\Windows\System32` veya başka bir yere kopyalayın

#### Service Oluşturma:

```powershell
cd server

# Service oluştur
nssm install PapatyavadisiBackend

# Açılan pencerede:
# Path: C:\Program Files\nodejs\node.exe (veya node.exe'nin yolu)
# Startup directory: C:\Users\IONBEE\Desktop\papatyavadisi\server
# Arguments: index.js

# Service'i başlat
nssm start PapatyavadisiBackend

# Service durumunu kontrol et
nssm status PapatyavadisiBackend
```

---

### Yöntem 3: Hosting Platform'ları

#### Railway.app:
1. Railway hesabı oluşturun
2. GitHub repo'yu bağlayın
3. `server` klasörünü root olarak ayarlayın
4. Environment variables ekleyin:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `PORT`

#### Render.com:
1. Render hesabı oluşturun
2. GitHub repo'yu bağlayın
3. Web Service oluşturun
4. Root Directory: `server`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Environment variables ekleyin

#### Heroku:
```bash
cd server
heroku create papatyavadisi-backend
heroku config:set EMAIL_USER=papatyavadisi80@gmail.com
heroku config:set EMAIL_PASS=your_app_password
git push heroku main
```

---

## Frontend Deployment

### Vercel (Önerilen):
1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repo'yu bağlayın
3. Root Directory: `.` (ana klasör)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variables:
   - `VITE_API_URL=https://your-backend-url.com`

### Netlify:
1. [Netlify](https://netlify.com) hesabı oluşturun
2. GitHub repo'yu bağlayın
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment Variables ekleyin

---

## Production Checklist

### Backend:
- [ ] `.env` dosyasında `EMAIL_PASS` ayarlı
- [ ] PM2 veya hosting platform'u kullanılıyor
- [ ] Port 3001 açık (firewall'dan)
- [ ] SSL sertifikası var (HTTPS için)
- [ ] Loglar kaydediliyor
- [ ] Otomatik restart aktif

### Frontend:
- [ ] `VITE_API_URL` environment variable ayarlı
- [ ] Build başarılı
- [ ] API endpoint'leri doğru çalışıyor
- [ ] HTTPS aktif

---

## Sorun Giderme

### Backend çalışmıyor:
```powershell
# PM2 logları kontrol et
pm2 logs papatyavadisi-backend

# PM2 durumunu kontrol et
pm2 status

# Process'i yeniden başlat
pm2 restart papatyavadisi-backend
```

### Email gönderilmiyor:
- `.env` dosyasında `EMAIL_PASS` kontrol edin
- Backend loglarında hata var mı kontrol edin
- Gmail App Password'ün süresi dolmuş olabilir

### Port hatası:
- Port 3001 başka bir uygulama tarafından kullanılıyor olabilir
- Firewall ayarlarını kontrol edin
- Port'u `.env` dosyasında değiştirebilirsiniz

---

## Önerilen Production Setup

**En İyi Pratik:**
1. ✅ Backend: Railway/Render/Heroku (ücretsiz tier)
2. ✅ Frontend: Vercel/Netlify (ücretsiz tier)
3. ✅ PM2: Kendi sunucunuzda kullanıyorsanız

Bu setup ile:
- Ücretsiz hosting
- Otomatik SSL (HTTPS)
- Otomatik deployment
- Monitoring ve loglar

