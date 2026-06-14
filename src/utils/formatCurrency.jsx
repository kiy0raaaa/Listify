export const formatCurrency = (number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);