import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

export const useAuth = () => {
  const authStore = useAuthStore();
  const { user, loading, error, isAuthenticated } = storeToRefs(authStore);

  const login = async (email: string, password: string) => {
    return await authStore.login(email, password);
  };

  const logout = () => {
    authStore.logout();
  };

  const clearError = () => {
    authStore.clearError();
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError
  };
};
