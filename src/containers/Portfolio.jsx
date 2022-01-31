import React from "react";
import { Helmet } from "react-helmet";
import { Grid, Typography, Link } from "@mui/material";

const works = [
  {title: "E-Commerce with React and Redux", url: "https://example.com"},
  { title: "The Counselor", url: "https://thecounselor.ca" },
  {
    title: "Source Code for this WebSite (Under high Development)",
    url: "https://github.com/SteaceP/coderage",
  },
];

const Portfolio = () => {
  return (
    <>f
      <Helmet>
        <meta charSet="utf-8" />
        <title>Portfolio - Hacktive</title>
        <meta
          name="description"
          content="Work that I have done that is not behind a Non-Disclosure Agreement (N.D.A.). or the N.D.A. is lifted"
        />
        <link rel="canonical" href="https://coderage.pro/portfolio" />
      </Helmet>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Portfolio:
        </Typography>
        {works.map((work) => (
          <Link
            rel="noopener"
            target="_blank"
            href={work.url}
            underline="hover"
            gutterBottom
          >
            {work.title}
          </Link>
        ))}
        <Typography
          variant="body2"
          sx={{
            mt: 5,
          }}
        >
          I'll add more soon, as well as coding the page a lot better than this!
        </Typography>
      </Grid>
    </>
  );
};

export default Portfolio;
