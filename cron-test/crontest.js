const cron = require('node-cron');

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

// Cron job her 5 saniyede bir çalışacak
cron.schedule('*/5 * * * * *', () => {
    console.log('Cron job çalışıyor: ', new Date().toLocaleTimeString());
    console.log('JSON verisi: ', JSON.stringify(jsonData, null, 2)); // JSON verisini yazdır
});
