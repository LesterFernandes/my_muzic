
import { Text } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
export default (error:Error) => {
    return <Wrapper>
        <Text fontSize="5xl">Error - {error.name}</Text>
        <Text fontSize="3xl">{error.message}</Text> 
    </Wrapper>    
}