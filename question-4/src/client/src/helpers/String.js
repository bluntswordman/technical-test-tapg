export const toCapitalize = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}