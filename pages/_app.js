/* eslint-disable react/prop-types */
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { UserProvider } from "../lib/context/UserRegProvider";
import { StateContexts } from "../lib/context/context";
import "../styles/cimage.css";
import "../styles/custom.css";
import "../styles/globals.css";
import "../styles/index.css";
import { DatePickerProvider } from "../utils/dobContext";
import RouteGuard from "../utils/middleware/routeGaurd2";

const colors = {
  nairagreen: "#1ED760",
  nairablue: "#002047",
  currentlink: "rgba(0, 32, 71, 0.05)",
  nairagrey: "#A7A7A7",
  brand: {
    background: "#002047"
  }
};

const breakpoints = {
  xs: "320px",
  sm: "400px",
  md: "768px",
  lg: "1024px"
};

const components = {
  Button: {
    variants: {
      "brand-outline": {
        height: "fit-content",
        py: { base: 1, md: 2 },
        px: { base: 3, md: 5 },
        borderWidth: 1,
        borderRadius: 50
      },
      "brand-solid": {
        height: "fit-content",
        py: { base: 1, md: 2 },
        px: { base: 3, md: 5 },
        borderRadius: 50
      }
    }
  }
};

const theme = extendTheme({ colors, breakpoints, components });

function MyApp({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = appProps.router.pathname.includes(`_dashboard`);
  const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;
  const path = useRouter();

  const [showDrawer, setShowDrawer] = useState();

  useEffect(() => {
    if (
      path.pathname === "/agent_dashboard" ||
      path.pathname === "/customer_dashboard" ||
      path.pathname === "/customer_dashboard/cashback" ||
      path.pathname === "/agent_dashboard/cashback"
    ) {
      setShowDrawer(true);
    } else {
      setShowDrawer(false);
    }
  }, [path.pathname]);

  return (
    <StateContexts>
      <DatePickerProvider>
        <ChakraProvider theme={theme}>
          <UserProvider>
            <RouteGuard>
              {" "}
              {showDrawer ? (
                <Component {...pageProps} />
              ) : (
                <LayoutComponent>
                  <Component {...pageProps} />{" "}
                </LayoutComponent>
              )}{" "}
            </RouteGuard>{" "}
          </UserProvider>{" "}
        </ChakraProvider>{" "}
      </DatePickerProvider>{" "}
    </StateContexts>
  );
}

export default MyApp;
