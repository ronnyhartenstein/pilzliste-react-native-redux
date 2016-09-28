export default function(str) {
    return str.replace(/ä/g, 'a%CC%88')
            .replace(/ü/g, 'u%CC%88')
            .replace(/ö/g, 'o%CC%88')
            .replace(/ß/g, '%C3%9F')
            .replace(/ /g, '%20')
}