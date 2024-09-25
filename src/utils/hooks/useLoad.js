import { useEffect } from 'react';
import { useDashboardContext } from 'context/DashboardContext';
import { useUserContext } from 'context/UserContext';
import { useUserSettings } from 'context/UserSettingsContext';

const useLoad = (isAuthenticated) => {
  const { setSmartSort, onLoad } = useDashboardContext();
  const { fetchCurrentUser } = useUserSettings();
  const { setAppearance, setColorScheme, setLabel } = useUserContext();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const settings = await fetchCurrentUser();
        onLoad(
          settings.itemArray || [],
          settings.itemModifiers || [],
          settings.pageModifiers || { active: 'Total' }
        );
        setLabel(settings.label || 'always');
        setAppearance(settings.appearance || 'dark');
        setColorScheme(settings.colorScheme || 'Tranquil');
        setSmartSort(settings.smartSort || 'false');
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    if (isAuthenticated) loadUser();
    //eslint-disable-next-line
  }, []);
};

export default useLoad;
