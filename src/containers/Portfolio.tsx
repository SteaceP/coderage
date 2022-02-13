import { Helmet } from "react-helmet";
import { useUIDSeed } from "react-uid";
import { Grid, Typography, Link } from "@mui/material";

const works = [
  {
    title: "First project that I made, updated over the years",
    url: "https://yelpcamp.coderage.pro",
  },
  {
    title: "E-Commerce with React, Redux and Firebase",
    url: "https://e-commerce-demo.coderage.pro/",
  },
  {
    title: "The Counselor(L'Intervenant), made with WordPress for a client",
    url: "https://thecounselor.ca",
  },
  {
    title:
      "Pokedex, first project to learn Material-UI(MUI). Refactor of the orignal project from Anthony Still, added pagination to the Pokemon API",
    url: "https://pokedex.coderage.pro",
  },
  {
    title: "Source Code for this WebSite (Under high Development)",
    url: "https://github.com/SteaceP/coderage",
  },
];

const Portfolio = () => {
  const uid = useUIDSeed();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Portfolio - Steacy Paquette</title>
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
            key={uid(work)}
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
