import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  Divider,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const SearchForm: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmitForm = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (searchValue) navigate('/search', { state: searchValue });
  };

  return (
    <>
      <form onSubmit={onSubmitForm} className="search__form">
        <FormControl sx={{ width: '25ch' }} variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">{t('Search')}</InputLabel>
          <OutlinedInput
            onChange={(ev) => setSearchValue(ev.target.value)}
            value={searchValue}
            endAdornment={
              <InputAdornment position="end">
                {searchValue && (
                  <>
                    <IconButton onClick={() => setSearchValue('')}>
                      <ClearIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  </>
                )}
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label={t('Search')}
          />
        </FormControl>
      </form>
    </>
  );
};
