import { Typography, Link, Box, Divider } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

//! Lists(Unordered, Ordered and list items) throw red warnings when using ReactMarkdown. I'm not sure why but this seems to be coming from Emotions

const Markdown = (props: { children: string }) => {
  return (
    <ReactMarkdown
      children={props.children}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        h1: (props: any) => (
          <Typography variant="h4" gutterBottom>
            {props.children}
          </Typography>
        ),
        h2: (props: any) => (
          <Typography variant="h6" gutterBottom>
            {props.children}
          </Typography>
        ),
        h3: (props: any) => (
          <Typography variant="subtitle1" gutterBottom>
            {props.children}
          </Typography>
        ),
        h4: (props: any) => (
          <Typography variant="caption" paragraph>
            {props.children}
          </Typography>
        ),
        p: (props: any) => <Typography paragraph>{props.children}</Typography>,
        a: (props: any) => (
          <Link underline="hover" target="_blank" rel="noopener" {...props} />
        ),
        ul: (props: any) => (
          <Box
            component="ul"
            sx={{ mt: 1, listStyle: "disc", typography: "body1" }}
            {...props}
          />
        ),
        ol: (props: any) => (
          <Box component="ol" sx={{ mt: 1, listStyle: "decimal" }} {...props} />
        ),
        li: (props: any) => (
          <Box
            component="li"
            sx={{ mt: 1 }}
            ordered={props.toString()}
            {...props}
          />
        ),
        hr: (props: any) => <Divider sx={{ mb: 3 }} {...props} />,
        code: (props: any) => (
          <SyntaxHighlighter
            language={props.language}
            style={a11yDark}
            showLineNumbers
            {...props}
          />
        ),
      }}
    />
  );
};

export default Markdown;
