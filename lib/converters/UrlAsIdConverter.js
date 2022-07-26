import Long from 'long';
import { Converter } from './AbstractConverter.js';
/**
 * Generic converter class for sources that use the full URL as the manga/chapter ID.
 */
class UrlAsIdConverter extends Converter {
    constructor(baseUrl, lang, tachiyomiSourceId, aidokuSourceId) {
        super();
        this.baseUrl = baseUrl;
        this.lang = lang;
        this.tachiyomiSourceId = tachiyomiSourceId;
        this.aidokuSourceId = aidokuSourceId;
    }
    parseMangaId(url) {
        return this.parseMangaUrl(url);
    }
    parseChapterId(url) {
        return this.parseMangaUrl(url);
    }
    parseMangaUrl(url) {
        return `${this.baseUrl}${url}`;
    }
}
/**
 * Generic converter class for sources that use the URL without domain
 * as the manga/chapter ID (matching Tachiyomi's URL convention).
 */
class TachiUrlAsIdConverter extends Converter {
    constructor(baseUrl, lang, tachiyomiSourceId, aidokuSourceId) {
        super();
        this.baseUrl = baseUrl;
        this.lang = lang;
        this.tachiyomiSourceId = tachiyomiSourceId;
        this.aidokuSourceId = aidokuSourceId;
    }
    parseMangaId(url) {
        return url;
    }
    parseChapterId(url) {
        return url;
    }
}
export default [
    ...[
        new UrlAsIdConverter('https://readkomik.com', 'en', new Long(1063589984, 1139696252, false), // 4894958130777364576
        'en.readkomik'),
        new UrlAsIdConverter('https://alpha-scans.org', 'en', new Long(118446685, 964607593, false), // 4142958065526725213
        'en.alphascans'),
        new UrlAsIdConverter('https://kumascans.com', 'en', new Long(-1155852457, 1152485760, false), // 4949888651444819799
        'en.kumascans'),
        new UrlAsIdConverter('https://www.asurascans.com', 'en', new Long(-1983361610, 1454684959, false), // 6247824327199706550
        'multi.asurascans'),
        new UrlAsIdConverter('https://www.asurascans.com', 'tr', new Long(-755736659, 1854047801, false), // 7963074674054946733
        'multi.asurascans'),
        new UrlAsIdConverter('https://xoxocomics.com', 'en', new Long(1145708452, 555523696, false), // 2385956107618754468
        'en.xoxocomics'),
        new UrlAsIdConverter('https://www.nettruyenco.com', 'vi', new Long(2007330622, 1210478809, false), // 5198966899163361086
        'vi.nettruyen'),
        new UrlAsIdConverter('http://truyenqqpro.com', 'vi', new Long(-1599601267, 594540574, false), // 2553532324170433933
        'vi.truyenqq'),
        new UrlAsIdConverter('https://lectortmo.com', 'es', new Long(-1700479790, 965395994, false), // 4146344224513899730
        'es.tumangaonline'),
    ],
    ...[
        new TachiUrlAsIdConverter('https://www.mangapill.com', 'en', new Long(620004752, 1967025485, false), // 8448310129093543312
        'en.mangapill'),
        new TachiUrlAsIdConverter('https://readm.org', 'en', new Long(1264219849, 377873469, false), // 1622954192645289673
        'en.readm'),
        new TachiUrlAsIdConverter('https://onepiecechapters.com', 'en', new Long(455392941, 334139158, false), // 1435116756378369709
        'en.tcbscans'),
        new TachiUrlAsIdConverter('https://truyentranhlh.net', 'vi', new Long(-3131784, 1855568585, false), // 7969606392351831672
        'vi.truyentranhlh'),
        new TachiUrlAsIdConverter('https://blogtruyen.vn', 'vi', new Long(630869959, 1706408032, false), // 7328966691702591431
        'vi.blogtruyen'),
        new TachiUrlAsIdConverter('https://phemanga.net', 'vi', new Long(-1536888756, 196006640, false), // 841842111356923980
        'vi.phemanga'),
        new TachiUrlAsIdConverter('https://lkdtt.com', 'vi', new Long(1904843089, 1572956593, false), // 6755797126867425617
        'vi.lkdtt'),
        new TachiUrlAsIdConverter('https://manga-chan.me', 'ru', new Long(7, 0, false), // 7
        'ru.manga-chan'),
        new TachiUrlAsIdConverter('https://y.hentaichan.live', 'ru', new Long(274560140, 1281636907, false), // 5504588601186153612
        'ru.hentai-chan'),
        new TachiUrlAsIdConverter('https://yaoi-chan.me', 'ru', new Long(-1784495821, 574279755, false), // 2466512768990363955
        'ru.yaoi-chan'),
    ],
];
