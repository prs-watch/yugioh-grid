import { DuckDBInstance } from '@duckdb/node-api';
import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const DATASET_URL =
	'https://github.com/prs-watch/yugioh-ja-dataset/releases/download/latest/dataset.parquet';

export const load = async () => {
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
		`);

		const cards = await result.getRowObjectsJson();

		return { cards };
	} finally {
		await unlink(parquetPath).catch(() => {});
	}
};
