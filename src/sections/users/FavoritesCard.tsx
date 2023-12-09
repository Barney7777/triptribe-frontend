import { Card, Container } from '@mui/material';
import CardTheme from './components/CardTheme';

export const FavoritesCard = () => {
  return (
    <Container>
      <Card sx={{ bgcolor: CardTheme.bgColor }}></Card>
    </Container>
  );
};
