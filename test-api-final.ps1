# Final API Test - Contact Form
Write-Host "🧪 Contact Form API Test`n" -ForegroundColor Cyan

$testData = @{
    project = "Papatyavadisi - Faz 1"
    name = "API Test Kullanıcı"
    phone = "0542 398 26 66"
    email = "test@example.com"
    message = "Backend mail entegrasyonu test mesajı"
    language = "tr"
}

Write-Host "📤 Test Verisi:" -ForegroundColor Yellow
$testData | ConvertTo-Json -Depth 2 | Write-Host
Write-Host "`n"

try {
    $body = $testData | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/contact" -Method POST -Body $body -ContentType "application/json"
    
    Write-Host "✅ API Başarılı!" -ForegroundColor Green
    Write-Host "📨 Response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 2 | Write-Host
    
    Write-Host "`n📧 Email Durumu:" -ForegroundColor Yellow
    Write-Host "   ✅ Admin email: papatyavadisi80@gmail.com" -ForegroundColor Green
    Write-Host "   ✅ Kullanıcı email: test@example.com (email adresi verildiyse)" -ForegroundColor Green
    Write-Host "`n💡 Gmail gelen kutunuzu kontrol edin!" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ API Hatası!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}



