import React, { useState, useEffect } from 'react';
import MbtaAlerts from '../../components/MbtaAlerts';
import axios from 'axios';
const url = 'http://localhost:9000/alerts'

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);

  const getAlerts = async () => {
    const { data } = await axios.get(url);
    return data;
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAlerts();
      setAlerts(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <MbtaAlerts alerts={alerts} />
    </div>
  );
};

export default AlertsPage;