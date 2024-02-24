import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useRef, useState } from "react";
import { CharacterFilter, getCharacters } from "rickmortyapi";
import styled from "styled-components";

import { Character } from "./Character";
import { LabeledInput } from "./LabeledInput";
import { LabeledSelect } from "./LabeledSelect";
import { Pagination } from "./Pagination";

const GENDERS = ["All", "Female", "Male", "Genderless", "Unknown"];
const STATUSES = ["All", "Alive", "Dead", "unknown"];

export function Characters() {
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const isSMScreen = useMediaQuery("(max-width: 768px)");
  const isMDScreen = useMediaQuery("(max-width: 992px)");

  const maxPagesPerView = isSMScreen ? 7 : isMDScreen ? 11 : 15;
  const maxPagesPerEdge = !isSMScreen && !isMDScreen ? 3 : 1;

  function collectFilters() {
    const result: CharacterFilter = { page };

    if (nameFilter) result.name = nameFilter;
    if (speciesFilter) result.species = speciesFilter;
    if (typeFilter) result.type = typeFilter;

    if (genderFilter !== "All") result.gender = genderFilter;
    if (statusFilter !== "All") result.status = statusFilter;

    result.species;

    return result;
  }

  const { isPending, error, data } = useQuery({
    queryKey: [
      "characters",
      page,
      nameFilter,
      speciesFilter,
      typeFilter,
      genderFilter,
      statusFilter,
    ],
    queryFn: () => getCharacters(collectFilters()),
    select(data) {
      if (data.status === 404) {
        throw new Error("No characters found");
      }

      if (data.status !== 200) {
        throw new Error(`Failed to get characters: ${data.statusMessage}`);
      }

      return data.data;
    },
  });

  const pagesCache = useRef(data?.info?.pages);

  if (data?.info?.pages !== undefined) {
    pagesCache.current = data.info.pages;
  }

  return (
    <>
      <LabeledInput
        label="Filter by name"
        value={nameFilter}
        onChange={setNameFilter}
      />

      <LabeledInput
        label="Filter by species"
        value={speciesFilter}
        onChange={setSpeciesFilter}
      />

      <LabeledInput
        label="Filter by type"
        value={typeFilter}
        onChange={setTypeFilter}
      />

      <LabeledSelect
        label="Filter by gender"
        options={GENDERS}
        value={genderFilter}
        onChange={setGenderFilter}
      />

      <LabeledSelect
        label="Filter by status"
        options={STATUSES}
        value={statusFilter}
        onChange={setStatusFilter}
      />

      {!error && pagesCache.current && (
        <Pagination
          count={pagesCache.current}
          current={page}
          maxPerView={maxPagesPerView}
          maxPerEdge={maxPagesPerEdge}
          onChange={setPage}
        />
      )}

      {isPending && <div>Loading ...</div>}

      {error && <CharactersError>{error.message}</CharactersError>}

      {!error && data && (
        <>
          <div>{data.info?.count ?? "N/A"} results</div>

          <CharactersGrid>
            {data.results?.map((character) => (
              <Character key={character.id} character={character} />
            ))}
          </CharactersGrid>

          {pagesCache.current && (
            <Pagination
              count={pagesCache.current}
              current={page}
              maxPerView={maxPagesPerView}
              maxPerEdge={maxPagesPerEdge}
              onChange={setPage}
            />
          )}
        </>
      )}
    </>
  );
}

const CharactersGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CharactersError = styled.div`
  color: red;
  border: 2px solid red;
  border-radius: ${(props) => props.theme.radius};
  font-weight: bold;
  padding: 8px 16px;
`;
