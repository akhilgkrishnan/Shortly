import React, { useState, useEffect, createContext } from "react";
import { isNil, isEmpty, either } from "ramda";
import Container from "components/Container";
import ListUrls from "components/Urls/ListUrls";
import PageLoader from "components/PageLoader";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import urlsApi from "apis/urls";
import CreateUrl from "components/Urls/CreateUrl";
import StatsOverview from "./StatsOverview";

export const UrlsDataContext = createContext();
export const ButtonLoaderContext = createContext();

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const [scope, setScope] = useState("my");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await urlsApi.create({ url: { long_url: url } });
      setUrl("");
      fetchUrls(scope);
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
      await fetchUrls(scope);
    } catch (error) {
      logger.error(error);
    }
  };

  const deleteUrl = async (slug) => {
    try {
      await urlsApi.destroy(slug);
      await fetchUrls(scope);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClick = (link) => {
    try {
      setTimeout(() => {
        fetchUrls(scope);
      }, 1000);
      window.open(link, "_blank");
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchUrls = async (targetScope = scope) => {
    try {
      const response = await urlsApi.list({ scope: targetScope });
      setUrls(response.data.urls);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  const handleScopeChange = (newScope) => {
    setScope(newScope);
    fetchUrls(newScope);
  };

  useEffect(() => {
    fetchUrls("my");
  }, []);

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <PageLoader />
      </div>
    );
  }

  const hasUrls = !either(isNil, isEmpty)(urls);

  const filteredUrls = urls.filter((u) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (u.long_url && u.long_url.toLowerCase().includes(q)) ||
      (u.slug && u.slug.toLowerCase().includes(q)) ||
      (u.short_url && u.short_url.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50/60">
      <div>
        <NavBar />

        {/* Hero Section */}
        <Container className="my-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Shorten, Share &amp; Track URLs
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-700 max-w-lg mx-auto">
            Transform long, complex links into clean, trackable short URLs with real-time analytics.
          </p>
        </Container>

        {/* URL Creation Card */}
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

        {/* Dashboard Content */}
        <Container>
          {/* Analytics Metric Cards */}
          <StatsOverview urls={urls} />

          {/* Scope Switcher and Search Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center space-x-2">
              <div className="inline-flex p-1 bg-gray-200/80 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => handleScopeChange("my")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    scope === "my"
                      ? "bg-white text-gray-900 shadow-xs font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <i className="ri-user-line mr-1"></i> My Links
                </button>
                <button
                  type="button"
                  onClick={() => handleScopeChange("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    scope === "all"
                      ? "bg-white text-gray-900 shadow-xs font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <i className="ri-earth-line mr-1"></i> Public Feed
                </button>
              </div>
              <span className="text-xs text-gray-600 font-bold">({filteredUrls.length})</span>
            </div>

            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <i className="ri-search-line"></i>
              </div>
              <input
                type="text"
                placeholder="Search by URL or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  <i className="ri-close-circle-fill"></i>
                </button>
              )}
            </div>
          </div>

          {hasUrls ? (
            <>
              {/* Links Table or Search Empty State */}
              {filteredUrls.length > 0 ? (
                <UrlsDataContext.Provider value={filteredUrls}>
                  <ListUrls
                    data={filteredUrls}
                    pinUrl={pinUrl}
                    handleClick={handleClick}
                    deleteUrl={deleteUrl}
                  />
                </UrlsDataContext.Provider>
              ) : (
                <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 text-center">
                  <p className="text-gray-700 font-medium">
                    No links found matching &ldquo;{searchQuery}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-3 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-3xl">
                <i className="ri-links-line"></i>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {scope === "my" ? "No shortened links in your session yet" : "No links in the feed yet"}
              </h3>
              <p className="text-sm text-gray-700 max-w-sm mx-auto">
                {scope === "my"
                  ? "Shorten a URL using the form above to add links to your private session."
                  : "Paste a URL above to publish the first link to the public feed."}
              </p>
            </div>
          )}
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
