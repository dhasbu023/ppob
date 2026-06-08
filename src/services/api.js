const BASE_URL =
  "https://script.google.com/macros/s/AKfycbyK5ctq5HgM28QZrJ583BGR9sTp_1MbQfAn2hYFKHLomI9sygqqyedFXEujSl7k74WQ9w/exec";

// =========================
// HELPER DEBUG
// =========================
function now() {
  return new Date().toLocaleString();
}

// =========================
// REQUEST
// =========================
async function request(
  url,
  options = {}
) {
  const requestId =
    Date.now();

  console.group(
    `🚀 API REQUEST #${requestId}`
  );

  console.log(
    "Time:",
    now()
  );

  console.log(
    "URL:",
    url
  );

  console.log(
    "Method:",
    options.method || "GET"
  );

  console.log(
    "Headers:",
    options.headers || {}
  );

  console.log(
    "Body:",
    options.body || null
  );

  console.groupEnd();

  console.time(
    `⏱ Request ${requestId}`
  );

  try {
    const res = await fetch(
      url,
      options
    );

    console.timeEnd(
      `⏱ Request ${requestId}`
    );

    console.group(
      `📥 API RESPONSE #${requestId}`
    );

    console.log(
      "Status:",
      res.status
    );

    console.log(
      "Status Text:",
      res.statusText
    );

    console.log(
      "OK:",
      res.ok
    );

    console.log(
      "Type:",
      res.type
    );

    console.log(
      "Response URL:",
      res.url
    );

    console.log(
      "Content-Type:",
      res.headers.get(
        "content-type"
      )
    );

    console.log(
      "Date Header:",
      res.headers.get("date")
    );

    console.groupEnd();

    const rawText =
      await res.text();

    console.group(
      `📄 RAW RESPONSE #${requestId}`
    );

    console.log(rawText);

    console.groupEnd();

    if (!res.ok) {
      throw new Error(
        `HTTP ${res.status} ${res.statusText}`
      );
    }

    try {
      const json =
        JSON.parse(rawText);

      console.group(
        `✅ JSON RESPONSE #${requestId}`
      );

      console.log(json);

      console.groupEnd();

      return json;
    } catch (jsonError) {
      console.group(
        `❌ JSON PARSE ERROR #${requestId}`
      );

      console.error(
        jsonError
      );

      console.error(
        "Raw Response:"
      );

      console.error(
        rawText
      );

      console.groupEnd();

      throw new Error(
        "Response bukan JSON valid"
      );
    }
  } catch (error) {
    console.timeEnd?.(
      `⏱ Request ${requestId}`
    );

    console.group(
      `💥 API ERROR #${requestId}`
    );

    console.error(
      "Error Object:",
      error
    );

    console.error(
      "Name:",
      error.name
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Stack:",
      error.stack
    );

    if (
      error.message?.includes(
        "Failed to fetch"
      )
    ) {
      console.warn(
        "Kemungkinan penyebab:"
      );

      console.warn(
        "- URL Apps Script salah"
      );

      console.warn(
        "- Deploy Web App belum publik"
      );

      console.warn(
        "- CORS ditolak"
      );

      console.warn(
        "- Tidak ada koneksi internet"
      );

      console.warn(
        "- Endpoint tidak aktif"
      );
    }

    console.groupEnd();

    return {
      status: "error",
      message:
        error.message ||
        "Unknown Error",
    };
  }
}

// =========================
// GET ALL
// =========================
export async function getTransactions() {
  console.group(
    "📋 GET ALL TRANSACTIONS"
  );

  const result =
    await request(BASE_URL);

  console.log(
    "Result:",
    result
  );

  console.groupEnd();

  if (
    result?.status !== "ok"
  ) {
    return [];
  }

  return result.data || [];
}

// =========================
// GET BY ID
// =========================
export async function getTransactionById(
  id
) {
  console.group(
    "🔍 GET TRANSACTION BY ID"
  );

  console.log("ID:", id);

  const result =
    await request(
      `${BASE_URL}?id=${encodeURIComponent(
        id
      )}`
    );

  console.log(
    "Result:",
    result
  );

  console.groupEnd();

  return result;
}

// =========================
// CREATE
// =========================
export async function addTransaction(
  data
) {
  const payload = {
    action: "create",
    ...data,
  };

  console.group(
    "➕ CREATE TRANSACTION"
  );

  console.log(
    "Payload:",
    payload
  );

  console.log(
    "JSON:",
    JSON.stringify(
      payload,
      null,
      2
    )
  );

  console.groupEnd();

  return request(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type":
        "text/plain;charset=utf-8",
    },
    body: JSON.stringify(
      payload
    ),
  });
}

// =========================
// UPDATE
// =========================
export async function updateTransaction(
  id,
  data
) {
  const payload = {
    action: "update",
    id,
    ...data,
  };

  console.group(
    "✏️ UPDATE TRANSACTION"
  );

  console.log("ID:", id);

  console.log(
    "Payload:",
    payload
  );

  console.groupEnd();

  return request(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type":
        "text/plain;charset=utf-8",
    },
    body: JSON.stringify(
      payload
    ),
  });
}

// =========================
// DELETE
// =========================
export async function deleteTransaction(
  id
) {
  const payload = {
    action: "delete",
    id,
  };

  console.group(
    "🗑 DELETE TRANSACTION"
  );

  console.log("ID:", id);

  console.log(
    "Payload:",
    payload
  );

  console.groupEnd();

  return request(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type":
        "text/plain;charset=utf-8",
    },
    body: JSON.stringify(
      payload
    ),
  });
}