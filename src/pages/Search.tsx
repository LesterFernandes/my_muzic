import React, { useState, useEffect, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import LazyLoad from "react-lazyload";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { filteredAlbumsState, albumsState } from "../atoms";
import {
  Input,
  Image,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Icon,
  Box,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
//import { IAlbum, ICategory } from "../shared/interfaces";
import { Wrapper } from "../components/Wrapper";
import _ from "lodash";
import debounce from "lodash.debounce";
//import { LOCALSTORAGE_LIKEDALBUMS } from "../constants";
import moment from "moment";

interface SearchProps extends RouteComponentProps {
  categoryId: string;
}

export const Search: React.FC<SearchProps> = ({ location }) => {
  const filteredAlbums = useRecoilValue(filteredAlbumsState);
  const [albums, setAlbums] = useRecoilState(albumsState);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  /* const debouncedChangeHandler = useMemo(() => {
    return debounce(changeHandler, 300);
  }, []); */

  const onLikeUnlike = (id: string, like: boolean) => {
    const copyAlbums = _.cloneDeep(albums);
    copyAlbums.forEach((album) => {
      if (id === album.id) {
        album.liked = like;
      }
    });
    setAlbums(copyAlbums);
  };

  return (
    <Wrapper>
      <Grid templateColumns="repeat(4, 1fr)" gap={10} h="100px">
        <GridItem colSpan={2}>
          <Input name="search" value={search} onChange={changeHandler} />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            type="month"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            type="month"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </GridItem>
      </Grid>
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
              <WrapItem key={index}>
                <Box w="200px" h="230px">
                  <LazyLoad height={230} offset={10}>
                    <Image src={album.image} />
                  </LazyLoad>
                  {album.liked ? (
                    <Icon
                      as={BsHeartFill}
                      onClick={() => onLikeUnlike(album.id, false)}
                      color="teal"
                    />
                  ) : (
                    <Icon
                      as={BsHeart}
                      onClick={() => onLikeUnlike(album.id, true)}
                    />
                  )}
                </Box>
              </WrapItem>
            );
          })}
      </Wrap>
    </Wrapper>
  );
};

//<LazyLoad height={200} offset={10}></LazyLoad>