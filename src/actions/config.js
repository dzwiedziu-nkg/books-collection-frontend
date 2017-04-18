import { LOAD_CONFIG } from './const';

export function loadConfig(configJson) {
  return {
    type: LOAD_CONFIG,
    configJson
  };
}
