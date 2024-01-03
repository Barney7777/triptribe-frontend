import React, { FC, useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { Box, Card, CardMedia, Link, Typography } from '@mui/material';

interface GalleryProps {
  galleryID: string;
  images: { thumbnailURL: string; originalURL: string }[];
}

const Gallery: FC<GalleryProps> = ({ galleryID, images }) => {
  const imageCount = images.length;
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      spacing: 0,
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <Box
      className="pswp-gallery"
      id={galleryID}
      sx={{ display: 'flex', justifyContent: 'flex-start' }}
    >
      {images.slice(0, imageCount - 1).map((image, index) => (
        <Link
          href={image.originalURL}
          key={galleryID + '-' + index}
          target="_blank"
          rel="noreferrer"
          data-pswp-width="1000px"
          data-pswp-height="1000x"
        >
          <Card
            key={index}
            elevation={0}
            sx={{
              height: '40px',
              width: '40px',
              mr: 0.5,
            }}
          >
            <CardMedia
              image={image.thumbnailURL}
              sx={{ height: '100%' }}
            />
          </Card>
        </Link>
      ))}
      <Link
        href={images[imageCount - 1].originalURL}
        key={galleryID + '-' + (imageCount - 1)}
        target="_blank"
        rel="noreferrer"
        data-pswp-width="1000px"
        data-pswp-height="1000px"
      >
        <Card
          key={imageCount - 1}
          elevation={0}
          sx={{
            position: 'relative',
            height: '40px',
            width: '40px',
            mr: 0.5,
            bgcolor: 'white',
          }}
        >
          <Typography
            sx={{ position: 'absolute', top: '30%', left: '25% ' }}
            color="text.secondary"
            fontSize="12px"
          >
            + {imageCount - 4}
          </Typography>
        </Card>
      </Link>
    </Box>
  );
};

export default Gallery;
