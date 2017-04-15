import {GET_CONFIG_DONE, GET_CONFIG_FAILED, GET_CONFIG_REQUESTED} from './const';

export function getConfigRequested() {
  return {
    type: GET_CONFIG_REQUESTED
  };
}

export function getConfigDone(data) {
  return {
    type: GET_CONFIG_DONE,
    payload: data
  };
}

export function getConfigFailed(error) {
  return {
    type: GET_CONFIG_FAILED,
    payload: error
  };
}

