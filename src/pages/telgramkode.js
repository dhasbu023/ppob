function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (!data.message || !data.message.text) return;

    var chatId = data.message.chat.id;
    var userId = data.message.from.id;
    var text = data.message.text.toLowerCase();

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DATA");

    var reply = "";

    // ================= START =================
    if (text == "/start") {
      reply = "🔥 BOT PPOB AKTIF\n\nKetik /help untuk lihat semua fitur";
    }

    // ================= HELP =================
    else if (text == "/help") {
      reply =
        "📌 MENU BOT PPOB\n\n" +

        "➤ INPUT:\n" +
        "/input pulsa5k 4000 5000\n\n" +

        "➤ HAPUS:\n" +
        "/hapus TRX-xxxxx\n\n" +

        "➤ REKAP:\n" +
        "/rekap harian\n" +
        "/rekap mingguan pulsa\n" +
        "/rekap bulanan token\n" +
        "/rekap semua\n\n" +

        "➤ TARGET:\n" +
        "/target 1000000\n\n" +

        "➤ TOP PRODUK:\n" +
        "/top harian\n/top bulanan\n\n" +

        "➤ STATS:\n" +
        "/stats\n\n" +

        "📌 Contoh input benar:\n" +
        "/input pulsa5k 4000 5000\n\n" +

        "❌ Contoh salah:\n" +
        "/input pulsa (kurang angka)";
    }

    // ================= INPUT =================
    else if (text.startsWith("/input")) {
      var parts = text.split(" ");

      if (parts.length < 4) {
        reply = "❌ Format salah!\nContoh:\n/input pulsa5k 4000 5000";
      } else {
        var jenis = parts[1];
        var modal = parseInt(parts[2]);
        var jual = parseInt(parts[3]);

        if (isNaN(modal) || isNaN(jual)) {
          reply = "❌ Modal & jual harus angka!";
        } else {
          var profit = jual - modal;
          var id = "TRX-" + new Date().getTime();

          sheet.appendRow([
            id,
            new Date(),
            userId,
            jenis,
            modal,
            jual,
            profit
          ]);

          reply =
            "✅ Tersimpan\n\n" +
            "ID: " + id +
            "\nUser: " + userId +
            "\nJenis: " + jenis +
            "\nProfit: " + formatRupiah(profit);
        }
      }
    }

    // ================= HAPUS =================
    else if (text.startsWith("/hapus")) {
      var parts = text.split(" ");
      if (parts.length < 2) {
        reply = "❌ Gunakan:\n/hapus TRX-xxxx";
      } else {
        var idCari = parts[1];
        var dataSheet = sheet.getDataRange().getValues();

        var found = false;

        for (var i = 1; i < dataSheet.length; i++) {
          if (dataSheet[i][0] == idCari) {
            sheet.deleteRow(i + 1);
            found = true;
            break;
          }
        }

        reply = found ? "✅ Transaksi dihapus" : "❌ ID tidak ditemukan";
      }
    }

    // ================= REKAP =================
    else if (text.startsWith("/rekap")) {
      var parts = text.split(" ");
      var mode = parts[1] || "semua";
      var filter = parts[2] || "";

      var dataSheet = sheet.getDataRange().getValues();
      var now = new Date();

      var totalOmset = 0;
      var totalProfit = 0;
      var jumlah = 0;

      for (var i = 1; i < dataSheet.length; i++) {
        var tgl = new Date(dataSheet[i][1]);
        var jenis = dataSheet[i][3];

        var masuk = false;

        if (mode == "harian") {
          masuk = tgl.toDateString() == now.toDateString();
        } else if (mode == "mingguan") {
          masuk = (now - tgl) / 86400000 <= 7;
        } else if (mode == "bulanan") {
          masuk = tgl.getMonth() == now.getMonth();
        } else if (mode == "tahunan") {
          masuk = tgl.getFullYear() == now.getFullYear();
        } else if (mode == "semua") {
          masuk = true;
        }

        if (filter && !jenis.includes(filter)) masuk = false;

        if (masuk) {
          totalOmset += dataSheet[i][5];
          totalProfit += dataSheet[i][6];
          jumlah++;
        }
      }

      reply =
        "📊 REKAP " + mode.toUpperCase() + "\n\n" +
        "Transaksi: " + jumlah +
        "\nOmset: " + formatRupiah(totalOmset) +
        "\nProfit: " + formatRupiah(totalProfit);
    }

    // ================= TARGET =================
    else if (text.startsWith("/target")) {
      var parts = text.split(" ");
      if (parts.length < 2) {
        reply = "❌ Contoh:\n/target 1000000";
      } else {
        var target = parseInt(parts[1]);
        PropertiesService.getScriptProperties().setProperty("TARGET", target);

        reply = "🎯 Target disimpan: " + formatRupiah(target);
      }
    }

    // ================= TOP =================
    else if (text.startsWith("/top")) {
      var mode = text.split(" ")[1] || "bulanan";

      var dataSheet = sheet.getDataRange().getValues();
      var now = new Date();

      var map = {};

      for (var i = 1; i < dataSheet.length; i++) {
        var tgl = new Date(dataSheet[i][1]);
        var jenis = dataSheet[i][3];
        var profit = dataSheet[i][6];

        var masuk = false;

        if (mode == "harian") masuk = tgl.toDateString() == now.toDateString();
        else if (mode == "mingguan") masuk = (now - tgl) / 86400000 <= 7;
        else if (mode == "bulanan") masuk = tgl.getMonth() == now.getMonth();
        else if (mode == "tahunan") masuk = tgl.getFullYear() == now.getFullYear();

        if (!masuk) continue;

        if (!map[jenis]) map[jenis] = 0;
        map[jenis] += profit;
      }

      var sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

      reply = "🏆 TOP PRODUK " + mode.toUpperCase() + "\n\n";

      for (var i = 0; i < Math.min(3, sorted.length); i++) {
        reply += (i + 1) + ". " + sorted[i][0] + " → " + formatRupiah(sorted[i][1]) + "\n";
      }
    }

    // ================= STATS =================
    else if (text == "/stats") {
      var dataSheet = sheet.getDataRange().getValues();

      var total = 0, win = 0, loss = 0;

      for (var i = 1; i < dataSheet.length; i++) {
        var profit = dataSheet[i][6];
        total += profit;
        if (profit >= 0) win++; else loss++;
      }

      reply =
        "📊 STATS\n\n" +
        "Total Profit: " + formatRupiah(total) +
        "\nWin: " + win +
        "\nLoss: " + loss;
    }

    else {
      reply = "❌ Perintah tidak dikenali\nKetik /help";
    }

    sendTelegram(chatId, reply);

  } catch (err) {
    sendTelegram(chatId, "❌ Error: " + err.message);
  }
}


// FORMAT RUPIAH
function formatRupiah(angka) {
  return "Rp" + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// TELEGRAM
function sendTelegram(chatId, message) {
  var token = "8621610414:AAFwLPT94NP7BlxPcqzxugWeCfWM_Sf9RdA";
  var url = "https://api.telegram.org/bot" + token + "/sendMessage";

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });
}