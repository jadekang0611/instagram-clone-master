import React from "react";
import Helment from "react-helmet";

function SEO({ title }) {
  const titleText = title ? `${title} • Instagram` : "Instagram";
  return (
    <Helment>
      <title>{titleText}</title>
    </Helment>
  );
}

export default SEO;
