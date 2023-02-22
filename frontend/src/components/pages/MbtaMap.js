import Map from './Map';

const MbtaMap = () => {
  const [routeId, setRouteId] = useState("route_id");

  return (
    <div>
      <Map routeId={routeId} />
    </div>
  );
};

export default MbtaMap;
