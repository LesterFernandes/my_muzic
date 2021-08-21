import React from "react";
import { Categories } from "../components/Categories";
import { Featured } from "../components/Featured";
import { Wrapper } from "../components/Wrapper";
import { useRecoilValue } from "recoil";
import { albumsState } from "../atoms";
import { Box, Heading, Text } from "@chakra-ui/react";

interface LandingProps {}

export const Landing: React.FC<LandingProps> = ({}) => {
  const albums = useRecoilValue(albumsState);
  const title = "Andrewww Sandion chin";
  const desc = "You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings.";

  return (
    <>
      <Wrapper>
        <Featured albums={albums} />
        <Categories />
      </Wrapper>
      <Box 
      p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md"
      >
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    </>
  );
};
