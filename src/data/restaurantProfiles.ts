import { RestaurantProfile } from '../types/restaurant';
import { darElDjazairProfile } from '../config/restaurants/darElDjazair';
import { elBahiaOranProfile } from '../config/restaurants/elBahiaOran';

export const DAR_EL_DJAZAIR_PROFILE: RestaurantProfile = darElDjazairProfile;
export const EL_BAHIA_ORAN_PROFILE: RestaurantProfile = elBahiaOranProfile;

/**
 * List of all available restaurant profiles for the multi-restaurant switcher
 */
export const RESTAURANT_PROFILES: RestaurantProfile[] = [
  DAR_EL_DJAZAIR_PROFILE,
  EL_BAHIA_ORAN_PROFILE,
];

export const AVAILABLE_RESTAURANTS = RESTAURANT_PROFILES;

/**
 * Helper to get a restaurant profile by id with fallback
 */
export function getRestaurantById(id: string): RestaurantProfile {
  const profile = RESTAURANT_PROFILES.find((p) => p.id === id);
  if (!profile) {
    console.warn(`Restaurant profile with id "${id}" not found. Falling back to Dar El Djazaïr.`);
    return DAR_EL_DJAZAIR_PROFILE;
  }
  return profile;
}
