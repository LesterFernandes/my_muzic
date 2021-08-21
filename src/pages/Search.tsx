import React from "react";
import { useRecoilValue } from "recoil";
import { albumsState } from "../atoms";
import { Input } from "@chakra-ui/react";

interface SearchProps {
  categoryId: string;
}

export const Search: React.FC<SearchProps> = ({}) => {
  const categories = useRecoilValue(albumsState);
  return <>I'm home dawgg!!</>;
};
