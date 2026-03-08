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
  theme: 'graphite',
  auth: {
    entra: {
      enabled: true,
      clientId: '7ac0399a-d8ef-420f-b07e-65fb9a8de912',
      authority: 'https://login.microsoftonline.com/df4fe0d4-9f04-4365-94d1-90b5ff952725',
      redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/login` : '/login'
    }
  }
};
