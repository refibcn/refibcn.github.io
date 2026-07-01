// src/lib/catalunya-projection.ts
// Mirrors the projection from refi-bcn-os v0/render.js so that any future
// shared map work (Phase 3 actor port) stays consistent.
import { geoMercator, type GeoProjection } from "d3";

export interface ProjectionConfig {
  width: number;
  height: number;
  center: [number, number];   // [lng, lat]
  scale: number;
}

export const CATALUNYA_DEFAULT: ProjectionConfig = {
  width: 1400,
  height: 900,
  center: [1.7, 41.85],
  scale: 7000,
};

// L'Hospitalet sub-zoom: a smaller map drawn in the corner showing that metro area only.
// Width/height sized to roughly 240×160 (aspect 3:2) rendered at the bottom-right of the inset.
export const LHOSPITALET_SUBZOOM: ProjectionConfig = {
  width: 240,
  height: 160,
  center: [2.10, 41.36],
  scale: 90000,
};

export function makeProjection(cfg: ProjectionConfig): GeoProjection {
  return geoMercator()
    .center(cfg.center)
    .scale(cfg.scale)
    .translate([cfg.width / 2, cfg.height / 2]);
}

export interface MarkerInput {
  id: string;
  lat: number;
  lng: number;
}

export interface PlacedMarker extends MarkerInput {
  x: number;
  y: number;
}

export function placeMarkers(markers: MarkerInput[], projection: GeoProjection): PlacedMarker[] {
  return markers.map((m) => {
    const projected = projection([m.lng, m.lat]);
    if (!projected) return { ...m, x: 0, y: 0 };
    return { ...m, x: projected[0], y: projected[1] };
  });
}
