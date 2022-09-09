import { Typography, Link, Box, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import graphql from "react-syntax-highlighter/dist/esm/languages/prism/graphql";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";

import replaceLastString from "utils/replaceLastString"; //? should work but doesn't...

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("graphql", graphql);
SyntaxHighlighter.registerLanguage("markdown", markdown);

const RenderPost = (props: { markdown: string }) => {
  const theme = useTheme();

  return (
    <ReactMarkdown
      children={props.markdown}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        h1: (props) => (
          <Typography variant="h4" gutterBottom>
            {props.children}
          </Typography>
        ),
        h2: (props) => (
          <Typography variant="h6" gutterBottom>
            {props.children}
          </Typography>
        ),
        h3: (props) => (
          <Typography variant="subtitle1" gutterBottom>
            {props.children}
          </Typography>
        ),
        h4: (props) => (
          <Typography variant="caption" paragraph>
            {props.children}
          </Typography>
        ),
        p: (props) => <Typography paragraph>{props.children}</Typography>,
        a: (props) => (
          <Link underline="hover" target="_blank" rel="noopener" {...props} />
        ),
        ul: (props) => (
          <Box
            component="ul"
            sx={{ mt: 1, listStyle: "disc", typography: "body1" }}
            {...props}
          />
        ),
        ol: (props) => (
          <Box component="ol" sx={{ mt: 1, listStyle: "decimal" }} {...props} />
        ),
        li: (props) => <Box component="li" sx={{ mt: 1 }} {...props} />,
        hr: (props) => <Divider sx={{ mb: 3 }} {...props} />,
        code: (props: any) => {
          console.log("first", props.children);
          const hideLastLine = replaceLastString(props.children, "\n", "");
          console.log("hideLastLine", hideLastLine);
          return (
            <SyntaxHighlighter
              language={
                props.className
                  ? props.className.replace("language-", "")
                  : undefined
              }
              style={
                theme.palette.mode === "light" ? materialLight : materialDark
              }
              wrapLongLines={true}
            >
              {hideLastLine}
            </SyntaxHighlighter>
          );
        },
      }}
    />
  );
};

export default RenderPost;
