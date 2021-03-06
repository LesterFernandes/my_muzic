import { atom, selector } from "recoil";
import { IAlbum, ICategory } from "./shared/interfaces";
import _ from "lodash";

//-----------ATOMS----------

export const albumsState = atom({
  key: "albumsState",
  default: [] as IAlbum[],
});

export const selCategory = atom({
  key: "selCategory",
  default: { category: "All", categoryId: "" } as ICategory,
});

export const selAlbum = atom({
  key: "selAlbum",
  default: {} as IAlbum,
})

//-----------SELECTORS------------

export const filteredAlbumsState = selector({
  key: "filteredAlbumsState",
  get: ({ get }) => {
    const albums: IAlbum[] = get(albumsState);
    const { category, categoryId }: ICategory = get(selCategory);
    return albums.filter((album) => {
      if (!categoryId && category === "All") {
        return true;
      }
      return album.categoryId === categoryId;
    });
  },
});

export const likedAndFeaturedAlbums = selector({
  key: "likedAlbums",
  get: ({ get }) => {
    const albums: IAlbum[] = get(albumsState);
    const liked: IAlbum[] = albums.filter((album) => album.liked);
    const featured: IAlbum[] = _.shuffle(
      albums.filter((album) => !album.liked)
    );
    return [...liked, ...featured].slice(0, 5);
  },
});

export const categoriesState = selector({
  key: "categoriesState",
  get: ({ get }) => {
    const albums: IAlbum[] = get(albumsState);
    return albums.reduce(
      (uniqueCatArray: ICategory[], album: IAlbum) => {
        if (
          !uniqueCatArray.some(
            (cat) =>
              cat.categoryId === album.categoryId &&
              cat.category === album.category
          )
        ) {
          uniqueCatArray.push({
            categoryId: album.categoryId,
            category: album.category,
          });
        }
        return uniqueCatArray;
      },
      [
        {
          category: "All",
          categoryId: "",
        },
      ]
    );
  },
});
