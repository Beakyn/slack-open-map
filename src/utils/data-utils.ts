// // import {ALL_FIELD_TYPES} from 'constants/default-settings';

// const identity = (d) => d;

// // export const FIELD_DISPLAY_FORMAT = {
// //   [ALL_FIELD_TYPES.string]: identity,
// //   [ALL_FIELD_TYPES.timestamp]: identity,
// //   [ALL_FIELD_TYPES.integer]: identity,
// //   [ALL_FIELD_TYPES.real]: identity,
// //   [ALL_FIELD_TYPES.boolean]: (d) => String(d),
// //   [ALL_FIELD_TYPES.date]: identity,
// //   [ALL_FIELD_TYPES.geojson]: (d) =>
// //     typeof d === 'string'
// //       ? d
// //       : isPlainObject(d)
// //       ? JSON.stringify(d)
// //       : Array.isArray(d)
// //       ? `[${String(d)}]`
// //       : '',
// // };

// export function getSampleData(data, sampleSize = 500, getValue = (d) => d) {
//   const sampleStep = Math.max(Math.floor(data.length / sampleSize), 1);
//   const output = [];
//   for (let i = 0; i < data.length; i += sampleStep) {
//     output.push(getValue(data[i]));
//   }

//   return output;
// }

// /**
//  * whether null or undefined
//  * @returns {boolean} - yes or no
//  */
// export function notNullorUndefined(d) {
//   return d !== undefined && d !== null;
// }

// export function isPlainObject(obj) {
//   return obj === Object(obj) && typeof obj !== 'function' && !Array.isArray(obj);
// }

// /**
//  * Parse field value and type and return a string representation
//  * @param {string} value the field value
//  * @param {string} type the field type
//  * @return {*}
//  */
// // export const parseFieldValue = (value, type) => {
// //   if (!notNullorUndefined(value)) {
// //     return '';
// //   }

// //   return FIELD_DISPLAY_FORMAT[type] ? FIELD_DISPLAY_FORMAT[type](value) : String(value);
// // };
