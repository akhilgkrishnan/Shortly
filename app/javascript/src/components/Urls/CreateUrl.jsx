import React from "react";
import UrlForm from "components/Urls/Form/UrlForm";

const CreateLink = ({ url, setUrl, handleSubmit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-7">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Shorten a new link</h2>
        <p className="text-sm text-gray-700 mt-0.5">
          Paste your long URL below to generate a short, shareable link.
        </p>
      </div>
      <UrlForm url={url} setUrl={setUrl} handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateLink;
