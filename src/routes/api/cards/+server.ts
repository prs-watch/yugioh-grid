import { DuckDBInstance } from '@duckdb/node-api';
import type { Json } from '@duckdb/node-api/lib/Json';
import { json } from '@sveltejs/kit';
import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/** 遊戯王日本語データセットの最新リリース (Parquet 形式)。 */
const DATASET_URL =
	'https://github.com/prs-watch/yugioh-ja-dataset/releases/download/latest/dataset.parquet';

/** コールドスタート単位でキャッシュ — 並行リクエストが同一 Promise を共有し二重取得を防ぐ。 */
let CARD_PROMISE: Promise<Record<string, Json>[]> | undefined;

/** Parquet データセットを取得し、インメモリ DuckDB インスタンスでクエリする。 */
const load = async () => {
	const response = await fetch(DATASET_URL);

	if (!response.ok) {
		throw new Error(`Failed to fetch dataset: ${response.status}`);
	}

	const buffer = Buffer.from(await response.arrayBuffer());

	const parquetPath = join(tmpdir(), 'dataset.parquet');

	await writeFile(parquetPath, buffer);

	try {
		const instance = await DuckDBInstance.create(':memory:');
		const conn = await instance.connect();

		const result = await conn.run(`
      SELECT
        id,
        name_en,
        text_en,
        name_ja,
        ruby,
        text_ja,
        type,
        frame_type,
        atk,
        def,
        level,
        race,
        attribute,
        scale,
        linkval,
        linkmarkers
      FROM read_parquet('${parquetPath}')
      WHERE name_ja IS NOT NULL
        AND name_ja <> ''
      ORDER BY name_ja;
    `);

		return await result.getRowObjectsJson();
	} finally {
		await unlink(parquetPath).catch(() => {});
	}
};

/** 全カードデータを JSON で返す。初回リクエスト時にロード Promise を初期化する。 */
export const GET = async () => {
	CARD_PROMISE ??= load();
	return json(await CARD_PROMISE);
};
