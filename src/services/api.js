const BASE_URL = "https://script.google.com/macros/s/AKfycbxEi89qFuubZGvCCQ6jhGj2voe5alC-MQ4-dD7YbWW3GZbK3OsQM9PEkpNfJPv_2LyO/exec";

// =========================
// GET DATA
// =========================
export async function getTransactions() {
  try {
    console.log("🚀 Fetching data from:", BASE_URL);

    const res = await fetch(BASE_URL);

    console.log("📡 Response status:", res.status);
    console.log("📡 Response ok:", res.ok);

    const text = await res.text(); // 🔥 ambil raw dulu
    console.log("📦 RAW RESPONSE:", text);

    let json;
    try {
      json = JSON.parse(text); // 🔥 parse manual
    } catch (err) {
      console.error("❌ JSON PARSE ERROR:", err);
      return [];
    }

    console.log("✅ JSON RESULT:", json);

    // 🔥 cek struktur data
    if (!json) {
      console.warn("⚠️ JSON kosong");
      return [];
    }

    if (Array.isArray(json)) {
      console.log("📊 Data langsung array");
      return json;
    }

    if (json.data) {
      console.log("📊 Data dari json.data");
      return json.data;
    }

    console.warn("⚠️ Struktur tidak dikenali:", json);
    return [];

  } catch (error) {
    console.error("🔥 GET ERROR:", error);
    return [];
  }
}

// =========================
// POST DATA (TETAP ADA)
// =========================
export async function addTransaction(data) {
  try {
    console.log("📤 POST DATA:", data);

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", // 🔥 FIX UTAMA
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    console.log("📦 RAW POST RESPONSE:", text);

    const result = JSON.parse(text);
    console.log("✅ POST RESULT:", result);

    return result;

  } catch (error) {
    console.error("🔥 POST ERROR:", error);
    return { status: "error" };
  }
}

// =========================
// DELETE DATA
// =========================
export async function deleteTransaction(id) {
  try {
    console.log("🗑️ DELETE ID:", id);

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        source: "web",
        action: "delete", // 🔥 penting
        id: id,
      }),
    });

    const text = await res.text();
    console.log("📦 RAW DELETE RESPONSE:", text);

    const result = JSON.parse(text);
    console.log("✅ DELETE RESULT:", result);

    return result;

  } catch (error) {
    console.error("🔥 DELETE ERROR:", error);
    return { status: "error" };
  }
}