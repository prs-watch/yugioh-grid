import { DuckDBInstance } from '@duckdb/node-api';

const DATASET_URL =
	'https://github.com/prs-watch/yugioh-ja-dataset/releases/download/latest/dataset.parquet';

export const load = async () => {
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
		FROM read_parquet('${DATASET_URL}')
		WHERE name_ja IS NOT NULL AND name_ja <> ''
	`);

	const cards = await result.getRowObjectsJson();
	return { cards };
};
