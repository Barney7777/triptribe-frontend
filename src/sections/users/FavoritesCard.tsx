import {
  Card,
  CardMedia,
  CardContent,
  Container,
  Link,
  Rating,
  Grid,
  Typography,
} from '@mui/material';
import CardTheme from './components/CardTheme';

export const FavoritesCard = () => {
  return (
    <Container>
      <Card sx={{ bgcolor: CardTheme.bgColor }}></Card>
    </Container>
  );
};
