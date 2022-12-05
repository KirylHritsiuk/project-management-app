import { GetColumnType, TaskType } from '../../types/types';
import { DraggableLocation } from './react-beautiful-dnd';

type TypeMap = {
  columnTasks: GetColumnType[];
  source: DraggableLocation;
  destination: DraggableLocation;
  value: number;
};

export const reorder = (list: GetColumnType[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const reorderTask = (list: TaskType[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const reorderQuoteMap = ({ columnTasks, source, destination, value }: TypeMap) => {
  if (source.droppableId === destination.droppableId) {
    const reordered = reorderTask(columnTasks[value].items, source.index, destination.index);
    const newCol = columnTasks.map((col, index) =>
      index === value ? { ...col, items: reordered } : col
    );
    return newCol;
  } else {
    const fromCol = Number(source.droppableId.slice(-1));
    const toCol = Number(destination.droppableId.slice(-1));
    const colId = destination.droppableId.slice(9, 33);
    const target = columnTasks[fromCol].items.filter((i, index) => source.index === index);
    const newCol1 = columnTasks[fromCol].items.filter((i, index) => source.index !== index);
    const updateTask = { ...target[0] };
    updateTask.columnId = colId;
    const addArr = [...columnTasks[toCol].items];
    (addArr as TaskType[]).splice(destination.index, 0, updateTask);
    const newResult = columnTasks.map((col, index) => {
      if (index === fromCol) return { ...col, items: newCol1 };
      if (index === toCol) return { ...col, items: addArr };
      return col;
    });
    return newResult;
  }
};
