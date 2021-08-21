import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { RecoilRoot } from "recoil";
import { albumsState } from "./atoms";
import { TOP_ALBUMS_URL } from "./constants";
import useFetch, { IApi } from "./custom-hooks";
import { IAlbum } from "./shared/interfaces";
import transform from "./utils/transform";
import { Landing } from "./pages/Landing";
import { Search } from "./pages/Search";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const { data, error }: IApi<IAlbum[]> = useFetch(TOP_ALBUMS_URL, transform);
  const setAlbumData = useSetRecoilState(albumsState);
  if (data) {
    setAlbumData(data);
  }

  return data ? (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/about" component={Search}></Route>
      </Switch>
    </BrowserRouter>
  ) : (
    <></>
  );
};

export default () => (
  <RecoilRoot>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </RecoilRoot>
);
