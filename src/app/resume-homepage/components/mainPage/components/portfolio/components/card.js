import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleOnClick = () => {
    var newData = props.data.node.frontmatter.currData.split("\n")
    // [props.data.node.frontmatter.title]
    console.log(newData)
    
    props.update(newData)
    props.newTitle(props.data.node.frontmatter.title)
    props.updatePath(props.data.node.frontmatter.path)
    props.updateData(props.data.node.frontmatter.title)
    setOpen(true);
    
  };

  return (
    <>
      <Card sx={{ maxWidth: "82vw", height: 275}} onClick={handleOnClick}>
        <CardMedia
          sx={{width:"100%", height: '50%', objectFit: 'fill'}}
          component="img"
          alt="green iguana"
          image={props.data.node.frontmatter.cover.childImageSharp.fluid.src}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.node.frontmatter.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.node.frontmatter.excerpt}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}