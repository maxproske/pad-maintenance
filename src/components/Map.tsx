import { memo } from 'react';
import styled from 'styled-components';

import { Tile } from './Tile';

const StyledMapWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledMap = styled.div<{ rows: number; cols: number }>`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 64px);
  grid-template-columns: repeat(${({ cols }) => cols}, 64px);
  grid-gap: 0;

  transform: rotateX(60deg) rotateZ(45deg);

  width: ${({ rows }) => rows * 64}px;
  height: ${({ cols }) => cols * 64}px;
`;

interface MapProps {
  map: any;
  mapTextureIndex: any;
  playerTextureIndex: any;
  handleTileClick: any;
  playerPath: any;
  handleWalkEnd: any;
  playerPathIndex: any;
}

/* eslint-disable react/display-name */

export const Map: React.FC<MapProps> = memo(
  ({
    map,
    mapTextureIndex,
    playerTextureIndex,
    handleTileClick,
    playerPath,
    handleWalkEnd,
    playerPathIndex,
  }) => {
    return (
      map &&
      mapTextureIndex &&
      playerTextureIndex && (
        <StyledMapWrapper>
          <StyledMap rows={map.length} cols={map[0].length}>
            {map.map((row: any[], y: any) =>
              row.map(
                (
                  tile: { symbol: any; entities: any; players: any },
                  x: any
                ) => {
                  // TODO: Store mapTextureIndex in state instead of prop drilling
                  return (
                    <Tile
                      mapTextureIndex={mapTextureIndex}
                      playerTextureIndex={playerTextureIndex}
                      symbol={tile.symbol}
                      entities={tile.entities}
                      players={tile.players}
                      xPos={x}
                      yPos={y}
                      key={`${x},${y}`}
                      handleTileClick={handleTileClick}
                      playerPath={playerPath}
                      handleWalkEnd={handleWalkEnd}
                      playerPathIndex={playerPathIndex}
                    />
                  );
                }
              )
            )}
          </StyledMap>
        </StyledMapWrapper>
      )
    );
  }
);
