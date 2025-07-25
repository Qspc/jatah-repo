export const capitalizeFirstWord = (text: string): string => {
    const [first, ...rest] = text.trim().split(" ");
    const capitalized =
        first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
    return [capitalized, ...rest].join(" ");
};

export const capitalizeEachWord = (text: string): string => {
    return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
