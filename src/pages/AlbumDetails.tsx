import React from "react";
import { selAlbum } from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import useMockApi from "../custom-hooks/mockApi";
import { ISong } from "../shared/interfaces";
import { Wrapper } from "../components/Wrapper";
import {
  Box,
  Image,
  Icon,
  Badge,
  Table,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
  TableCaption,
} from "@chakra-ui/react";

interface AlbumDetailsProps {}

export const AlbumDetails: React.FC<AlbumDetailsProps> = ({}) => {
  const selectedAlbum = useRecoilValue(selAlbum);
  let songz = useMockApi<ISong[]>("songz");
  return (
    <Wrapper>
      <Image src={selectedAlbum.image} />
      <Box mt="1" fontWeight="semibold" as="h3" lineHeight="tight" isTruncated>
        {selectedAlbum.name}
      </Box>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>I'm Tha Real G</TableCaption>
        <Thead>
          <Tr>
            <Th>#  TITLE</Th>
            <Th>ALBUM</Th>
            <Th isNumeric>::</Th>
          </Tr>
        </Thead>
        <Tbody>
          {songz?.map((song, index) => (
            <Tr key={index}>
              <Td>{song.trackName}</Td>
              <Td>{song.plays}</Td>
              <Td isNumeric>{song.duration}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Wrapper>
  );
};
