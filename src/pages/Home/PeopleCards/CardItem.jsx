import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { HomeworldView } from "../../../components/HomeworldView";

export const CardItem = ({ person }) => {
  const url = `/profile/${person.url?.split("/people/")[1]}`;
  return (
    <Card>
      <CardActionArea>
        <Link to={url}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {person.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              gender: {person.gender}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              homeworld: <HomeworldView homeworld={person.homeworld} />
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};
