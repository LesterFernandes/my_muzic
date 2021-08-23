import React, { useCallback, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Image, Center, Wrap, WrapItem } from "@chakra-ui/react";
import { ICategory, IAlbum } from "../shared/interfaces";
import { Wrapper } from "../components/Wrapper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoriesState,
  selCategory,
  likedAndFeaturedAlbums,
  selAlbum,
} from "../atoms";

interface LandingProps extends RouteComponentProps {}

export const Landing: React.FC<LandingProps> = ({ history }) => {
  const categories = useRecoilValue(categoriesState);
  const saveSelectedCategory = useSetRecoilState(selCategory);
  const featAlbums = useRecoilValue(likedAndFeaturedAlbums);
  const savedSelectedAlbum = useSetRecoilState(selAlbum);

  const albumClickHandler = useCallback(
    (e: React.MouseEvent, album: IAlbum) => {
      e.stopPropagation();
      savedSelectedAlbum(album);
      history.push(`/album`);
    },
    []
  );

  const categoryClickHandler = useCallback(
    (e: React.MouseEvent, category: ICategory) => {
      e.stopPropagation();
      saveSelectedCategory(category);
      history.push(`/search`);
      //history.push(`/search/${category.category}`);
    },
    []
  );

  return (
    <Wrapper>
      <Wrap spacing="10px" justify="center">
        {featAlbums.map((album, index) => (
          <WrapItem key={index} onClick={(e) => albumClickHandler(e, album)}>
            <Image src={album.image} />
          </WrapItem>
        ))}
      </Wrap>
      <Wrap spacing="10px" justify="center">
        {categories.map((category, index) => (
          <WrapItem
            key={index}
            onClick={(e) => categoryClickHandler(e, category)}
          >
            <Center w="200px" h="150px" bg="red.200">
              {category.category}
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Wrapper>
  );
};
