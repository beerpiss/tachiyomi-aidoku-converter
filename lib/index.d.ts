import { AidokuBackup } from './types/aidoku.js';
interface AidokuResult {
    backup: AidokuBackup | Uint8Array;
    dateString: string;
    missingSources: string[];
    ids?: Record<string, string>;
}
/**
 * Converts a Tachiyomi backup to an Aidoku backup.
 *
 * ### Notes
 * The returned backup uses `Date` for storing dates, but Aidoku expects
 * that JSON backups store the number of seconds since Unix epoch. Thus,
 * when serializing the backup to JSON, you need to use a custom replacer:
 *
 *     JSON.stringify(backup, (_, v) => {
 *         const date = Date.parse(v);
 *         return isNaN(date) ? v : Math.floor(date / 1000);
 *     });
 *
 * @param backup Decompressed Tachiyomi backup.
 * @returns an Aidoku backup.
 */
export declare function toAidoku(backup: Uint8Array): AidokuResult;
export declare function toTachiyomi(backup: AidokuBackup): Promise<AidokuResult>;
export {};
