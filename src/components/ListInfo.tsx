import React, { useEffect, useState } from "react";

// Components
import { Info } from "./Info";

// Interfaces
import { StatusEnum } from "../interfaces";

interface ListInfoProps {
  status?: StatusEnum | null;
}

export function ListInfo({ status }: ListInfoProps) {
  const [infoType, setInfoType] = useState<
    "green" | "orange" | "purple" | "blue"
  >("orange");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!status) {
      setInfoType("orange");
      setText("Sua lista ficará pendente até a confirmação após a compra");
    }

    if (status === "pending") {
      setInfoType("purple");
      setText("Sua lista ficará pendente até você voltar do mercado");
    }

    if (status === "open") {
      setInfoType("blue");
      setText("Precisamos que você atualize o que sobrou da última compra");
    }
  }, [infoType]);

  return status !== StatusEnum.closed ? (
    <Info type={infoType} text={text} />
  ) : (
    <></>
  );
}
