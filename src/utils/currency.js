export const formatRupiah = (value) => {
  const number = value.replace(/\D/g, "");

  if (!number) return "";

  return (
    "Rp " +
    new Intl.NumberFormat("id-ID").format(number)
  );
};

export const parseRupiah = (value) => {
  return Number(
    String(value).replace(/\D/g, "")
  );
};