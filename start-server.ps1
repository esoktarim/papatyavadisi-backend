# Backend Server Başlatma Scripti
Write-Host "🚀 Papatyavadisi Backend Server Başlatılıyor..." -ForegroundColor Cyan

# .env dosyası kontrolü
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env dosyası bulunamadı!" -ForegroundColor Yellow
    Write-Host "📝 Örnek .env dosyası oluşturuluyor..." -ForegroundColor Yellow
    
    @"
EMAIL_USER=papatyavadisi80@gmail.com
EMAIL_PASS=
PORT=3001
"@ | Out-File -FilePath ".env" -Encoding UTF8
    
    Write-Host "✅ .env dosyası oluşturuldu. EMAIL_PASS değerini doldurun!" -ForegroundColor Green
    Write-Host "💡 Detaylı bilgi için: EMAIL_SETUP.md" -ForegroundColor Cyan
}

# Node modülleri kontrolü
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Node modülleri yükleniyor..." -ForegroundColor Yellow
    npm install
}

# Backend'i başlat
Write-Host "`n✅ Backend başlatılıyor..." -ForegroundColor Green
Write-Host "🌐 Server: http://localhost:3001" -ForegroundColor Cyan
Write-Host "📧 API Endpoint: http://localhost:3001/api/contact" -ForegroundColor Cyan
Write-Host "`n💡 Durdurmak için Ctrl+C basın`n" -ForegroundColor Yellow

node index.js

