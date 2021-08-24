import {
  Box, Center, Heading, Icon, Image, Wrap,
  WrapItem
} from "@chakra-ui/react";
import _ from "lodash";
import React, { useCallback } from "react";
import { BsHeartFill, BsPlayFill } from "react-icons/bs";
import { RouteComponentProps } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoriesState, likedAndFeaturedAlbums,
  selAlbum, selCategory
} from "../atoms";
import { Wrapper } from "../components/Wrapper";
import { IAlbum, ICategory } from "../shared/interfaces";

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

  const randomBG = () => {
    const colors = ["tomato", "#cc4242", "#0e0ebc", "#ac43ce", "#409cc2"];
    return colors[_.random(0, 4)];
  };

  return (
    <Wrapper>
      <Wrap spacing="10px" justify="center" mb="20px">
        {featAlbums.map((album, index) => (
          <WrapItem key={index} onClick={(e) => albumClickHandler(e, album)}>
            <Box className="featured" w="170px" h="auto" pos="relative">
              <Image w="170px" h="170px" src={album.image} />
              <div className="overlay overlayFade">
                <Center h="inherit">
                  <Icon
                    boxSize={8}
                    as={BsPlayFill}
                    color="whiteAlpha.900"
                  />
                  {album.liked ? (
                    <Icon
                      boxSize={6}
                      as={BsHeartFill}
                      color="whiteAlpha.900"
                    />
                  ) : (
                    <></>
                  )}
                </Center>
              </div>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
      <Center h="60px">
        <Heading as="h3" color="gray.600" size="lg">
          Browse Genres
        </Heading>
      </Center>
      <Wrap spacing="25px" justify="center">
        {categories.map((category, index) => (
          <WrapItem
            key={index}
            cursor="pointer"
            onClick={(e) => categoryClickHandler(e, category)}
          >
            <Center rounded="lg" w="150px" h="150px" bg={randomBG()}>
              <Heading
                as="h4"
                size="md"
                color="whiteAlpha.900"
                wordBreak="break-word"
              >
                {category.category}
              </Heading>
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Wrapper>
  );
};
