# 🗣️ Söz Sayacı

Aleyna ve Kaan için eğlenceli bir söz sayma uygulaması! HTML, CSS ve JavaScript ile geliştirilmiş, gelecekte Neon PostgreSQL veritabanı entegrasyonu planlanmıştır.

## 🚀 Özellikler

- ✅ **İki Kişilik Sistem**: Aleyna (kırmızı tema) ve Kaan (mavi tema)
- ✅ **Söz Ekleme**: Kişi seçimi, söz ve sayı ile ekleme
- ✅ **Söz Listesi**: Her kişi için ayrı söz listesi
- ✅ **Sayı Azaltma**: ➖ butonu ile sayı azaltma
- ✅ **Söz Silme**: 🗑️ butonu ile tamamen silme
- ✅ **Gerçek Zamanlı İstatistikler**: Toplam sayılar ve liderlik
- ✅ **Modern Tasarım**: Gradient arka plan ve animasyonlar
- ✅ **LocalStorage**: Veri kalıcılığı
- ✅ **Responsive**: Mobil ve masaüstü uyumlu
- ✅ **Klavye Kısayolları**: Ctrl+Enter ve Escape

## 📁 Proje Yapısı

```
soz-sayaci/
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # JavaScript kodu
└── README.md           # Bu dosya
```

## 🛠️ Kurulum

1. Projeyi bilgisayarınıza indirin
2. `index.html` dosyasını bir web tarayıcısında açın
3. Uygulamayı kullanmaya başlayın!

## 💻 Kullanım

### Söz Ekleme
1. Alt kısımdaki formu kullanın
2. **Söz**: Eklemek istediğiniz sözü yazın (örn: "kahve", "yemek")
3. **Kişi**: Aleyna veya Kaan'dan birini seçin
4. **Sayı**: Kaç kez söylendiğini belirtin
5. **Ekle** butonuna tıklayın

### Söz Yönetimi
- **Sayı Azaltma**: ➖ butonuna tıklayarak sayıyı azaltın
- **Söz Silme**: 🗑️ butonuna tıklayarak sözü tamamen silin
- **Otomatik Silme**: Sayı 0'a düştüğünde söz otomatik silinir

### İstatistikler
- **Toplam Sayılar**: Her kişinin toplam söz sayısı
- **En Çok Kullanılan**: Tüm sözler arasında en popüler olan
- **Lider**: Daha çok söz söyleyen kişi

## 🎨 Tasarım Özellikleri

- **İki Tema**: Aleyna için kırmızı, Kaan için mavi
- **Gradient Arka Plan**: Mor-mavi geçişli modern arka plan
- **Glassmorphism**: Bulanık arka plan efektli kartlar
- **Smooth Animasyonlar**: Hover ve geçiş animasyonları
- **Emoji Butonlar**: ➖ ve 🗑️ ile sezgisel arayüz
- **Responsive Grid**: Mobil ve masaüstü uyumlu düzen

## ⌨️ Klavye Kısayolları

- **Ctrl + Enter**: Form gönderimi
- **Escape**: Form temizleme

## 🔮 Gelecek Planları

### Neon PostgreSQL Entegrasyonu
- [ ] Backend API geliştirme
- [ ] Neon PostgreSQL veritabanı kurulumu
- [ ] CRUD işlemleri için API endpoint'leri
- [ ] Gerçek zamanlı veri senkronizasyonu

### Ek Özellikler
- [ ] Söz kategorileri (günlük, haftalık, aylık)
- [ ] Grafik ve istatistik görselleştirme
- [ ] Söz geçmişi ve trend analizi
- [ ] Bildirim sistemi (doğum günü, özel günler)
- [ ] Dışa/içe aktarma (CSV, JSON)
- [ ] Çoklu kullanıcı desteği

## 🛡️ Güvenlik

- HTML injection koruması
- Form validasyonu
- XSS koruması
- Input sanitization

## 📱 Tarayıcı Desteği

- ✅ Chrome (önerilen)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🐛 Bilinen Sorunlar

- Şu anda veriler sadece tarayıcı localStorage'ında saklanıyor
- Sayfa yenilendiğinde veriler kaybolmaz
- Farklı tarayıcılarda veriler senkronize değil

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için GitHub Issues kullanabilirsiniz.

---

**Not**: Bu uygulama şu anda frontend-only olarak çalışmaktadır. Neon PostgreSQL entegrasyonu için backend geliştirmesi gereklidir.

## 🎯 Örnek Kullanım Senaryosu

1. **Kahve Ekleme**: 
   - Söz: "kahve"
   - Kişi: Aleyna
   - Sayı: 3
   - Sonuç: Aleyna'nın listesinde "kahve: 3" görünür

2. **Sayı Azaltma**:
   - Aleyna'nın "kahve" sözüne ➖ butonuna tıklayın
   - Sonuç: "kahve: 2" olur

3. **Liderlik**:
   - Aleyna: 5 söz, Kaan: 3 söz
   - Sonuç: İstatistiklerde "👩‍🦰 Aleyna" lider olarak görünür 