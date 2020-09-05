import { useState, useEffect } from 'react'

import { createPlayer, createPlayerTextureIndex } from '../utils/gameHelpers'

export const usePlayer = (texturesFile) => {
  const [player, setPlayer] = useState(null)
  const [textureIndex, setTextureIndex] = useState(null)

  useEffect(() => {
    const fetchPlayer = async () => {
      const playerUpdate = await createPlayer()
      setPlayer(playerUpdate)
    }

    const fetchTextureIndex = async () => {
      const textureIndexUpdate = await createPlayerTextureIndex(texturesFile)
      setTextureIndex(textureIndexUpdate)
    }

    if (texturesFile) {
      fetchPlayer()
      fetchTextureIndex()
    }
  }, [texturesFile])

  return [player, setPlayer, textureIndex]
}