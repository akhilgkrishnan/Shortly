import React, { useContext } from "react";

import Input from "components/Input";
import Button from "components/Button";
import { ButtonLoaderContext } from "components/Dashboard";

const UrlForm = ({ url, link, setUrl, handleSubmit }) => {
  const buttonLoading = useContext(ButtonLoaderContext);
  return (
    <form
      className="flex flex-col sm:flex-row items-stretch gap-3 w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
          <i className="ri-link text-lg"></i>
        </div>
        <Input
          placeholder="https://example.com/your-long-url-to-shorten..."
          value={url || link || ""}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <div className="sm:w-auto">
        <Button
          type="submit"
          buttonText="Shorten URL"
          loading={buttonLoading}
        />
      </div>
    </form>
  );
};

export default UrlForm;
