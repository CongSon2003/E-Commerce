import React from 'react'
import { useWindowSize } from 'react-use'
import ConfettiCannon from 'react-confetti'

const Confetti = () => {
  const { width, height } = useWindowSize();
  return (
    <ConfettiCannon
      width={width - 15}
      height={height - 15}
    />
  )
}

export default Confetti