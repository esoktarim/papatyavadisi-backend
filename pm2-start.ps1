# PM2 ile Backend Başlatma Scripti
Write-Host "🚀 PM2 ile Backend Başlatılıyor...`n" -ForegroundColor Cyan

# PM2 kurulu mu kontrol et
try {
    $pm2Version = pm2 --version 2>&1
    Write-Host "✅ PM2 kurulu (Version: $pm2Version)" -ForegroundColor Green
} catch {
    Write-Host "❌ PM2 kurulu değil!" -ForegroundColor Red
    Write-Host "`n📦 PM2 kurulumu için:" -ForegroundColor Yellow
    Write-Host "   npm install -g pm2`n" -ForegroundColor White
    Write-Host "Kurulum sonrası bu scripti tekrar çalıştırın." -ForegroundColor Yellow
    exit 1
}

# Server dizinine git
Set-Location $PSScriptRoot

# Eğer zaten çalışıyorsa durdur
$existing = pm2 list | Select-String "papatyavadisi-backend"
if ($existing) {
    Write-Host "⚠️  Backend zaten çalışıyor, yeniden başlatılıyor..." -ForegroundColor Yellow
    pm2 delete papatyavadisi-backend 2>&1 | Out-Null
}

# .env kontrolü
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env dosyası bulunamadı!" -ForegroundColor Yellow
    Write-Host "📝 Örnek .env dosyası oluşturuluyor...`n" -ForegroundColor Yellow
    
    @"
EMAIL_USER=papatyavadisi80@gmail.com
EMAIL_PASS=
PORT=3001
"@ | Out-File -FilePath ".env" -Encoding UTF8
    
    Write-Host "✅ .env dosyası oluşturuldu. EMAIL_PASS değerini doldurun!`n" -ForegroundColor Green
}

# Log klasörü oluştur
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
    Write-Host "✅ Log klasörü oluşturuldu" -ForegroundColor Green
}

# PM2 ile başlat
Write-Host "`n📦 Ecosystem config ile başlatılıyor...`n" -ForegroundColor Cyan

if (Test-Path "ecosystem.config.cjs") {
    pm2 start ecosystem.config.cjs
} else {
    pm2 start index.js --name "papatyavadisi-backend" --instances 1 --exec-mode fork
}

Write-Host "`n✅ Backend başlatıldı!`n" -ForegroundColor Green
Write-Host "📊 Durum:" -ForegroundColor Cyan
pm2 status

Write-Host "`n💡 Kullanışlı Komutlar:" -ForegroundColor Yellow
Write-Host "   pm2 status              - Durumu kontrol et" -ForegroundColor White
Write-Host "   pm2 logs                - Logları görüntüle" -ForegroundColor White
Write-Host "   pm2 restart papatyavadisi-backend - Yeniden başlat" -ForegroundColor White
Write-Host "   pm2 stop papatyavadisi-backend     - Durdur" -ForegroundColor White
Write-Host "   pm2 delete papatyavadisi-backend  - Sil" -ForegroundColor White
Write-Host "   pm2 save                 - Mevcut process'leri kaydet (otomatik başlatma için)" -ForegroundColor White

Write-Host "`n🌐 Backend çalışıyor: http://localhost:3001" -ForegroundColor Green
Write-Host "📧 API Endpoint: http://localhost:3001/api/contact`n" -ForegroundColor Green

