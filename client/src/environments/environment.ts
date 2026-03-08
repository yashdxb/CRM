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
      enabled: true,
      clientId: '7ac0399a-d8ef-420f-b07e-65fb9a8de912',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/login` : '/login'
    }
  }
};

// 
