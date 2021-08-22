import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
//import LazyLoad from "react-lazyload";
import DatePicker from "react-datepicker";
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
import { IAlbum, ICategory } from "../shared/interfaces";
import { Wrapper } from "../components/Wrapper";
import _ from "lodash";
import { LOCALSTORAGE_LIKEDALBUMS } from "../constants";

interface SearchProps extends RouteComponentProps {
  categoryId: string;
}

export const Search: React.FC<SearchProps> = ({ location }) => {
  const filteredAlbums = useRecoilValue(filteredAlbumsState);
  const [albums, setAlbums] = useRecoilState(albumsState);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [search, setSearch] = useState<string>("");

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    seconds = 800
  ) => {
    setSearch(e.target.value);
  };

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
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM, yyyy"
            showMonthYearPicker
          />
        </GridItem>
        <GridItem colSpan={1}>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM, yyyy"
            showMonthYearPicker
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
          .map((album, index) => (
            <WrapItem key={index}>
              <Box>
                <Image src={album.image} />
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
          ))}
      </Wrap>
    </Wrapper>
  );
};

//<LazyLoad height={200} offset={10}></LazyLoad>
