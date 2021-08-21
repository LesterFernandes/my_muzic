import { Box, HStack, Image } from "@chakra-ui/react";
import React from "react";
import { IAlbum } from "../shared/interfaces";

interface FeaturedProps {
  albums: IAlbum[];
}

export const Featured: React.FC<FeaturedProps> = ({ albums }) => {
  albums = albums.slice(0, 5);
  return (
    <HStack spacing="24px">
      {albums.map((album, index) => (
        <Box key={index}>
          <Image src={album.image} />
        </Box>
      ))}
    </HStack>
  );
};
