import { IAlbum } from "../shared/interfaces";
import { LOCALSTORAGE_LIKEDALBUMS } from "../constants";

/* const likedAlbums: any = JSON.parse(
  localStorage.getItem(LOCALSTORAGE_LIKEDALBUMS) || "null"
); */

export default ({ feed }: any): IAlbum[] => {
  const { entry }: { entry: any[] } = feed;

  let albums = entry.map((data) => {
    return {
      id: data.id.attributes["im:id"],
      name: data.title.label,
      image: data["im:image"][2].label,
      artist: data["im:artist"].label,
      releaseDate: data["im:releaseDate"].label,
      category: data["category"].attributes.label,
      categoryId: data["category"].attributes["im:id"],
      liked: false,
      thumbnailUrl: data["im:image"][0].label
    };
  });
  return albums;
};

//RETRIEVE FROM LOCAL-STORAGE
/*const isLiked = (albumId: string): boolean => {
  if (likedAlbums instanceof Array && likedAlbums.length) {
    return likedAlbums.includes(albumId);
  }
  return false;
};
 */