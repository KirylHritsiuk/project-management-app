import { IconButton, MenuItem, Popover } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC, useState } from 'react';
import { Edit } from '../Modals/Edit';
import { BoarderMenuProps } from './BoarderMenu.props';
import { Delete } from 'components';

export const BoarderMenu: FC<BoarderMenuProps> = ({ data, className }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isDelete, setDelete] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={className}>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <IconButton aria-label="edit" onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton aria-label="delete" onClick={() => setDelete(true)}>
            <DeleteIcon />
          </IconButton>
        </MenuItem>
      </Popover>
      <Edit visible={isEdit} setModal={setEdit} data={data} />
      <Delete category="board" visible={isDelete} setModal={setDelete} id={{ boardId: data._id }} />
    </div>
  );
};
