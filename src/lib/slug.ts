import type { CollectionEntry } from 'astro:content';

/**
 * post.id は `034_タイトル/タイトル` のように、
 * 連番付きフォルダ名とファイル名(スラッグ化済み)が重複した形になっている。
 * URLをシンプルにするため、フォルダ名側の連番プレフィックスだけ取り除いて1セグメントにする。
 */
export function getSlug(post: CollectionEntry<'tech'>): string {
	return post.id.split('/')[0].replace(/^\d+_/, '');
}
