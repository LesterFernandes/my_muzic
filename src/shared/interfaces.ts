
export interface IAlbum {
  id: string;
  name: string;
  image: string;
  artist: string;
  releaseDate: string;
  category: string;
  categoryId: string;
  liked?: boolean;
  thumbnailUrl?: string;
}

export interface ICategory {
  category: string;
  categoryId: string;
}

export interface ITopAlbums {
  albums: IAlbum[];
  categories: ICategory[];
}

export interface ISong {
  trackId: number;
  trackName: string;
  duration: string;
  plays: string;
}