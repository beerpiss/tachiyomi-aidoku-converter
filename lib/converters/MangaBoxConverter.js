import Long from 'long';
import { Converter } from './AbstractConverter.js';
class MangaBoxConverter extends Converter {
    parseMangaId(url) {
        return this.parseMangaUrl(url);
    }
    parseChapterId(url) {
        return this.parseMangaUrl(url);
    }
}
class MangaBatConverter extends MangaBoxConverter {
    constructor() {
        super(...arguments);
        this.baseUrl = 'https://m.mangabat.com';
        this.tachiyomiSourceId = new Long(1169987930, 981500240, false); // 4215511432986138970
        this.aidokuSourceId = 'en.mangabat';
        this.lang = 'en';
    }
    parseMangaUrl(url) {
        return url.replace('https://readmangabat.com', 'https://m.mangabat.com');
    }
}
class MangaNatoConverter extends MangaBoxConverter {
    constructor() {
        super(...arguments);
        this.baseUrl = 'https://manganato.com';
        this.tachiyomiSourceId = new Long(1955215088, 238564633, false); // 1024627298672457456
        this.aidokuSourceId = 'en.manganato';
        this.lang = 'en';
    }
    parseMangaUrl(url) {
        return url.replace('https://readmanganato.com', 'https://manganato.com');
    }
}
export default [new MangaNatoConverter(), new MangaBatConverter()];
