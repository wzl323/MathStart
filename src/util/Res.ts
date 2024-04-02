

export const loadImg = (path: string): string => {
	return new URL(`../static/image/${path}`, import.meta.url).href;
}