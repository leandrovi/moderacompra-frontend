import React, { useEffect, useState } from "react";

// Components
import { Info } from "./Info";

// Interface
interface ListInfoProps {
  status?: "pendente" | "em aberto" | "finalizada";
}

export function ListInfo({ status }: ListInfoProps) {
  const [infoType, setInfoType] =
    useState<"green" | "orange" | "purple" | "blue">("orange");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!status) {
      setInfoType("orange");
      setText("Sua lista ficará pendente até a confirmação após a compra");
    }

    if (status === "pendente") {
      setInfoType("purple");
      setText("Sua lista ficará pendente até você voltar do mercado");
    }

    if (status === "em aberto") {
      setInfoType("blue");
      setText("Precisamos que você atualize o que sobrou da última compra");
    }
  }, [infoType]);

  return status !== "finalizada" ? <Info type={infoType} text={text} /> : <></>;
}
