const wallPadding = 5
const pxStep = 10

export function organizeCardPositions(currData) {
  let done = false
  while(!done) {
    done = true
    // console.log('Cycle')
    for(let i=0; i < currData.length-1; i++) {
      for(let j=i+1; j<currData.length; j++) {
        if(currData[i].windowType !== 'delete' && currData[j].windowType !== 'delete') {
          // Check for overlap
          if(areBoxesOverlapping(currData[i].windowPosition.x,currData[i].windowPosition.y,currData[i].windowSize.w,currData[i].windowSize.h,
            currData[j].windowPosition.x,currData[j].windowPosition.y,currData[j].windowSize.w,currData[j].windowSize.h)) {
            // console.log(currData[i].windowType, "touching", currData[j].windowType)
  
            // Object J Not Touching wall?
            if(!onWall(currData[j].windowPosition.x,currData[j].windowPosition.y,currData[j].windowSize.w,currData[j].windowSize.h)) {
              currData[j].windowPosition.x += currData[j].windowPosition.x > currData[i].windowPosition.x ? pxStep:-pxStep
              currData[j].windowPosition.y += currData[j].windowPosition.y > currData[i].windowPosition.y ? pxStep:-pxStep
            }
  
            // Object I Not Touching Wall
            if(!onWall(currData[i].windowPosition.x,currData[i].windowPosition.y,currData[i].windowSize.w,currData[i].windowSize.h)) {
              currData[i].windowPosition.x += currData[i].windowPosition.x > currData[j].windowPosition.x ? pxStep:-pxStep
              currData[i].windowPosition.y += currData[i].windowPosition.y > currData[j].windowPosition.y ? pxStep:-pxStep
            }

            return currData
            done = false
          }
        }
      }
    }
  }

  return currData
}


function onWall(x,y,w,h) {
  if(x < 0) {
    x = x * -1
  }
  if(y < 0) {
    y = y * -1
  }
  if(((window.innerWidth-wallPadding)/2 >= (x + (w/2))) || ((window.innerHeight-wallPadding)/2 >= (y + (h/2)))) {
    return true
  }
  return false
}

// Function to check if rectangle overlap
function areBoxesOverlapping(x1, y1, x2, y2, w1, h1, w2, h2) {
  // Calculate box1 coordinates
  const x1Start = x1 - w1 / 2;
  const x1End = x1 + w1 / 2;
  const y1Start = y1 - h1 / 2;
  const y1End = y1 + h1 / 2;

  // Calculate box2 coordinates
  const x2Start = x2 - w2 / 2;
  const x2End = x2 + w2 / 2;
  const y2Start = y2 - h2 / 2;
  const y2End = y2 + h2 / 2;

  // Check for overlap in both X and Y directions
  const xOverlap = x1End > x2Start && x1Start < x2End;
  const yOverlap = y1End > y2Start && y1Start < y2End;

  // Return true if there is overlap in both X and Y directions
  return xOverlap && yOverlap;
}
