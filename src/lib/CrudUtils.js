import * as actions from '../actions/crud';
import { select } from 'redux-crud-store';

export function selectEntity(models, modelName, id) {
  return select(actions.fetchEntity(modelName, id), models);
}

export function selectCollection(models, modelName, parentField, parentId) {
  const hasParent = typeof parentField !== 'undefined';
  let opts = {};
  if (hasParent) {
    opts[parentField] = parentId;
  }

  return select(actions.fetchEntities(modelName, opts), models);
}

export function fetchNeeds(dispatch, models) {
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    if (model && model.needsFetch) {
      dispatch(model.fetch);
    }
  }
}

export function isSomeLoadings(models) {
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    if (model && model.isLoading) {
      return true;
    }
  }
  return false;
}
