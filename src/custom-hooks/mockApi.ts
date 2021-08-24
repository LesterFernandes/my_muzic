import { useEffect, useState } from "react";
import songzMocks from "../mocks/songz.json";

const fakeApi = () => new Promise((resolve) => setTimeout(resolve, 1000));

const getMock = <T = unknown>(which: string): T | null => {
  switch (which) {
    case "songz":
      return songzMocks as unknown as T;
    default:
      return null;
  }
};

function useMockApi<T = unknown>(which: string): T | null {
  const [resp, setResp] = useState<T | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      fakeApi();
      const mock = getMock<T>(which);
      setResp(mock);
    };
    fetchData();
  }, [setResp]);
  return resp;
}

export default useMockApi;
