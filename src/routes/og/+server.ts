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
					alignItems: 'center',
					justifyContent: 'center'
				},
				children: {
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '0px',
							width: '100%',
							padding: '0 80px'
						},
						children: [
							// ゴールドアクセントバー（上）
							{
								type: 'div',
								props: {
									style: {
										width: '64px',
										height: '4px',
										background: '#fbbf24',
										borderRadius: '2px',
										marginBottom: '48px'
									}
								}
							},
							// メインタイトル
							{
								type: 'div',
								props: {
									style: {
										fontSize: '100px',
										fontWeight: '700',
										color: '#f8fafc',
										letterSpacing: '-4px',
										lineHeight: '1'
									},
									children: 'yugioh-grid'
								}
							},
							// サブタイトル
							{
								type: 'div',
								props: {
									style: {
										fontSize: '30px',
										color: '#64748b',
										marginTop: '24px',
										letterSpacing: '0.12em'
									},
									children: 'Search · Filter · Sort'
								}
							},
							// ゴールドアクセントバー（下）
							{
								type: 'div',
								props: {
									style: {
										width: '64px',
										height: '4px',
										background: '#fbbf24',
										borderRadius: '2px',
										marginTop: '48px'
									}
								}
							}
						]
					}
				}
			}
		} as never,
		{ width: 1200, height: 630 }
	);
};
