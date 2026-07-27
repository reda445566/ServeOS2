export const formatCurrency = (value: number) => {
  return `${value.toFixed(2)} EGP`;
};

export const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
