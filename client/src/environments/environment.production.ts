// Trigger redeployment: dummy change (client)
const resolveApiUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
      return 'http://localhost:5014';
    }
  }
  return 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
};

export const environment = {
  production: true,
  useMockApi: false,
  apiUrl: resolveApiUrl(),
  envLabel: 'PROD',
  theme: 'graphite'
};
