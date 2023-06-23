export function createSelection(event, params) {
  const coordinates = event;
  return {
    start:
      coordinates.start?.[0] ||
      coordinates.yearmonth_start?.[0] ||
      coordinates.yearmonthdate_start?.[0],
    end:
      coordinates.start?.[1] ||
      coordinates.yearmonth_start?.[1] ||
      coordinates.yearmonthdate_start?.[0],
    y: coordinates.y[0],
    y1: coordinates.y[1],
    title: params.title,
    description: params.description,
    createdBy: params.createdBy,
    notes: params.notes,
    id: Date.now(),
    updatedAt: Date.now(),
  };
}

export const createNewNote = function (title, description, createdBy) {
  return {
    title,
    description,
    createdBy,
    id: Date.now(),
  };
};
