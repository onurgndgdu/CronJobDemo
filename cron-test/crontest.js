const cron = require('node-cron');
const { Client } = require('pg');


const client = new Client({
    user: 'your_username',        // PostgreSQL kullanıcı adınızı girin
    host: 'localhost',            // Veritabanı sunucu adresi
    database: 'your_database',    // Kullanılacak veritabanı adı
    password: 'your_password',    // PostgreSQL şifrenizi girin
    port: 5432,                   // PostgreSQL varsayılan portu
});

client.connect((err) => {
    if (err) {
        console.error('Veritabanına bağlanırken hata oluştu:', err.stack);
    } else {
        console.log('PostgreSQL veritabanına başarıyla bağlanıldı.');
    }
});
// Örnek JSON verisi
const jsonData = {
    name: "John Doe",
    age: 30,
    occupation: "Developer",
    location: {
        city: "San Francisco",
        country: "USA"
    }
};
client.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        age INTEGER,
        occupation VARCHAR(100),
        city VARCHAR(100),
        country VARCHAR(100)
    );
`, (err) => {
    if (err) {
        console.error('Tablo oluşturulurken hata oluştu:', err.stack);
    } else {
        console.log('Tablo kontrol edildi/oluşturuldu.');
    }
});
// Cron job her 5 saniyede bir çalışacak
cron.schedule('*/5 * * * * *', () => {
    console.log('Cron job çalışıyor: ', new Date().toLocaleTimeString());
    console.log('JSON verisi: ', JSON.stringify(jsonData, null, 2)); // JSON verisini yazdır
});
