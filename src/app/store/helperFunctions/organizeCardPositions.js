const wallPadding = 5
const pxStep = 10

export function organizeCardPositions(currData) {
  currData = currData.filter((e)=>e.windowType !== 'delete')
  // Something in the Future
  let maxRows = Math.ceil(Math.sqrt(currData.length))
  let maxCols = Math.ceil(Math.sqrt(currData.length))
  const pxRowSpace = parseInt((window.innerHeight * 0.7) / maxRows)
  let currPxRowSpace = pxRowSpace
  let pxColSpace = parseInt((window.innerHeight * 0.8) / maxCols)
  for(let i=0;i<currData.length;i++) {
    currData[i].windowAnimation = {
      x: parseInt(window.innerWidth * 0.3) + pxColSpace*(i%maxRows) - (window.innerWidth /2),
      y: parseInt(window.innerHeight*-0.1) + currPxRowSpace - (window.innerHeight /2),
      duration:1
    }
    if(i%maxRows === maxRows - 1) {
      currPxRowSpace = currPxRowSpace + pxRowSpace
    }
  }

  return currData
}

function sortArrayOfObjectsByXY(jsonArray) {
  jsonArray.sort((a, b) => {
    if (a.windowPosition.x !== b.windowPosition.x) {
      return a.windowPosition.x - b.windowPosition.x; // Sort by x key
    } else {
      return a.windowPosition.x - b.windowPosition.y; // If x keys are equal, sort by y key
    }
  });

  return jsonArray;
}
