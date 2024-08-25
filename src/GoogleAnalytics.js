import ReactGA from 'react-ga4';

export const initGA = (trackingId) => {
  ReactGA.initialize(trackingId);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};