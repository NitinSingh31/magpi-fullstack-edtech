import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api.js';

const MediaContext = createContext({
  mediaMap: {},
  mediaItems: [],
  loading: false,
  getMedia: (key, fallback) => fallback,
  refreshMedia: async () => {},
  updateMedia: async () => {},
  resetMedia: async () => {}
});

const CACHE_KEY = 'magpi_site_media_cache';

export function MediaProvider({ children }) {
  const [mediaMap, setMediaMap] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch (_) {
      return {};
    }
  });

  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getSiteMedia();
      if (res && res.success) {
        if (res.map) {
          setMediaMap(res.map);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(res.map));
          } catch (_) {}
        }
        if (Array.isArray(res.items)) {
          setMediaItems(res.items);
        }
      }
    } catch (err) {
      console.warn('[MediaContext] Could not load dynamic media, using fallbacks:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMedia();
  }, [refreshMedia]);

  const getMedia = useCallback((key, fallback) => {
    if (mediaMap && mediaMap[key]) {
      return mediaMap[key];
    }
    return fallback;
  }, [mediaMap]);

  const updateMedia = async (key, imageUrl) => {
    const res = await api.updateSiteMedia(key, imageUrl);
    if (res && res.success && res.data) {
      const newActiveUrl = res.data.activeUrl;
      setMediaMap(prev => {
        const next = { ...prev, [key]: newActiveUrl };
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(next));
        } catch (_) {}
        return next;
      });
      setMediaItems(prev => prev.map(item => {
        if (item.key === key) {
          return {
            ...item,
            imageUrl: res.data.imageUrl,
            activeUrl: newActiveUrl,
            isCustom: Boolean(res.data.imageUrl),
            updatedAt: res.data.updatedAt
          };
        }
        return item;
      }));
    }
    return res;
  };

  const resetMedia = async (key) => {
    const res = await api.resetSiteMedia(key);
    if (res && res.success && res.data) {
      const defaultUrl = res.data.defaultUrl;
      setMediaMap(prev => {
        const next = { ...prev, [key]: defaultUrl };
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(next));
        } catch (_) {}
        return next;
      });
      setMediaItems(prev => prev.map(item => {
        if (item.key === key) {
          return {
            ...item,
            imageUrl: '',
            activeUrl: defaultUrl,
            isCustom: false,
            updatedAt: res.data.updatedAt
          };
        }
        return item;
      }));
    }
    return res;
  };

  return (
    <MediaContext.Provider value={{
      mediaMap,
      mediaItems,
      loading,
      getMedia,
      refreshMedia,
      updateMedia,
      resetMedia
    }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useSiteMedia() {
  return useContext(MediaContext);
}
