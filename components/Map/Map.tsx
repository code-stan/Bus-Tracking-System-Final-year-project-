import MapBoxMap from "./MapBoxMap";

interface MapComponentProps {
  fromAddress?: string;
  toAddress?: string;
}

const MapComponent = ({ fromAddress, toAddress }: MapComponentProps) => {

  return (
    <div className="col-span-2">
      <h2 className='text-xl font-semibold'>Map</h2>
      <MapBoxMap/>
    </div>
  );
};

export default MapComponent;