import {
  Box, Center, Grid,
  GridItem, Heading, Icon, Image, Input, Text, Tooltip, Wrap,
  WrapItem
} from "@chakra-ui/react";
import _ from "lodash";
//import { LOCALSTORAGE_LIKEDALBUMS } from "../constants";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsHeart, BsHeartFill, BsPlay } from "react-icons/bs";
import LazyLoad from "react-lazyload";
import { RouteComponentProps } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { albumsState, filteredAlbumsState, selAlbum, selCategory } from "../atoms";
import { Wrapper } from "../components/Wrapper";
import { IAlbum } from "../shared/interfaces";

interface SearchProps extends RouteComponentProps {
  categoryId: string;
}

export const Search: React.FC<SearchProps> = ({ history }) => {
  const filteredAlbums = useRecoilValue(filteredAlbumsState);
  const selectedCategory = useRecoilValue(selCategory);
  const savedSelectedAlbum = useSetRecoilState(selAlbum);
  const [albums, setAlbums] = useRecoilState(albumsState);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    return function cleanup() {
      //SAVE TO LOCAL-STORAGE
      /*let likedAlbums: string[] | null = albums
        .filter(album => album.liked)
        .map(album => album.id);
      likedAlbums = (!likedAlbums.length) ? null : likedAlbums;
      localStorage.setItem(LOCALSTORAGE_LIKEDALBUMS, JSON.stringify(likedAlbums)); */
    };
  }, []);

  useEffect(() => {
    /* if (endDate && startDate) {
       let start = moment(startDate);
       let end = moment(endDate);
       if (end.diff(start)) {
         console.log(end.format());
         console.log(albums[0].releaseDate);
       }
     } */
  }, [endDate, startDate]);

  const changeHandler = (e: any) => {
    setSearch(e.target.value);
  };

  const onLikeUnlike = (id: string, like: boolean) => {
    const copyAlbums = _.cloneDeep(albums);
    copyAlbums.forEach((album) => {
      if (id === album.id) {
        album.liked = like;
      }
    });
    setAlbums(copyAlbums);
  };

  const albumClickHandler = useCallback(
    (e: React.MouseEvent, album: IAlbum) => {
      e.stopPropagation();
      savedSelectedAlbum(album);
      history.push(`/album`);
    },
    []
  );

  return (
    <Wrapper>
      <Box mb={{ md: 17 }} p={4} color="teal.600">
        <Heading as="h1" size="4xl">
          {selectedCategory.category === "All"
            ? selectedCategory.category + " Genres"
            : selectedCategory.category}
        </Heading>
      </Box>
      <Box p={4} display={{ md: "flex" }}>
        <Box flexShrink={0}>
          <Input
            name="search"
            value={search}
            focusBorderColor="teal.500"
            size="sm"
            maxW={400}
            onChange={changeHandler}
          />
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} h="40px">
            <GridItem colSpan={1}>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="from"
                className="chakra-input css-oonh01"
                isClearable
                clearButtonClassName="clearDate"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="to"
                className="chakra-input css-oonh01"
                isClearable
                clearButtonClassName="clearDate"
              />
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <Wrap spacing="10px" justify="center" className="list">
        {filteredAlbums
          .filter((album) => {
            if (search.length) {
              return album.name.toLowerCase().includes(search.toLowerCase());
            }
            return true;
          })
          .filter((album) => {
            if (startDate && endDate) {
              return moment(album.releaseDate).isBetween(
                moment(startDate).format(),
                moment(endDate).endOf("month").format()
              );
            }
            return true;
          })
          .map((album, index) => {
            return (
              <WrapItem key={index} onClick={(e) => albumClickHandler(e, album)}>
                <Box
                  className="albSearch"
                  boxShadow="md"
                  p="2"
                  bg="white"
                  w="170px"
                  h="210px"
                  pos="relative"
                >
                  <LazyLoad height={210} offset={10}>
                    <Image src={album.image} />
                  </LazyLoad>
                  <Grid templateColumns="repeat(5, 1fr)" gap={1}>
                    <GridItem colSpan={4}>
                      <Center h={10}>
                        <Tooltip label={album.name} aria-label="Album details">
                          <Text fontSize="xs" isTruncated>
                            {album.name}
                          </Text>
                        </Tooltip>
                      </Center>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Center h={10}>
                        {album.liked ? (
                          <Icon
                            as={BsHeartFill}
                            onClick={() => onLikeUnlike(album.id, false)}
                            color="teal"
                            size="lg"
                            cursor="pointer"
                          />
                        ) : (
                          <Icon
                            as={BsHeart}
                            onClick={() => onLikeUnlike(album.id, true)}
                            size="lg"
                            cursor="pointer"
                          />
                        )}
                      </Center>
                    </GridItem>
                  </Grid>
                  <div className="overlay overlayFade">
                    <Center h="inherit">
                      <Icon
                        boxSize={10}
                        as={BsPlay}
                        color="whiteAlpha.900"
                      />
                    </Center>
                  </div>
                </Box>
              </WrapItem>
            );
          })}
      </Wrap>
    </Wrapper>
  );
};
