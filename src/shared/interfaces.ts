
export interface IAlbum {
  id: string;
  name: string;
  image: string;
  artist: string;
  releaseDate: string;
  category: string;
  categoryId: string;
  liked?: boolean;
}

export interface ICategory {
  category: string;
  categoryId: string;
}

export interface ITopAlbums {
  albums: IAlbum[];
  categories: ICategory[];
}