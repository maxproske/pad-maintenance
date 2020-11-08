import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pos } from '~/types';

const tiles = '/assets/basic.png';

const StyledEntity = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
`;

// TODO: Share styled component with Tile
const StyledEntityTexture = styled.div<{ texturePos: Pos }>`
  width: 100%;
  height: 100%;

  z-index: 2;

  pointer-events: none; /* Hover grid entities, not 96x96 child */

  background: url(${tiles});
  background-position: -${({ texturePos }) => texturePos.xPos}px ${({ texturePos }) => texturePos.yPos}px;
  background-repeat: no-repeat;
  background-size: 1000% 100%;
  image-rendering: pixelated;
  position: relative;
  top: -32px;
  left: -32px;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(2.9);
`;

interface EntityProps {
  mapTextureIndex: any;
  symbol: string;
}

export const Entity: React.FC<EntityProps> = ({ mapTextureIndex, symbol }) => {
  const [texturePos, setTexturePos] = useState<Pos | null>(null);

  // Get background position for texture
  useEffect(() => {
    if (mapTextureIndex[symbol]) {
      // Get random texture variation
      const entityTexture =
        mapTextureIndex[symbol][
          Math.floor(Math.random() * mapTextureIndex[symbol].length)
        ];
      const texturePosUpdate = {
        xPos: entityTexture.xPos,
        yPos: entityTexture.yPos,
      };

      setTexturePos(texturePosUpdate);
    }
  }, [mapTextureIndex, symbol]);

  return (
    <StyledEntity>
      {texturePos && <StyledEntityTexture texturePos={texturePos} />}
    </StyledEntity>
  );
};