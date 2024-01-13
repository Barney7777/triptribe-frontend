import React, { FC, useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Box, Card, CardMedia, Link, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const DEFAULT_THUMBNAIL_LIMIT = 5;
const IMAGE_MAX_HEIGHT = '960px';
const IMAGE_MAX_WIDTH = '1280px';
interface GalleryProps {
  galleryID: string;
  images: { thumbnailURL: string; originalURL: string }[];
}

const Gallery: FC<GalleryProps> = ({ galleryID, images }) => {
  const imageCount = images.length;

  // if imageCount > thumbnailLimitDefault, thumbnailLimit means it will show (thumbnailLimit-1) thumbnail plus one button that shows how many images left

  const thumbnailLimit =
    imageCount > DEFAULT_THUMBNAIL_LIMIT ? DEFAULT_THUMBNAIL_LIMIT : imageCount;

  // photoswipe
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
      data-testid="gallery-box"
    >
      {/* show (thumbnailLimit-1) of thumbnails */}
      {images.slice(0, thumbnailLimit - 1).map((image, index) => (
        <Link
          href={image.originalURL}
          key={galleryID + '-' + index}
          target="_blank"
          rel="noreferrer"
          data-pswp-width={IMAGE_MAX_WIDTH}
          data-pswp-height={IMAGE_MAX_HEIGHT}
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

      {/* the last thumbnail shows the text of how many images left */}
      <Link
        href={images[thumbnailLimit - 1].originalURL}
        key={galleryID + '-' + (thumbnailLimit - 1)}
        target="_blank"
        rel="noreferrer"
        data-pswp-width={IMAGE_MAX_WIDTH}
        data-pswp-height={IMAGE_MAX_HEIGHT}
      >
        <Card
          key={thumbnailLimit - 1}
          elevation={0}
          sx={{
            position: 'relative',
            height: '40px',
            width: '40px',
            mr: 0.5,
            bgcolor: grey[200],
          }}
        >
          <Typography
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            color="text.secondary"
            fontSize="12px"
          >
            + {imageCount - thumbnailLimit + 1}
          </Typography>
        </Card>
      </Link>

      {/* imageCount > thumbnailLimit, map the rest of images without thumbnails */}
      {imageCount > thumbnailLimit &&
        images.slice(thumbnailLimit, imageCount).map((image, index) => (
          <Link
            href={image.originalURL}
            key={galleryID + '-' + index}
            target="_blank"
            rel="noreferrer"
            data-pswp-width={IMAGE_MAX_WIDTH}
            data-pswp-height={IMAGE_MAX_HEIGHT}
          ></Link>
        ))}
    </Box>
  );
};

export default Gallery;
