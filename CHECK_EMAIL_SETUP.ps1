# Email Yapılandırma Kontrol Scripti
Write-Host "📧 Email Yapılandırması Kontrol Ediliyor...`n" -ForegroundColor Cyan

$envFile = "server\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ .env dosyası bulunamadı!" -ForegroundColor Red
    Write-Host "💡 Lütfen server/.env dosyasını oluşturun" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ .env dosyası bulundu`n" -ForegroundColor Green

$envContent = Get-Content $envFile
$emailPass = $envContent | Where-Object { $_ -match "^EMAIL_PASS=" }

if ($emailPass) {
    $passValue = $emailPass -replace "^EMAIL_PASS=", ""
    
    Write-Host "📋 EMAIL_PASS değeri:" -ForegroundColor Yellow
    Write-Host "   $passValue`n" -ForegroundColor Gray
    
    # App Password kontrolü (16 karakter, genelde harf/rakam)
    if ($passValue.Length -eq 16 -and $passValue -match "^[a-zA-Z0-9]+$") {
        Write-Host "✅ Şifre formatı doğru görünüyor (16 karakter App Password)" -ForegroundColor Green
    } elseif ($passValue.Length -lt 10) {
        Write-Host "⚠️  Şifre çok kısa - Normal Gmail şifresi olabilir!" -ForegroundColor Yellow
        Write-Host "❌ Gmail normal şifre çalışmaz, App Password gerekli!" -ForegroundColor Red
    } else {
        Write-Host "⚠️  Şifre formatı şüpheli - Normal şifre olabilir" -ForegroundColor Yellow
    }
    
    Write-Host "`n🔍 App Password Kontrolü:" -ForegroundColor Cyan
    Write-Host "   ❓ Şifreniz Gmail'den aldığınız 16 haneli App Password mü?" -ForegroundColor Yellow
    Write-Host "   ❓ Yoksa normal Gmail şifreniz mi (çalışmaz!)?" -ForegroundColor Yellow
    
    Write-Host "`n💡 Eğer App Password değilse:" -ForegroundColor Cyan
    Write-Host "   1. https://myaccount.google.com/apppasswords adresine gidin" -ForegroundColor White
    Write-Host "   2. 'Mail' için yeni App Password oluşturun" -ForegroundColor White
    Write-Host "   3. 16 haneli şifreyi kopyalayın" -ForegroundColor White
    Write-Host "   4. server/.env dosyasındaki EMAIL_PASS değerini güncelleyin" -ForegroundColor White
    
} else {
    Write-Host "❌ EMAIL_PASS bulunamadı!" -ForegroundColor Red
}

Write-Host "`n🧪 Email gönderimini test etmek için:" -ForegroundColor Cyan
Write-Host "   node server/test-email.js" -ForegroundColor White

