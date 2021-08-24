import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsClock, BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { FaItunesNote } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { selAlbum } from "../atoms";
import { Wrapper } from "../components/Wrapper";
import useMockApi from "../custom-hooks/mockApi";
import { ISong } from "../shared/interfaces";

interface AlbumDetailsProps {}

type TSong = ISong & {
  showPlay?: boolean;
  playing?: boolean;
};

export const AlbumDetails: React.FC<AlbumDetailsProps> = ({}) => {
  let songs: TSong[] | null = useMockApi<ISong[]>("songz");
  if (songs && songs.length) {
    songs.forEach((song) => {
      song.playing = false;
      song.showPlay = false;
    });
  }

  const [songz, setSongz] = useState<TSong[] | null>(null);
  useEffect(() => {
    setSongz(songs);
  }, [songs, setSongz]);

  const selectedAlbum = useRecoilValue(selAlbum);
  const releaseYear = moment(selectedAlbum.releaseDate).format("YYYY");

  const clickHandler = (index: number) => {
    if (songz && songz.length) {
      const copySongz = _.cloneDeep(songz);
      copySongz.forEach((song, idx) => {
        song.playing = index === idx ? !copySongz[index].playing : false;
      });
      setSongz(copySongz);
    }
  };

  const makeTableCell = (song: TSong, index: number) => {
    const pauseButton = (
      <IconButton
        variant="ghost"
        colorScheme="teal"
        aria-label="Pause the song"
        fontSize="20px"
        isRound
        size="sm"
        icon={<BsFillPauseFill />}
      />
    );
    const playButton = (
      <IconButton
        className="play"
        variant="ghost"
        colorScheme="teal"
        aria-label="Like the song"
        fontSize="20px"
        isRound
        size="sm"
        visibility="hidden"
        icon={<BsPlayFill />}
      />
    );

    return song.playing ? pauseButton : playButton;
  };

  return (
    <Wrapper variant="small">
      <Box p={4} display={{ md: "flex" }}>
        <Box flexShrink={0}>
          <Image width={{ md: 40 }} src={selectedAlbum.image} />
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
          >
            {selectedAlbum.name}
          </Text>
          <Text mt={4} color="gray.500">
            <Avatar
              size="xs"
              name={selectedAlbum.artist}
              src={selectedAlbum.thumbnailUrl}
            />{" "}
            &bull; {selectedAlbum.artist} &bull; {releaseYear}
          </Text>
        </Box>
      </Box>
      <Box p={4}>
        <Table variant="simple" colorScheme="teal" p={4}>
          <TableCaption>
            <HStack justify="center">
              <FaItunesNote />
              <Text fontSize="md">Awesome muzic player</Text>
            </HStack>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>PLAYS</Th>
              <Th isNumeric>
                <Icon as={BsClock} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songz?.map((song, index) => (
              <Tr
                className="trackz"
                key={index}
                onClick={() => clickHandler(index)}
              >
                <Td w={1}>{makeTableCell(song, index)}</Td>
                <Td>
                  <Text casing="uppercase" fontSize="sm">
                    {song.trackName}
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="sm">{song.plays}</Text>
                </Td>
                <Td isNumeric>
                  <Text fontSize="sm">{song.duration}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Wrapper>
  );
};
