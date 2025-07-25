export const formatToThreeDigit = (
    num: number,
    isRupiah: boolean = false
): string => {
    const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${isRupiah ? "Rp " : ""}${formatted}`;
};
