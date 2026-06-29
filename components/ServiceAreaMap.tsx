"use client";

import { Fragment } from "react";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Editable — service area polygons and label anchor points
const AREAS: {
  name: string;
  color: string;
  coords: [number, number][];
  labelPos: [number, number];
}[] = [
  {
    name: "Alief",
    color: "#6B5B9E",
    coords: [
      [29.735, -95.650],
      [29.735, -95.555],
      [29.683, -95.555],
      [29.683, -95.650],
    ],
    labelPos: [29.709, -95.602],
  },
  {
    name: "Sugar Land",
    color: "#6B5B9E",
    coords: [
      [29.670, -95.740],
      [29.670, -95.575],
      [29.557, -95.575],
      [29.557, -95.740],
    ],
    labelPos: [29.614, -95.658],
  },
  {
    name: "Richmond",
    color: "#5BA89A",
    coords: [
      [29.602, -95.800],
      [29.602, -95.735],
      [29.558, -95.735],
      [29.558, -95.800],
    ],
    labelPos: [29.580, -95.768],
  },
  {
    // Missouri City sits east of Sugar Land; Stafford is a small city inside it
    name: "Missouri City",
    color: "#6B5B9E",
    coords: [
      [29.660, -95.575],
      [29.660, -95.470],
      [29.545, -95.470],
      [29.545, -95.575],
    ],
    labelPos: [29.558, -95.520], // anchored in south portion, clear of Stafford label
  },
  {
    name: "Stafford",
    color: "#5BA89A",
    coords: [
      [29.638, -95.574],
      [29.638, -95.527],
      [29.598, -95.527],
      [29.598, -95.574],
    ],
    labelPos: [29.628, -95.550], // anchored in upper portion of Stafford box
  },
];

function makeLabel(name: string, color: string) {
  return L.divIcon({
    className: "",
    // translate(-50%,-50%) keeps the text centred on labelPos
    html: `<div style="
      transform: translate(-50%, -50%);
      display: inline-block;
      background: rgba(255,255,255,0.92);
      border: 2px solid ${color};
      border-radius: 4px;
      padding: 2px 7px;
      font-size: 11px;
      font-weight: 700;
      color: ${color};
      white-space: nowrap;
      box-shadow: 0 1px 4px rgba(0,0,0,0.18);
      pointer-events: none;
    ">${name}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export default function ServiceAreaMap() {
  return (
    <MapContainer
      center={[29.615, -95.630]}
      zoom={10}
      style={{ height: "420px", width: "100%" }}
      scrollWheelZoom={false}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {AREAS.map((area) => (
        <Fragment key={area.name}>
          <Polygon
            positions={area.coords}
            pathOptions={{
              color: area.color,
              weight: 2.5,
              dashArray: "8 6",
              fillColor: area.color,
              fillOpacity: 0.15,
            }}
          />
          <Marker
            position={area.labelPos}
            icon={makeLabel(area.name, area.color)}
            interactive={false}
          />
        </Fragment>
      ))}
    </MapContainer>
  );
}
