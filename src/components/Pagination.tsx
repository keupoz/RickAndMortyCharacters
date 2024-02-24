import { ChangeEvent, memo } from "react";
import styled from "styled-components";

import { range } from "@/utils/range";

import { StyledButton } from "./styled/StyledButton";
import { StyledInput } from "./styled/StyledInput";

export interface PaginationProps {
  count: number;
  current: number;
  maxPerView: number;
  maxPerEdge?: number;
  onChange: (value: number) => void;
}

function generatePages(
  count: number,
  current: number,
  maxPerView: number,
  maxPerEdge: number = 1,
): Array<number | null> {
  // Do no accept even number
  if (maxPerView % 2 === 0) maxPerView -= 1;

  // All pages can be displayed
  if (maxPerView >= count) {
    return Array.from(range(count, 1));
  }

  const edgeReserved = maxPerEdge + 1;
  const maxInEdge = maxPerView - edgeReserved;
  const maxInMiddle = maxPerView - edgeReserved * 2;

  const endDistance = 1 + count - current;

  // Current page is at the begginig
  if (current < maxInEdge) {
    return [
      ...range(maxPerView - edgeReserved, 1),
      null,
      ...range(maxPerEdge, 1 + count - maxPerEdge),
    ];
  }

  // Current page is at the end
  if (endDistance < maxInEdge) {
    return [
      ...range(maxPerEdge, 1),
      null,
      ...range(maxPerView - edgeReserved, 1 + count - maxInEdge),
    ];
  }

  return [
    ...range(maxPerEdge, 1),
    null,
    ...range(maxInMiddle, current - maxInMiddle / 2 + 0.5),
    null,
    ...range(maxPerEdge, 1 + count - maxPerEdge),
  ];
}

export const Pagination = memo(
  ({ count, current, maxPerView, maxPerEdge, onChange }: PaginationProps) => {
    const pages = generatePages(count, current, maxPerView, maxPerEdge);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      const value = parseInt(e.currentTarget.value);

      if (value < 1 || value > count || isNaN(value)) return;

      onChange(value);
    }

    return (
      <PaginationContainer>
        {pages.map((page, i) => {
          if (page === null) {
            return (
              <StyledButton key={i} variant="ghost" disabled>
                ...
              </StyledButton>
            );
          }

          return (
            <StyledButton
              key={i}
              variant={page === current ? "solid" : "outline"}
              onClick={() => onChange(page)}
            >
              {page}
            </StyledButton>
          );
        })}

        <StyledInput
          type="number"
          min={1}
          max={count}
          step={1}
          value={current}
          onChange={handleInputChange}
        />
      </PaginationContainer>
    );
  },
);

const PaginationContainer = styled.div`
  overflow-x: auto;

  max-width: 100%;

  display: flex;
  align-items: baseline;
  gap: 8px;
`;
