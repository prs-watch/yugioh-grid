import { ImageResponse } from '@vercel/og';

export const GET = async () => {
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
					},
					{
						type: 'div',
						props: {
							style: {
								fontSize: '34px',
								color: '#94a3b8',
								marginTop: '28px',
								textAlign: 'center'
							},
							children: 'Search / Filter / Sort'
						}
					}
				]
			}
		} as never,
		{ width: 1200, height: 630 }
	);
};
