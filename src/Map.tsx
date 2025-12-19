import { DeckGL } from '@deck.gl/react';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';

// Dallas, Texas coordinates
const INITIAL_VIEW_STATE = {
  longitude: -96.7970,
  latitude: 32.7767,
  zoom: 11,
  pitch: 0,
  bearing: 0
};

export const Map = () => {

  // Use OpenStreetMap tiles as the base layer
  const layers = [
    new TileLayer({
      id:'tiles',
      data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,
      renderSubLayers: (props: {
        id: string;
        data: ImageBitmap;
        tile: {
          boundingBox: number[][];
        };
      }) => {
        const { tile, data } = props;
        if (!tile || !data) return null;

        const { boundingBox } = tile;
        return new BitmapLayer({
          ...props,
          data: undefined,
          image: data,
          bounds: [boundingBox[0][0], boundingBox[0][1], boundingBox[1][0], boundingBox[1][1]],
        });
      },
    })
  ];




  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      />
    </div>
  );
}