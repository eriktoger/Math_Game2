/* tslint:disable */
/* eslint-disable */
/**
* @param {any} addition
* @returns {any}
*/
export function generate_addition(addition: any): any;
/**
* @param {any} subtraction
* @returns {any}
*/
export function generate_subtraction(subtraction: any): any;
/**
* @param {any} multiplication
* @returns {any}
*/
export function generate_multiplication(multiplication: any): any;
/**
* @param {any} division
* @returns {any}
*/
export function generate_division(division: any): any;
/**
* @returns {any}
*/
export function generate_order(): any;
/**
*/
export class Operation {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_operation_free: (a: number) => void;
  readonly generate_addition: (a: number) => number;
  readonly generate_subtraction: (a: number) => number;
  readonly generate_multiplication: (a: number) => number;
  readonly generate_division: (a: number) => number;
  readonly generate_order: () => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
