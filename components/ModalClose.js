import Image from "next/legacy/image";
import btnclose from "../public/edit-profile/closebutton.svg";
import { chakra } from "@chakra-ui/react";

const ModalClose = () => {
  return (
    <chakra.span float={"right"}>
      <Image
        src={btnclose.src}
        alt="buton close"
        width={"37.59rem"}
        height="37.84rem"
      />
    </chakra.span>
  );
};

export default ModalClose;
