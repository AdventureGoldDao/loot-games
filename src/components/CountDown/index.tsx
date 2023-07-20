import React, { useEffect, useState, useRef } from "react";

import { getPoolLeftTime } from "utils/time";

const CountDown = ({ onEnd, time, type }) => {
  const [left, setLeft] = useState<any>()
  let timer: any = useRef();

  const dealTime = (time) => {
    const obj = getPoolLeftTime(time);
    if (obj) {
      setLeft(obj)
      timer.current = setInterval(() => {
        const leftObj = getPoolLeftTime(time)
        if (leftObj) {
          setLeft(leftObj)
        } else {
          clearInterval(timer.current)
          onEnd && onEnd()
        }
      }, 1000)
    }
  }

  const textShow = () => {
    let text = '';
    if (type === 'word') {
      text = text + left.hours + 'h ' + left.minutes + 'm'
      if (left.days > 0) {
        text = left.days + 'd ' + text
      } else {
        text = text + ' ' + left.seconds + 's'
      }

    } else if (type === 'vote') {
      if (left.days > 0) {
        return `${left.days} days, ${left.hours} hrs`
      } else if (left.hours > 0) {
        return `${left.hours} hrs`
      } else if (left.minutes > 0) {
        return `${left.minutes} mins`
      } else {
        return `${left.seconds} secs`
      }


    } else if (type === 'farm') {
      text = text + left.hours + ' : ' + left.minutes
      if (left.days > 0) {
        return `In ${left.days} days`
      } else {
        text = text + ' : ' + left.seconds
      }


    } else {
      text = text + left.hours + ' : ' + left.minutes
      if (left.days > 0) {
        text = left.days + 'd ' + text
      } else {
        text = text + ' : ' + left.seconds
      }
    }

    return text
  }

  useEffect(() => {
    if (time) {
      dealTime(time)
    }

    return () => {
      clearInterval(timer.current)
    }
  }, [time])

  return (
    <>
      {
        left
          ? textShow()
          : ""
      }
    </>
  )
}

export default CountDown;