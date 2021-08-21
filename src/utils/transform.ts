import { IAlbum } from "../shared/interfaces";

export default ({ feed }: any): IAlbum[]=> {
  const { entry }: { entry: any[] } = feed;

  let albums = entry.map((data) => {
    return {
      id: data.id.attributes["im:id"],
      name: data.title.label,
      image: data["im:image"][2].label,
      artist: data["im:artist"].label  ,
      releaseDate: data["im:releaseDate"].label,
      category: data["category"].attributes.label,
      categoryId: data["category"].attributes["im:id"]
    };
  });
  return albums;
};
