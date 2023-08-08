import React from 'react';

export default function Background(props) {
  const [backgroundGradient, setBackgroundGradient] = React.useState("linear-gradient(0.10turn,rgb(63,135,166),rgb(235,248,225),rgb(246,157,60))")
  const [gradientClock, setGradientClock] = React.useState(0)
  const [color1Direction, setColor1Direction] = React.useState(true)
  const [color2Direction, setColor2Direction] = React.useState(false)
  const [color3Direction, setColor3Direction] = React.useState(true)

  // Function take in a string and return all occcurences of rgb(x,x,x)
  function rgbFinder(str) {
    let arr = []
    let start = 0
    let end = 0
    let rgb = ''
    while(start !== -1) {
      start = str.indexOf('rgb(', end)
      if(start !== -1) {
        end = str.indexOf(')', start)
        rgb = str.slice(start, end+1)
        arr.push(rgb)
      }
    }
    return arr
  }

  //  Animation For Gradient
  React.useEffect(() => {
    if(props.backgroundType === 'gradient') {
      const interval = setInterval(() => {
        let angle, colorArr
        
        // Configure Color
        colorArr = rgbFinder(backgroundGradient)
        
        // Configure Color 1
        colorArr[0] = colorArr[0].slice(4,colorArr[0].length-1).split(',')
        if(gradientClock % 3 === 0) {
          colorArr[0][2] = (parseInt(colorArr[0][2])+(color1Direction?-1:1)).toString()
          if(parseInt(colorArr[0][2]) % 255 === 0) {
            setColor1Direction(!color1Direction)
          }
        }
        colorArr[0] = `rgb(${colorArr[0].join(',')})`

        // Configure Color 2
        colorArr[1] = colorArr[1].slice(4,colorArr[1].length-1).split(',')
        if(gradientClock % 2 === 0) {
          colorArr[1][1] = (parseInt(colorArr[1][1])+(color2Direction?-1:1)).toString()
          if(parseInt(colorArr[1][1]) % 255 === 0 || parseInt(colorArr[1][1]) < 200) {
            setColor2Direction(!color2Direction)
          }
        }
        colorArr[1] = `rgb(${colorArr[1].join(',')})`

        // Configure Color 3
        colorArr[2] = colorArr[2].slice(4,colorArr[2].length-1).split(',')
        colorArr[2][0] = (parseInt(colorArr[2][0])+(color2Direction?-1:1)).toString()
        if(parseInt(colorArr[2][0]) % 255 === 0) {
          setColor3Direction(!color3Direction)
        }
        colorArr[2] = `rgb(${colorArr[2].join(',')})`

        // Configure Rotation
        angle = backgroundGradient.split(',')
        angle = angle[0].slice(16,angle[0].length - 4)
        angle = ((parseFloat(angle) + 0.001) % 1).toString()

        // Update States
        setBackgroundGradient(`linear-gradient(${angle}turn,${colorArr[0]},${colorArr[1]},${colorArr[2]})`)
        setGradientClock(gradientClock=>(gradientClock + 1) % 3)
      }, 200);
  
      return () => clearInterval(interval);
    }
}, [backgroundGradient, props.backgroundType]);

  return(
  <div>
    {props.backgroundType === 'video'? (
      <iframe 
        width='100vw'
        height='100vh'
        src={props.currURL+'?enablejsapi=1&autoplay=1&rel=0'}
        // src={`https://www.youtube.com/embed/${currURL}`}
        title="YouTube video player"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; enablejsapi; rel;" 
        allowfullscreen
        style={{position:"fixed", marginLeft:'-50vw', marginTop:'-50vh'}}
      />
    ):null}
    {props.backgroundType === 'gradient'? (
      <div style={{position:"fixed", marginLeft:'-50vw', marginTop:'-50vh', width:'100vw', height:'100vh', background: backgroundGradient}}/>
    ): null}
  </div>
  )
}