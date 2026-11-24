import generated from '@/data/media.generated.json';
import type {GalleryAlbum} from '@/lib/gallery-types';
export type MediaManifest={hero:(string|null)[];candidate:string|null;albums:GalleryAlbum[]};
export const media=generated as unknown as MediaManifest;
