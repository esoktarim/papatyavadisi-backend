# Gmail App Password Alma Yardımcı Scripti
Write-Host "`n🔐 Gmail App Password Alma Rehberi`n" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

Write-Host "`n📋 ADIMLAR:`n" -ForegroundColor Yellow

Write-Host "1️⃣  Google Hesabına Giriş" -ForegroundColor White
Write-Host "   → https://myaccount.google.com/" -ForegroundColor Gray
Write-Host "   → Gmail hesabınızla giriş yapın`n" -ForegroundColor Gray

Write-Host "2️⃣  Güvenlik Ayarları" -ForegroundColor White
Write-Host "   → Sol menüden 'Güvenlik' sekmesine tıklayın" -ForegroundColor Gray
Write-Host "   → VEYA direkt: https://myaccount.google.com/security`n" -ForegroundColor Gray

Write-Host "3️⃣  2 Adımlı Doğrulamayı Açın" -ForegroundColor White
Write-Host "   → '2 Adımlı Doğrulama' bölümünü bulun" -ForegroundColor Gray
Write-Host "   → Eğer kapalıysa 'Başlat' butonuna tıklayın" -ForegroundColor Gray
Write-Host "   → Telefon numaranızı ekleyip SMS ile onaylayın" -ForegroundColor Gray
Write-Host "   ⚠️  ÖNEMLİ: App Password için 2 Adımlı Doğrulama ZORUNLU!`n" -ForegroundColor Red

Write-Host "4️⃣  App Password Oluşturun" -ForegroundColor White
Write-Host "   → '2 Adımlı Doğrulama' bölümüne geri dönün" -ForegroundColor Gray
Write-Host "   → 'Uygulama şifreleri' seçeneğine tıklayın" -ForegroundColor Gray
Write-Host "   → VEYA direkt: https://myaccount.google.com/apppasswords" -ForegroundColor Cyan
Write-Host "   → 'Diğer (Özel ad)' seçin" -ForegroundColor Gray
Write-Host "   → İsim: 'Papatyavadisi Backend'" -ForegroundColor Gray
Write-Host "   → 'Oluştur' butonuna tıklayın`n" -ForegroundColor Gray

Write-Host "5️⃣  16 Haneli Şifreyi Kopyalayın" -ForegroundColor White
Write-Host "   → Ekranda görünen 16 haneli şifreyi kopyalayın" -ForegroundColor Gray
Write-Host "   → Format: 'abcd efgh ijkl mnop' (boşluklu)" -ForegroundColor Gray
Write-Host "   → VEYA: 'abcdefghijklmnop' (boşluksuz)" -ForegroundColor Gray
Write-Host "   ⚠️  ÖNEMLİ: Bu şifreyi sadece bir kez göreceksiniz!`n" -ForegroundColor Red

Write-Host "6️⃣  .env Dosyasına Ekleyin" -ForegroundColor White
Write-Host "   → server/.env dosyasını açın" -ForegroundColor Gray
Write-Host "   → EMAIL_PASS= şifreyi_yapıştırın" -ForegroundColor Gray
Write-Host "   → Dosyayı kaydedin`n" -ForegroundColor Gray

Write-Host "7️⃣  Backend'i Yeniden Başlatın" -ForegroundColor White
Write-Host "   → Backend'i durdurun (Ctrl+C)" -ForegroundColor Gray
Write-Host "   → Tekrar başlatın: npm run dev`n" -ForegroundColor Gray

Write-Host "=" * 60 -ForegroundColor Gray
Write-Host "`n🚀 Hızlı Linkler:" -ForegroundColor Cyan
Write-Host "   Google Hesap: https://myaccount.google.com/" -ForegroundColor White
Write-Host "   Güvenlik:     https://myaccount.google.com/security" -ForegroundColor White
Write-Host "   App Password: https://myaccount.google.com/apppasswords" -ForegroundColor White

Write-Host "`n💡 İpucu: Tarayıcıda bu linkleri açabilirsiniz:`n" -ForegroundColor Yellow
$open = Read-Host "Tarayıcıda App Password sayfasını açmak ister misiniz? (E/H)"
if ($open -eq "E" -or $open -eq "e" -or $open -eq "Y" -or $open -eq "y") {
    Start-Process "https://myaccount.google.com/apppasswords"
    Write-Host "✅ Tarayıcı açıldı!" -ForegroundColor Green
}

Write-Host "`n✅ Rehber tamamlandı. App Password'ü aldıktan sonra .env dosyasına eklemeyi unutmayın!`n" -ForegroundColor Green



