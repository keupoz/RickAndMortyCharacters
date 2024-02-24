import { useLockBodyScroll } from "@uidotdev/usehooks";
import { MouseEvent, useRef } from "react";
import { Character } from "rickmortyapi";
import styled from "styled-components";

import { StyledButton } from "./styled/StyledButton";

export interface ModalCharacterProps {
  character: Character;
  onClose: () => void;
}

export function ModalCharacter({ character, onClose }: ModalCharacterProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll();

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === backdropRef.current) {
      onClose();
    }
  }

  return (
    <ModalCharacterBackdrop ref={backdropRef} onClick={handleBackdropClick}>
      <ModalCharacterContainer>
        <ModalCharacterPhoto src={character.image} width={300} height={300} />

        <h2>{character.name}</h2>

        <table>
          <TableRow label="Status" value={character.status} />
          <TableRow label="Gender" value={character.gender} />
          <TableRow label="Species" value={character.species} />
          <TableRow label="Type" value={character.type || "N/A"} />
          <TableRow label="Origin" value={character.origin.name} />
          <TableRow label="Current location" value={character.location.name} />
        </table>

        <StyledButton variant="outline" onClick={onClose}>
          Close
        </StyledButton>
      </ModalCharacterContainer>
    </ModalCharacterBackdrop>
  );
}

interface TableRowProps {
  label: string;
  value: string;
}

function TableRow({ label, value }: TableRowProps) {
  return (
    <tr>
      <td>
        <b>{label}</b>:
      </td>

      <td>{value}</td>
    </tr>
  );
}

const ModalCharacterBackdrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  padding: 16px;

  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
`;

const ModalCharacterContainer = styled.div`
  background: ${(props) => props.theme.colors.white};
  border: 2px solid ${(props) => props.theme.colors.black};
  border-radius: ${(props) => props.theme.radius};
  padding: 16px;

  margin: auto;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalCharacterPhoto = styled.img`
  border-radius: ${(props) => props.theme.radius};

  height: auto;
  max-width: 100%;
`;
