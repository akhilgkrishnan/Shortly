import React, { useState, useEffect, createContext } from "react";
import { isNil, isEmpty, either } from "ramda";
import Container from "components/Container";
import ListUrls from "components/Urls/ListUrls";
import PageLoader from "components/PageLoader";
import NavBar from "components/NavBar";
import urlsApi from "apis/urls";
import CreateUrl from "components/Urls/CreateUrl";

export const UrlsDataContext = createContext();
export const ButtonLoaderContext = createContext();

const Dashboard = ({ history }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await urlsApi.create({ url: { long_url: url } });
      fetchUrls();
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const pinUrl = async (slug, status) => {
    try {
      const toggledStatus = !status;
      await urlsApi.update({
        slug,
        payload: { url: { is_pinned: toggledStatus } },
      });
      await fetchUrls();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClick = link => {
    try {
      setTimeout(() => {
        fetchUrls();
      }, 1000);
      window.open(link, "_blank");
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchUrls = async () => {
    try {
      const response = await urlsApi.list();
      setUrls(response.data.urls);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(urls)) {
    return (
      <>
        <NavBar />
        <Container>
          <ButtonLoaderContext.Provider value={loading}>
            <CreateUrl
              url={url}
              setUrl={setUrl}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          </ButtonLoaderContext.Provider>
        </Container>
        <Container>
          <UrlsDataContext.Provider value={urls}>
            <ListUrls data={urls} pinUrl={pinUrl} handleClick={handleClick} />
          </UrlsDataContext.Provider>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Container>
        <ButtonLoaderContext.Provider value={loading}>
          <CreateUrl
            url={url}
            setUrl={setUrl}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </ButtonLoaderContext.Provider>
      </Container>
      <Container>
        <h1 className="text-xl leading-5 text-center">
          There is no urls shortened 😔
        </h1>
      </Container>
    </>
  );
};

export default Dashboard;
