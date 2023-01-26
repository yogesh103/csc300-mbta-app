import * as dayjs from 'dayjs';
import React from 'react';
import { Alert, Badge } from 'react-bootstrap';


const getAlertEffects = (alerts) => {
    return alerts.reduce((unique, item) => {
        return unique.includes(item.attributes.effect) ? unique : [...unique, item.attributes.effect];
    }, []);
};

const getAlertsByEffect = (alerts, effect) => {
    return alerts.filter(alert => alert.attributes.effect === effect);
}

const getAlertColorBySeverity = (severity) => {
    return severity > 7 ? 'danger' : severity > 5 ? 'warning' : 'info';
}

const MbtaAlerts = ({ alerts }) => {
    return (
        //get all the alerts by effect type 
        // segregate them by alert type and then display them with the group of alerts
        <div className="container">
            <h1>
                <Badge bg="danger">Current Alerts : {alerts.length}</Badge>
            </h1>
            <>
                {
                    getAlertEffects(alerts).map(effect =>
                        <>
                            <div className="container">

                                <div className="row">
                                    <h3 key={effect}><Badge bg="secondary"> {effect.replace('_', ' ')}</Badge> </h3>
                                    {
                                        getAlertsByEffect(alerts, effect).map(alert => (
                                            <Alert key={alert.id} variant={getAlertColorBySeverity(alert.attributes.severity)}>
                                                <Alert.Heading>{alert.attributes.service_effect}</Alert.Heading>
                                                <p>
                                                    {alert.attributes.header}
                                                </p>
                                                <hr />
                                                <p className="mb-0">
                                                    <Badge pill bg="info">
                                                        {alert.attributes.lifecycle}
                                                    </Badge>
                                                </p>
                                                <p className="mb-0">First Reported : {dayjs(alert.attributes.created_at).format('MMMM D, YYYY h:mm A')}    </p>
                                                <p className="mb-0">Last Updated : {dayjs(alert.attributes.updated_at).format('MMMM D, YYYY h:mm A')} </p>


                                            </Alert>
                                        ))
                                    }
                                </div>
                            </div>
                        </>

                    )

                }
            </>
        </div>
    );
};

export default MbtaAlerts;