import { FC } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

type ViewToggleProps = {
  handleViewToggle: () => void;
  view: boolean;
};

const ViewToggleButton: FC<ViewToggleProps> = ({ handleViewToggle, view }) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={view ? 'listView' : 'cardView'}
      exclusive
      onChange={handleViewToggle}
      sx={{ ml: 2 }}
    >
      <ToggleButton
        value="listView"
        aria-label="list"
      >
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton
        value="cardView"
        aria-label="module"
      >
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggleButton;
