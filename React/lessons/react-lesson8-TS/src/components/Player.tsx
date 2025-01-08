import React, { useRef } from 'react'

interface Props{
    source:string;
}

const Player: React.FC<Props> = ({source}) => {
    const playerRef = useRef<HTMLVideoElement | null>(null)

    const play = () => playerRef.current?.play()
    const pause = () => playerRef.current?.pause();

    return(
        <div>
            <video ref={playerRef} src={source}></video>
            <button onClick={play} >play</button>
            <button onClick={pause} >stop</button>
        </div>
    )
}

export default Player