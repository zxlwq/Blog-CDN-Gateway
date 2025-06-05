let urls = [
	'https://blog.zxlwq.dpdns.org#Cloudflare CDN',
	'https://blogc.zxlwq.dpdns.org#Fastly CDN',
	'https://blog.lwq.hidns.vip#Gcore CDN',
	'https://blog.lwq.ip-ddns.com#Vercel CDN',
	'https://bloga.zxl.dedyn.io#备用地址'
];

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const path = url.pathname;
		const params = url.search;

		// 如果 env.URLS 存在，则添加到数组
		if (env.URL) urls = await ADD(env.URL);
		
		const ads = env.ADS || 'google.com, pub-9350003957494520, DIRECT, f08c47fec0942fa0';
		const 网站图标 = env.ICO || '/logo.png';  // 修改这里
		const 网站头像 = env.PNG || '/logo.png'; // 修改这里
		const 网络备案 = env.BEIAN || `<a href='https://icp.gov.moe/'>萌ICP备-20070707号</a>`;
		const 网页标题 = env.TITLE || 'BlogCDN 智能访问网关';
		const 站点名称 = env.NAME || '科技-刘';

		if (url.pathname.toLowerCase() == '/ads.txt') {
			return new Response(ads, {
				headers: {
					'content-type': 'text/plain;charset=UTF-8'
				}
			});
		} else if (url.pathname.toLowerCase() == '/favicon.ico') {
			return fetch(网站图标);
		} else {
			// 先测速，不加载背景图片
			let img = '/favicon.jpg'; // 默认背景图改为这里
			if (env.IMG) {
				const imgs = await ADD(env.IMG);
				img = imgs[Math.floor(Math.random() * imgs.length)];
			}

			// 生成将 urls 数组传递给前端 JavaScript 的 HTML
			const html = `
			<!DOCTYPE html>
			<html lang="zh-CN">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${站点名称} - ${网页标题}</title>
				<style>
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}
					
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
						margin: 0;
						padding: 0;
						background-image: url('${img}');
						background-size: cover;
						background-position: center;
						background-attachment: fixed;
						min-height: 100vh;
						display: flex;
						justify-content: center;
						align-items: center;
					}
			
					.container {
						background: rgba(255, 255, 255, 0.6);
						backdrop-filter: blur(10px);
						border-radius: 24px;
						padding: 30px;
						width: 480px;
						min-height: 620px;
						box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						transition: all 0.3s ease;
					}
			
					.container:hover {
						transform: translateY(-5px);
						box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
					}
			
					.logo-container {
						position: relative;
						width: 180px;
						height: 180px;
						margin-bottom: 20px;
					}
			
					.logo {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						border: 8px solid white;
						box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
						animation: pulse 2s infinite;
						object-fit: cover;
					}
			
					@keyframes pulse {
						0% {
							box-shadow: 0 0 0 0 rgba(107, 223, 143, 0.4);
						}
						70% {
							box-shadow: 0 0 0 20px rgba(107, 223, 143, 0);
						}
						100% {
							box-shadow: 0 0 0 0 rgba(107, 223, 143, 0);
						}
					}

					@keyframes blink {
						0% { opacity: 1; }
						50% { opacity: 0.6; }
						100% { opacity: 1; }
					}
			
					h1 {
						color: #1a1f36;
						font-size: 28px;
						font-weight: 700;
						text-align: center;
						margin: 0 0 30px 0;
						padding-bottom: 15px;
						position: relative;
					}
			
					h1::after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 60px;
						height: 4px;
						background: #6bdf8f;
						border-radius: 2px;
					}
			
					.description {
						width: 100%;
						padding: 0 15px;
						margin-bottom: 15px;
						font-weight: 600;  /* 加粗文字 */
					}
			
					ul {
						list-style: none;
						width: 100%;
					}
			
					ul li {
						color: #1a1f36;
						font-size: 16px;
						line-height: 1.6;
						padding: 12px 15px;
						margin-bottom: 10px;
						background: rgba(255, 255, 255, 0.5);
						border-radius: 12px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						transition: all 0.3s ease;
					}
			
					ul li:hover {
						background: rgba(255, 255, 255, 0.8);
						transform: translateX(5px);
					}

					.beian-info a {
						color: var(--primary-color);
						text-decoration: none;
						border-bottom: 1px dashed var(--primary-color);
						padding-bottom: 2px;
					}

					.beian-info a:hover {
						border-bottom-style: solid;
					}
			
					#visitCount, #liveuser {
						font-weight: 600;
						color: #2d3748;
						margin: 0 4px;
					}

					.github-corner {
						position: fixed;
						top: 0;
						right: 0;
						z-index: 1000;
					}

					.github-corner svg {
						position: absolute;
						top: 0;
						right: 0;
						border: 0;
						fill: #6bdf8f;
						color: #ffffff;
						width: 80px;
						height: 80px;
						transition: fill 0.3s ease;
					}
					
					.github-corner:hover svg {
						fill: #5bc77d;
					}
					
					.github-corner .octo-arm {
						transform-origin: 130px 106px;
					}
					
					@keyframes octocat-wave {
						0%, 100% { transform: rotate(0) }
						20%, 60% { transform: rotate(-25deg) }
						40%, 80% { transform: rotate(10deg) }
					}
					
					.github-corner:hover .octo-arm {
						animation: octocat-wave 560ms ease-in-out;
					}
					
					@media (max-width: 500px) {
						.github-corner {
							width: 60px;
							height: 60px;
						}
						.github-corner:hover .octo-arm {
							animation: none;
						}
						.github-corner .octo-arm {
							animation: octocat-wave 560ms ease-in-out;
						}
					}
				</style>
			</head>
			<body>
				<a href="https://github.com/cmliu/Blog-CDN-Gateway" target="_blank" class="github-corner" aria-label="View source on Github">
					<svg viewBox="0 0 250 250" aria-hidden="true">
						<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
						<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" class="octo-arm"></path>
					</svg>
				</a>
				<div class="container">
					<div class="logo-container">
						<img src="${网站头像}" alt="Logo" class="logo" />
					</div>
					<h1>${站点名称}</h1>
					<div class="description">智能多线路访问代理，提升访问速度和稳定性</div>
					<ul id="url-list">
						${urls
							.map((url) => {
								const [link, name] = url.split('#');
								return `<li><a href="${link}" target="_blank" rel="nofollow noreferrer noopener">${name || link}</a></li>`;
							})
							.join('')}
					</ul>
					<div class="beian-info">${网络备案}</div>
				</div>
			</body>
			</html>
			`;

			return new Response(html, {
				headers: {
					'content-type': 'text/html;charset=UTF-8',
				}
			});
		}
	},
};

async function ADD(envUrl) {
	let urlList = [];
	try {
		if (envUrl) {
			const urls = envUrl.split('\n').filter((line) => line.trim() !== '');
			urlList = urls;
		}
	} catch (e) {
		// ignore
	}
	return urlList;
}
