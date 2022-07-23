import converters from './converters/index';
import { Backup } from './types/tachiyomi';
import { AidokuBackup } from './types/aidoku';

interface AidokuResult {
	backup: AidokuBackup;
	dateString: string;
}

const TACHIYOMI_TRACKERS: { [key: number]: string } = {
	1: 'myanimelist',
	2: 'anilist',
	// 3: "kitsu",
	// 4: "shikimori",
	// 5: "bangumi",
	// 6: "komga",
	// 7: "mangaupdates"
};

export function toAidoku(backup: Uint8Array): AidokuResult {
	const dateString = new Date(Date.now()).toISOString().split('T')[0];

	const decoded: Backup = Backup.decode(backup);
	const categoriesMap = Object.fromEntries(
		decoded.backupCategories.map((c) => [c.order.toString(), c.name])
	);

	const aidokuBackup: AidokuBackup = {
		library: [],
		history: [],
		sources: [],
		manga: [],
		chapters: [],
		trackItems: [], // TODO
		categories: decoded.backupCategories.map((c) => c.name),
		date: Math.floor(Date.now() / 1000),
		name: `Converted Tachiyomi Backup ${dateString}`,
		version: '0.0.1',
	};

	const convertersNotFound: Set<string> = new Set<string>();
	const sources: Set<string> = new Set<string>();

	decoded.backupManga.forEach((manga) => {
		const converter = converters.find((c) => c.tachiyomiSourceId === manga.source.toString());
		if (!converter) {
			convertersNotFound.add(manga.source.toString());
			return;
		}
		sources.add(converter.aidokuSourceId);

		const aidokuManga = converter.parseMangaObject(manga);

		aidokuBackup.manga.push(aidokuManga);

		aidokuBackup.library.push({
			mangaId: aidokuManga.id,
			lastUpdated: 0,
			categories: manga.categories
				.map((c) => categoriesMap[c.toString()])
				.filter((c) => c !== undefined),
			dateAdded: Math.floor(manga.dateAdded.divide(1000).toNumber()),
			sourceId: converter.aidokuSourceId,
			lastOpened: 0,
		});

		manga.chapters.forEach((chapter) => {
			const aidokuChapter = converter.parseChapterObject(manga, chapter);

			aidokuBackup.chapters.push(aidokuChapter);

			aidokuBackup.history.push({
				progress: chapter.lastPageRead,
				mangaId: aidokuManga.id,
				chapterId: aidokuChapter.id,
				completed: chapter.read,
				sourceId: converter.aidokuSourceId,
				dateRead: Math.floor(
					[...manga.history, ...manga.brokenHistory]
						.find((h) => h.url === chapter.url)
						?.lastRead?.divide(1000)
						.toNumber() ?? 0
				),
			});
		});

		aidokuBackup.trackItems.push(
			...manga.tracking
				.filter((t) => t.syncId <= 2) // Only support MAL and AniList tracking
				.map((t) => ({
					// https://anilist.co/manga/31706/JoJo-no-Kimyou-na-Bouken-Steel-Ball-Run/
					// https://myanimelist.net/manga/1706/JoJo_no_Kimyou_na_Bouken_Part_7__Steel_Ball_Run
					//
					// HACK: For now, there's only tracking support for MAL and AniList, which has similar
					// URL structures. I'm not going to bother writing another converter class.
					id: t.trackingUrl.split('/')[4],
					trackerId: TACHIYOMI_TRACKERS[t.syncId],
					mangaId: aidokuManga.id,
					sourceId: converter.aidokuSourceId,
					title: aidokuManga.title,
				}))
		);
	});

	if (convertersNotFound.size > 0) {
		console.log(
			`Could not find converters for ${
				convertersNotFound.size
			} sources. Your library may not be complete.\n- ${[...convertersNotFound].join('\n- ')}`
		);
	}

	aidokuBackup.sources = [...sources];
	return {
		backup: aidokuBackup,
		dateString: dateString,
	};
}
