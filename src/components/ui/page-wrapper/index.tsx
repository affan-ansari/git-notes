import { Box } from "@mui/material";
import { ReactNode } from "react";
import "./page-wrapper.styles.scss";

type PageWrapperProps = {
    children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
    return <Box className="page-wrapper__container">{children}</Box>;
};

export default PageWrapper;
