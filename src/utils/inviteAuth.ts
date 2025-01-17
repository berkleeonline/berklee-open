// utils/auth.ts
export const checkPasswordGate = () => {
  const hasAccess = sessionStorage.getItem('hasAccess');
  const visitorName = sessionStorage.getItem('visitorName');
  return {
    isAuthenticated: hasAccess === 'true',
    visitorName
  };
};
  
export const setPasswordGate = (name: string) => {
  sessionStorage.setItem('hasAccess', 'true');
  sessionStorage.setItem('visitorName', name);
};

export const clearPasswordGate = () => {
  sessionStorage.removeItem('hasAccess');
  sessionStorage.removeItem('visitorName');
};