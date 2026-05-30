import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'nodejs' };

export const GET = async ({ url }: { url: URL }) => {
	const fontData = await fetch(`${url.origin}/Geist-Regular.ttf`).then((r) => r.arrayBuffer());

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
					padding: '80px',
					fontFamily: 'Geist'
				},
				children: [
					{
						type: 'div',
						props: {
							style: {
								fontSize: '84px',
								fontWeight: '400',
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
		{
			width: 1200,
			height: 630,
			fonts: [{ name: 'Geist', data: fontData, style: 'normal' }]
		}
	);
};
