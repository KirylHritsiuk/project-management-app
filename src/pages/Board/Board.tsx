import { LinearProgress, Stack, ListItem, Card } from '@mui/material';
import { columnsAPI } from 'api/columnsApi';
import { TaskList } from 'components';
import { useParams } from 'react-router-dom';

export const Board = () => {
  const { id } = useParams();
  const iddd = id ?? '';
  const { data, isLoading, error } = columnsAPI.useGetColumnsQuery({ boardId: iddd });
  return (
    <>
      <h2>Columns {id}</h2>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      <Stack spacing={2} direction="row">
        {data?.map((b) => (
          <ListItem key={b.id}>
            <Card variant="outlined">
              <h3>{b.title}</h3>
              <span>{b.order}</span>
              <TaskList boardId={iddd} columnId={b.id} />
            </Card>
          </ListItem>
        ))}
      </Stack>
    </>
  );
};
