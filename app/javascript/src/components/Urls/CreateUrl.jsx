import React from "react";
import UrlForm from "components/Urls/Form/UrlForm";

const CreateLink = ({ url, setUrl, handleSubmit }) => {
  return (
    <div className="flex justify-between">
      <UrlForm url={url} setUrl={setUrl} handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateLink;
