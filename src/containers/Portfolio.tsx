import { useState, SyntheticEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useUIDSeed } from "react-uid";
import {
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const works = [
  {
    name: "Yelpcamp",
    description:
      "(Offline, fix soon)It's the first project that I made but has been updated several times over the years. Fake data has been seeded for the MapBox features to work.  Using Node, Express, EJS as templating, Mongoose to communicate with MongoDB Atlas and Passport for authentication.",
    url: "https://yelpcamp.coderage.pro",
    panelId: 1,
    attributes: {
      id: "panel1bh-header",
      ariaControls: "panel1bh-content",
    },
  },
  {
    name: "React E-Commerce",
    description:
      "Simple but effective E-Commerce made with React, Redux and Firebase: Firestore as database, Google Authentication",
    panelId: 2,
    url: "https://e-commerce-demo.coderage.pro",
    attributes: {
      ariaControls: "panel2bh-content",
      id: "panel2bh-header",
    },
  },
  {
    name: "The Counselor (L'Intervenant)",
    description:
      "Made with WordPress with the Optima - Psychology and Counseling theme.",
    url: "https://thecounselor.ca",
    panelId: 3,
    attributes: {
      ariaControls: "panel3bh-content",
      id: "panel3bh-header",
    },
  },
  {
    name: "Pokedex",
    description:
      "Project that I followed to learn Material-UI(MUI). Refactored from the original project by Anthony Still. Pagination was added for the Pokemon API",
    url: "https://pokedex.coderage.pro",
    panelId: 4,
    attributes: {
      ariaControls: "panel4bh-content",
      id: "panel4bh-header",
    },
  },
  {
    name: "Code Rage Frontend",
    description:
      "Source code for this website (Under Development as you can see)",
    url: "https://github.com/SteaceP/coderage",
    panelId: 5,
    attributes: {
      ariaControls: "panel5bh-content",
      id: "panel5bh-header",
    },
  },
  {
    name: "Code Rage Backend",
    description:
      "Source code for this website (Under Development as you can see)",
    url: "https://github.com/SteaceP/coderage-backend",
    panelId: 6,
    attributes: {
      ariaControls: "panel6bh-content",
      id: "panel6bh-header",
    },
  },
];

const Portfolio = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const uid = useUIDSeed();

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Portfolio - Steacy Paquette</title>
        <meta
          name="description"
          content="Work that I have done that is not behind a Non-Disclosure Agreement (N.D.A.). or the N.D.A. is lifted"
        />
        <link rel="canonical" href="https://coderage.pro/portfolio" />
      </Helmet>
      <Typography variant="subtitle1" align="center">
        Portfolio
      </Typography>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{ color: "text.secondary", mb: 3 }}
      >
        Link goes to the live project
        <br />
        Those are projects that are exclusively made by me, others that I worked
        on are on the way.
        <br />I just need to make sure witch one I can show.
      </Typography>
      {works.map((work) => (
        <Accordion
          expanded={expanded === `${work.panelId}`}
          onChange={handleChange(`${work.panelId}`)}
          key={uid(work)}
          sx={{ mr: 5, ml: 5 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={work.attributes.ariaControls}
            id={work.attributes.id}
          >
            <Typography sx={{ width: "40%", flexShrink: 0 }}>
              {work.name}
            </Typography>
            <Typography>
              {" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={work.url}
                underline="hover"
              >
                {work.url.slice(8)}
              </Link>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "text.secondary" }}>
              {work.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Portfolio;
