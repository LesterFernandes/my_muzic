import React, { useCallback, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Box, HStack, Image, Center, Wrap, WrapItem } from "@chakra-ui/react";
import { IAlbum, ICategory } from "../shared/interfaces";
import { Wrapper } from "../components/Wrapper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { albumsState, categoriesState, selCategory, likedAndFeaturedAlbums } from "../atoms";

interface LandingProps extends RouteComponentProps {}

export const Landing: React.FC<LandingProps> = ({ history }) => {
  //const albums = useRecoilValue(albumsState);
  const categories = useRecoilValue(categoriesState);
  const saveSelectedCategory = useSetRecoilState(selCategory);
  const featAlbums = useRecoilValue(likedAndFeaturedAlbums);

  const clickHandler = useCallback(
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
          <WrapItem key={index}>
            <Image src={album.image} />
          </WrapItem>
        ))}
      </Wrap>
      <Wrap spacing="10px" justify="center">
        {categories.map((category, index) => (
          <WrapItem key={index} onClick={(e) => clickHandler(e, category)}>
            <Center w="180px" h="80px" bg="red.200">
              {category.category}
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Wrapper>
  );
};

