import { atom, selector } from "recoil";
import { IAlbum, ICategory } from "./shared/interfaces";

export const albumsState = atom({
  key: "albumsState",
  default: [] as IAlbum[],
});

export const categoriesState = selector({
  key: "categoriesState",
  get: ({ get }) => {
    const albums: IAlbum[] = get(albumsState);
    return albums.reduce((uniqueCatArray: ICategory[], album: IAlbum) => {
      if (
        !uniqueCatArray.some(
          (cat) =>
            cat.categoryId === album.categoryId &&
            cat.category === album.category
        )
      ) {
        uniqueCatArray.push({
            categoryId: album.categoryId,
            category: album.category
        });
      }
      return uniqueCatArray;
    }, []);
  },
});
