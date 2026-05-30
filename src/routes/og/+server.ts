import { ImageResponse } from '@vercel/og';

/** Edge ランタイムでは @vercel/og の vc-blob-asset バンドルエラーが発生するため Node.js を指定。 */
export const config = { runtime: 'nodejs24.x' };

/** SNS リンクプレビュー用の OGP 画像 (1200×630) を返す。 */
export const GET = () => {
	return new ImageResponse(
		{
			type: 'div',
			props: {
				style: {
					width: '1200px',
					height: '630px',
					background: '#0f172a',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '0px',
					padding: '80px'
				},
				children: [
					{
						type: 'div',
						props: {
							style: {
								fontSize: '84px',
								fontWeight: '700',
								color: '#f8fafc',
								letterSpacing: '-3px',
								lineHeight: '1.1',
								textAlign: 'center'
							},
							children: 'yugioh-grid'
						}
					}
				]
			}
		} as never,
		{ width: 1200, height: 630 }
	);
};
