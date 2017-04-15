import {
  fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord
} from 'redux-crud-store'

export function fetchEntities(model, params = {}) {
  return fetchCollection(model, `/${model}`, params)
}

export function fetchEntity(id, params = {}) {
  return fetchRecord(model, id, `${model}/${id}`, params)
}

export function createEntity(data = {}) {
  return createRecord(model, model, data)
}

export function updateEntity(id, data = {}) {
  return updateRecord(model, id, `${model}/${id}`, data)
}

export function deleteEntity(id) {
  return deleteRecord(model, id, `${model}/${id}`)
}
