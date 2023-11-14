import Box from '@mui/material/Box';
import * as React from 'react';

<style>.control-panel {}</style>;

function ControlPanel() {
  return (
    <Box
      className="control-panel"
      sx={{
        position: 'absolute',
        top: '0',
        right: '0',
        maxWidth: 320,
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        padding: '12px 24px',
        margin: '20px',
        fontSize: '13px',
        lineHeight: '2',
        color: '#6b6b76',
        textTransform: 'uppercase',
        outline: 'none',
      }}
    >
      <h3>Marker, Popup, NavigationControl and FullscreenControl </h3>
      <p>
        Map showing top 20 most populated cities of the United States. Click on a marker to learn
        more.
      </p>
      <p>
        Data source:{' '}
        <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">
          Wikipedia
        </a>
      </p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.1-release/examples/controls"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </Box>
  );
}

export default React.memo(ControlPanel);
