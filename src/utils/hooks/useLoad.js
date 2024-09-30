import { useEffect } from 'react';
import { useModifiers } from 'context/ModifierContext';
import { useUserContext } from 'context/UserContext';
import { useUserSettings } from 'context/UserSettingsContext';
import { useItems } from 'context/ItemsContext';

const useLoad = (isAuthenticated) => {
  const { setPageModifiers } = useModifiers();
  const { setItems } = useItems();
  const { fetchCurrentUser } = useUserSettings();
  const { setAppearance, setColorScheme, setLabel } = useUserContext();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const settings = await fetchCurrentUser();
        setPageModifiers(settings.pageModifiers || { active: 'Total' })
        setItems( settings.itemArray || [])
        setLabel( settings.label || 'always');
        setAppearance( settings.appearance || 'dark');
        setColorScheme( settings.colorScheme || 'Tranquil');
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    if (isAuthenticated) loadUser();
    //eslint-disable-next-line
  }, []);
};

export default useLoad;
