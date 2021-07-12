import React, { useContext } from "react";

import Input from "components/Input";
import Button from "components/Button";
import { ButtonLoaderContext } from "components/Dashboard";

const UrlForm = ({ link, setUrl, loading, handleSubmit }) => {
  const buttonLoading = useContext(ButtonLoaderContext);
  return (
    <>
      <div className="flex-grow">
        <form
          className="w-full flex shadow rounded text-sm"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Enter a Url to shorten..."
            value={link}
            onChange={e => setUrl(e.target.value)}
          />
          <div>
            <Button
              type="submit"
              buttonText="Shorten!"
              loading={buttonLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UrlForm;
