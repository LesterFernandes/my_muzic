import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../atoms";

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
  const categories = useRecoilValue(categoriesState);
  const clickHandler = useCallback(
    (e: React.MouseEvent, categoryId: string) => {
      e.stopPropagation();
      console.log(categoryId)
    },
    []
  );
  return (
    <Wrap spacing="10px" justify="center">
      {categories.map((category, index) => (
        <WrapItem
          key={index}
          onClick={(e) => clickHandler(e, category.categoryId)}
        >
          <Center  w="180px" h="80px" bg="red.200">
            {category.category}
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};
