import { useState } from "react";
import { createPortal } from "react-dom";
import { Character as CharacterType } from "rickmortyapi";
import styled from "styled-components";

import { ModalCharacter } from "./ModalCharacter";
import { StyledButton } from "./styled/StyledButton";

export interface CharacterProps {
  character: CharacterType;
}

export function Character({ character }: CharacterProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CharacterCard>
        <CharacterPhoto src={character.image} alt={character.name} />

        <CharacterCardBody>
          <CharacterName>
            {character.name} ({character.status})
          </CharacterName>

          <p>Gender: {character.gender}</p>
          <p>Species: {character.species}</p>
          <p>Type: {character.type || "N/A"}</p>
        </CharacterCardBody>

        <CharacterCardFooter>
          <StyledButton variant="outline" onClick={() => setShowModal(true)}>
            More info
          </StyledButton>
        </CharacterCardFooter>
      </CharacterCard>

      {showModal &&
        createPortal(
          <ModalCharacter
            character={character}
            onClose={() => setShowModal(false)}
          />,
          document.body,
        )}
    </>
  );
}

const CharacterCard = styled.article`
  border: 2px solid ${(props) => props.theme.colors.black};
  border-radius: 6px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const CharacterCardBody = styled.div`
  padding: 16px;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
`;

const CharacterCardFooter = styled.div`
  padding: 16px;
  padding-top: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CharacterPhoto = styled.img`
  width: 100%;
`;

const CharacterName = styled.h5`
  font-size: 1.25em;
`;
