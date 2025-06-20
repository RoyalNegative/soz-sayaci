// --------------------------------------------------
// Supabase Kurulumu
// --------------------------------------------------
// 1. https://supabase.com adresinden bir hesap oluşturun ve yeni bir proje başlatın.
// 2. Projenizin Ayarlar > API bölümünden URL ve anon key bilgilerinizi alın.
// 3. Aşağıdaki değişkenlere kendi bilgilerinizi girin.
const SUPABASE_URL = 'https://iaoveosgqlcswcoqqbqu.supabase.co'; // URL düzeltildi
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb3Zlb3NncWxjc3djb2dxYnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MzQ1NzIsImV4cCI6MjA2NjAxMDU3Mn0.ZIyxZEucdXyMe4IdimazSt_gN6u4IwzFtoGWIib_JX8'; // Burayı kendi anon anahtarınız ile değiştirin

// Supabase istemcisini oluştur
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// --------------------------------------------------
// DOM Elementleri
// --------------------------------------------------
const addWordForm = document.getElementById('addWordForm');
const aleynaWordsList = document.getElementById('aleynaWordsList');
const kaanWordsList = document.getElementById('kaanWordsList');
const aleynaTotal = document.getElementById('aleynaTotal');
const kaanTotal = document.getElementById('kaanTotal');
const mostUsedWord = document.getElementById('mostUsedWord');
const totalWords = document.getElementById('totalWords');
const leader = document.getElementById('leader');
const loadingSpinner = document.getElementById('loadingSpinner');
const notification = document.getElementById('notification');

// Veri yapısı
let wordsData = {
    aleyna: {},
    kaan: {}
};

// Sayfa yüklendiğinde verileri yükle
document.addEventListener('DOMContentLoaded', async () => {
    await loadDataFromDB();
});


// --------------------------------------------------
// Veritabanı İşlemleri (CRUD)
// --------------------------------------------------

// Form gönderimi ile yeni söz ekle
addWordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(addWordForm);
    const word = formData.get('word').trim().toLowerCase();
    const person = formData.get('person');
    const count = parseInt(formData.get('count'));

    if (!word || !person || count < 1) {
        showNotification('Lütfen tüm alanları doğru şekilde doldurun!', 'error');
        return;
    }

    showLoading(true);
    try {
        const recordsToInsert = [];
        for (let i = 0; i < count; i++) {
            recordsToInsert.push({ kisi: person, soztipi: word });
        }

        const { error } = await db.from('verilmissozler').insert(recordsToInsert);

        if (error) {
            console.error('Supabase Hata Detayı:', error);
            throw new Error('Supabase hatası: ' + error.message);
        }
        
        await loadDataFromDB();
        addWordForm.reset();
        showNotification(`${word} sözü eklendi!`, 'success');

    } catch (error) {
        showNotification('Söz eklenirken hata oluştu!', 'error');
        console.error('Hata:', error);
    } finally {
        showLoading(false);
    }
});

// Sözü tamamen sil
async function deleteWord(word, person) {
    if (!confirm(`"${word}" sözünü ${person === 'aleyna' ? 'Aleyna' : 'Kaan'} için silmek istediğinizden emin misiniz?`)) {
        return;
    }

    showLoading(true);
    try {
        const { error } = await db.from('verilmissozler')
            .delete()
            .match({ kisi: person, soztipi: word });
        
        if (error) throw error;
        
        await loadDataFromDB();
        showNotification(`"${word}" sözü silindi!`, 'success');
        
    } catch (error) {
        showNotification('Söz silinirken hata oluştu!', 'error');
        console.error('Hata:', error);
    } finally {
        showLoading(false);
    }
}

// Söz sayısını bir azalt
async function decreaseWord(word, person) {
    showLoading(true);
    try {
        // Silinecek olan kaydın ID'sini bul
        const { data, error: selectError } = await db.from('verilmissozler')
            .select('id')
            .match({ kisi: person, soztipi: word })
            .limit(1)
            .single(); // Sadece bir kayıt seç

        if (selectError) {
             // Eğer hiç kayıt kalmadıysa, UI'ı yeniden yükleyerek temizle
             if (selectError.code === 'PGRST116') {
                await loadDataFromDB();
                return;
             }
             throw selectError;
        }

        // Bulunan ID'ye göre sil
        const { error: deleteError } = await db.from('verilmissozler')
            .delete()
            .match({ id: data.id });
        
        if (deleteError) throw deleteError;
        
        await loadDataFromDB();
        
    } catch (error) {
        showNotification('İşlem sırasında hata oluştu!', 'error');
        console.error('Hata:', error);
    } finally {
        showLoading(false);
    }
}

// Veritabanından tüm verileri yükle
async function loadDataFromDB() {
    showLoading(true);
    try {
        const { data, error } = await db.from('verilmissozler').select('kisi, soztipi');
        
        if (error) throw error;
        
        // Veriyi işle ve grupla
        wordsData = { aleyna: {}, kaan: {} };
        for (const item of data) {
            if (item.kisi && item.soztipi) {
                const person = item.kisi.toLowerCase();
                const word = item.soztipi;
                if (wordsData[person]) {
                    wordsData[person][word] = (wordsData[person][word] || 0) + 1;
                }
            }
        }
        
        displayAllWords();
        updateStats();
        
    } catch (error) {
        showNotification('Veriler yüklenirken hata oluştu! Supabase ayarlarınızı kontrol ettiniz mi?', 'error');
        console.error(error);
    } finally {
        showLoading(false);
    }
}


// --------------------------------------------------
// UI Fonksiyonları
// --------------------------------------------------

function displayAllWords() {
    displayPersonWords('aleyna', aleynaWordsList);
    displayPersonWords('kaan', kaanWordsList);
}

function displayPersonWords(person, container) {
    const words = wordsData[person];
    const personName = person === 'aleyna' ? 'Aleyna' : 'Kaan';
    
    if (Object.keys(words).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Henüz söz eklenmemiş</h3>
                <p>${personName} için ilk sözü eklemek için aşağıdaki formu kullanın!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = Object.entries(words)
        .sort(([,a], [,b]) => b - a)
        .map(([word, count]) => `
            <div class="word-item" data-word="${word}" data-person="${person}">
                <div class="word-info">
                    <div class="word-text">${escapeHtml(word)}</div>
                    <div class="word-count">${count} kez söylendi</div>
                </div>
                <div class="word-actions">
                    <button class="emoji-btn" onclick="decreaseWord('${word}', '${person}')" title="Sayıyı azalt">
                        ➖
                    </button>
                    <button class="btn btn-danger" onclick="deleteWord('${word}', '${person}')" title="Sözü sil">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
}

function updateStats() {
    const aleynaTotalCount = Object.values(wordsData.aleyna).reduce((sum, count) => sum + count, 0);
    const kaanTotalCount = Object.values(wordsData.kaan).reduce((sum, count) => sum + count, 0);
    
    aleynaTotal.textContent = aleynaTotalCount;
    kaanTotal.textContent = kaanTotalCount;
    
    const grandTotal = aleynaTotalCount + kaanTotalCount;
    totalWords.textContent = grandTotal;
    
    if (aleynaTotalCount > kaanTotalCount) {
        leader.textContent = '👩‍🦰 Aleyna';
        leader.style.color = '#e53e3e';
    } else if (kaanTotalCount > aleynaTotalCount) {
        leader.textContent = '👨‍🦱 Kaan';
        leader.style.color = '#2b6cb0';
    } else {
        leader.textContent = '🤝 Beraberlik';
        leader.style.color = '#4a5568';
    }
    
    const allWords = {};
    Object.entries(wordsData.aleyna).forEach(([word, count]) => {
        allWords[word] = (allWords[word] || 0) + count;
    });
    Object.entries(wordsData.kaan).forEach(([word, count]) => {
        allWords[word] = (allWords[word] || 0) + count;
    });
    
    if (Object.keys(allWords).length === 0) {
        mostUsedWord.textContent = '-';
    } else {
        const mostUsed = Object.entries(allWords)
            .sort(([,a], [,b]) => b - a)[0];
        mostUsedWord.textContent = `${mostUsed[0]} (${mostUsed[1]})`;
    }
}

function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.addEventListener('error', (e) => {
    console.error('Global hata:', e.error);
    showNotification('Beklenmeyen bir hata oluştu!', 'error');
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        if (document.activeElement.tagName !== 'BUTTON') {
             addWordForm.dispatchEvent(new Event('submit'));
        }
    }
    
    if (e.key === 'Escape') {
        addWordForm.reset();
    }
}); 