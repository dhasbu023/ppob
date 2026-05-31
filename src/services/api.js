const BASE_URL =
  "https://script.google.com/macros/s/AKfycbxBkyg8P1S9y5_TsyJbgJSzAzcVHt01N80TKHYhjICI6IhD2vobALhEGDfrnvNiuN_IBQ/exec";

// =========================
// HELPER
// =========================
async function request(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API ERROR:", error);

    return {
      status: "error",
      message: error.message,
    };
  }
}

// =========================
// GET ALL
// =========================
export async function getTransactions() {
  const result = await request(BASE_URL);

  if (result.status !== "ok") {
    return [];
  }

  return result.data || [];
}

// =========================
// GET BY ID
// =========================
export async function getTransactionById(id) {
  const result = await request(
    `${BASE_URL}?id=${encodeURIComponent(id)}`
  );

  return result;
}

// =========================
// CREATE
// =========================
export async function addTransaction(data) {
  return request(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "create",
      ...data,
    }),
  });
}

// =========================
// UPDATE
// =========================
export async function updateTransaction(id, data) {
  return request(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "update",
      id,
      ...data,
    }),
  });
}

// =========================
// DELETE
// =========================
export async function deleteTransaction(id) {
  return request(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "delete",
      id,
    }),
  });
}