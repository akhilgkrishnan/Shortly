import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import Container from "components/Container";
import ListUrls from "components/Urls/ListUrls";
import PageLoader from "components/PageLoader";
import NavBar from "components/NavBar";
import urlsApi from "apis/urls";

const Dashboard = ({ history }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      const response = await urlsApi.list();
      setUrls(response.data.urls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (loading) {
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
          <ListUrls data={urls} />
        </Container>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Container>
        <h1 className="text-xl leading-5 text-center">
          There is no urls shortened 😔
        </h1>
      </Container>
    </>
  );
};

export default Dashboard;
