import { Box, Text, Link, Button } from "@chakra-ui/react";
import Image from "next/legacy/image";
import nairaboomlogo from "../public/redesign/logo.png";
import NavElements from "./NavElements";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import DotImage from "./Dot";
import { useState } from "react";


const NavBar = () => {
  const [monitorIcon, setMonitorIcon] = useState(true);

  function openNav() {
    let sideNav = document.getElementById("mySidenav");
    sideNav.style.width = "100%";
    sideNav.style.height = "100vh";
    setMonitorIcon(false);
  }

  function closeNav() {
    let sideNav = document.getElementById("mySidenav");
    sideNav.style.height = 0;
    setMonitorIcon(true);
  }

  return (
    <Box
      w="100%"
      display={"flex"}
      top={0}
      fontFamily="poppins"
      bgColor={"nairablue"}
      h={{ base: "6rem", sm: "6rem", md: "8rem" }}
      alignItems={"center"}
      justifyContent={{ base: "space-between", lg: "space-around" }}
      px={{ base: "1.5rem", sm: "1rem", lg: "0px" }}
      // pl={{base:"-2rem", sm: "-1.5rem"}}
      position={"sticky"}
      zIndex={999}
    >
      <Box as={Link}  ml={{sm: "-3.5rem", md:"0rem", lg: "0rem"}} href="/">
        <Image src={nairaboomlogo} alt="NairaBoom Logo" />
      </Box>

      <NavElements
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      />
      <Box
        display={{ base: "flex", lg: "none" }}
        justifySelf="flex-end"
        alignSelf="center"
        border={"1px solid"}
        borderColor="white"
        borderRadius={"2px"}
        transition="color .5s"
      >
        {monitorIcon ? (
          <HamburgerIcon
            w="2.5rem"
            h="2rem"
            color="nairagreen"
            cursor="pointer"
            onClick={openNav}
          />
        ) : (
          <Link
            to={null}
            alignSelf={"start"}
            className="closebtn"
            onClick={closeNav}
          >
            <CloseIcon w="2.5rem" h="2rem" py=".5rem" color={"nairagreen"} />
          </Link>
        )}

        <Box
          id="mySidenav"
          className="sidenav"
          height={0}
          top={0}
          right={0}
          zIndex={999}
          overflowX="hidden"
          bgColor="nairablue"
          position={"fixed"}
          transition="0.5s"
          mt="6rem"
        >
          <NavElements display="flex" />
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
