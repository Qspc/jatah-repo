export const formatToThreeDigit = (
    num: number,
    isRupiah: boolean = false
): string => {
    const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${isRupiah ? "Rp " : ""}${formatted}`;
};

export const dateFormatTable = (input: string): string => {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months start at 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};
