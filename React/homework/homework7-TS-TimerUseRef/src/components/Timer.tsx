import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CountList from './CountList';
import ResetBtn from './ResetBtn';

const Timer = () => {
    const [count, setCount] = useState<number>(0);
    const [countHistory, setCountHistory] = useState<number[]>([]);
    const [intervalId, setIntervalId] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(true);

    const startBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const localData = localStorage.getItem("Timer");
        if(localData){
            const parsedData = JSON.parse(localData);
            setCountHistory(parsedData);
        }
    })

    useEffect(() => {
        startBtn.current?.focus();
    }, [isStarted])

    const startCount = () => {
        const interval = setInterval(() => {
            setCount((prev) => prev +=1)
        }, 1000)
        setIntervalId(interval);
        setIsStarted(false)
    }
    const stopCount = () => {
        const updatedHistory = [...countHistory, count];
        setCountHistory(updatedHistory);
        clearInterval(intervalId)
        localStorage.setItem("Timer", JSON.stringify(updatedHistory));
        setIsStarted(true)
    }

    const calculateTotal = () => {
        const totalCounts = localStorage.getItem("Timer");
        if(totalCounts){
            const totalCountsParse:number[] = JSON.parse(totalCounts);
            const total = totalCountsParse.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0);
            return total;
        }
    }
    
    const handleRendHistory = useCallback(() => {
        const localHistory = localStorage.getItem("Timer");
        if(localHistory){
            const parseData:number[] = JSON.parse(localHistory);
            return(
                parseData.map((element, index) => {
                    return <li key={index}>{element}</li>
                })
            )
        }

    }, [countHistory])

    const handleResetTimer = useCallback(() => {
        setCount(0);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
        }
        setIsStarted(true)
    }, [intervalId])

    const calculatedTotal = useMemo(() => calculateTotal(), [countHistory])

    
  return (
    <div>
        <div>{count}</div>
        <div>
            <p>count history:</p>
            <ul>
                <CountList handleRendHistory={handleRendHistory}></CountList>
            </ul>
        </div>
        <div>
            <p>total count: {calculatedTotal}</p>
        </div>
        {isStarted ? (<button ref={startBtn} onClick={startCount}>start</button>) : (<button ref={startBtn} onClick={stopCount}>stop</button>)}
        <ResetBtn resetTimer={handleResetTimer}/>
    </div>
  )
}

export default Timer