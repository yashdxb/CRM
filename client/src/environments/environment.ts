const resolveApiUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
      return 'http://localhost:5014';
    }
  }
  return 'http://localhost:5014';
};

export const environment = {
  production: false,
  useMockApi: false,
  apiUrl: resolveApiUrl(),
  envLabel: 'DEV',
  theme: 'default',
  auth: {
    entra: {
      enabled: false,
      clientId: '',
      authority: 'https://login.microsoftonline.com/organizations',
      redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/login` : '/login'
    }
  }
};

// 
