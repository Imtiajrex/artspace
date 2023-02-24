import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (params.id) {
    return params
  }
 
  throw error(404, 'Not found');
}