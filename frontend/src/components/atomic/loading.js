import loading from '../lottie/loading.json';
import React from 'react';
import Lottie from 'lottie-react';

function Loading() {
    return <Lottie animationData={loading} height="100%" width="100%" loop="true" />;
}

export default Loading;