import React from "react";
import { useStaticQuery, graphql} from "gatsby";

// My Verision of markdown
/*

Large = #
Mid = ##
Small = ###
images = []
bullet = *
*/

export default function ParseMarkdown(props) {
  // const imageData = useStaticQuery(graphql` {
  //   allFile(filter: {sourceInstanceName: {eq: "portfolio"}, extension: {eq: "png"}}) {
  //     edges {
  //       node {
  //         childrenImageSharp {
  //           fluid {
  //             src
  //           }
  //         }
  //         relativePath
  //       }
  //     }
  //   }
  // }`).allFile.edges

  const Large = (props) => {
    return(
      <h1>{props.data}</h1>
    )
  }
  const Mid = (props) => {
    return(
      <h2>{props.data}</h2>
    )
  }
  const Small = (props) => {
    return(
      <h4>{props.data}</h4>
    )
  }
  const Bullet = (props) => {
    return(
      <ul>
        <li>{props.data}</li>
      </ul>
    )
  }
  
  return(
    <>
      {props.data.map((val,key)=>{
        var parsed = val.split(" ")
        while(parsed[0] === "") {
          parsed.shift()
        }
        // console.log("parsed", parsed)
        if(parsed[0] === "#") {
          parsed.shift()
          return(<Large data={parsed.join(" ")}/>)
        }
        else if(parsed[0] === "##") {
          parsed.shift()
          return(<Mid data={parsed.join(" ")}/>)
        }
        else if(parsed[0] === "###") {
          parsed.shift()
          return(<Small data={parsed.join(" ")}/>)
        }
        else if(parsed[0] === "*") {
          parsed.shift()
          return(<Bullet data={parsed.join(" ")}/>)
        }
        else if(parsed[0] === "[]") {
          parsed.shift()
          // console.log("new image", props.path+parsed[0])
          console.log("new data", imageData)
          console.log(parsed)
          // for(var i=0;i<imageData.length;i++) {
          //   if(imageData[i].node.relativePath === parsed[0]) {
          //     return(<img src={imageData[i].node.childrenImageSharp[0].fluid.src} alt="photo" key={i}/>)
          //   }
          // }
        }
        else {
          return(<p>{parsed.join(" ")}</p>)
        }
      })}
    </>
  )
}