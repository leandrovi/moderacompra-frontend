import React, { useEffect, useState } from "react";

// Components
import { Info } from "./Info";

// Interface
import { Status } from "../interfaces";

interface ListInfoProps {
  status?: Status | null;
}

export function ListInfo({ status }: ListInfoProps) {
  if (!status) {
    return (
      <Info
        type="orange"
        text="Sua lista ficará pendente até a confirmação após a compra"
      />
    );
  }

  if (status?.description === "finalizada") {
  }

  if (status?.description === "pendente") {
    return (
      <Info
        type="purple"
        text="Sua lista ficará pendente até você voltar do mercado"
      />
    );
  }

  if (status?.description === "em aberto") {
    return (
      <Info
        type="blue"
        text="Antes da próxima lista, atualize o que sobrou da última compra"
      />
    );
  }

  return <></>;
}
