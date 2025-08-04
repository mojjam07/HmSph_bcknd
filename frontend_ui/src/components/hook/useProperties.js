// 2. Custom Hook for Properties Data (useProperties.js)
import { useState, useEffect, useCallback } from 'react';
import { propertiesAPI, favoritesAPI } from '../../api';

export const useProperties = (initialFilters = {}, token = null) => {
  const [properties, setProperties] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange || 'all');
  const [searchQuery, setSearchQuery] = useState(initialFilters.searchQuery || '');
  const [selectedPropertyType, setSelectedPropertyType] = useState(initialFilters.propertyType || 'all');

  // Fetch properties from backend
  const fetchProperties = useCallback(async (page = 1, append = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      const filters = {
        priceRange: priceRange !== 'all' ? priceRange : null,
        propertyType: selectedPropertyType !== 'all' ? selectedPropertyType : null,
        search: searchQuery || null,
        page,
        limit: 12,
      };

      const response = await propertiesAPI.getProperties(filters);
      
      if (append) {
        setProperties(prev => [...prev, ...response.data]);
      } else {
        setProperties(response.data);
      }
      
      setHasMore(response.pagination.hasMore);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, [priceRange, selectedPropertyType, searchQuery]);

  // Load more properties
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchProperties(currentPage + 1, true);
    }
  }, [hasMore, loading, currentPage, fetchProperties]);

  // Fetch favorites
  const fetchFavorites = useCallback(async () => {
    // Only fetch favorites if user is authenticated
    if (!token) {
      setFavorites(new Set());
      return;
    }
    
    try {
      const response = await favoritesAPI.getFavorites();
      setFavorites(new Set(response.data.map(fav => fav.propertyId)));
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
      setFavorites(new Set()); // Reset favorites on error
    }
  }, [token]);

  // Toggle favorite
  const toggleFavorite = useCallback(async (propertyId) => {
    // Only allow toggling favorites if user is authenticated
    if (!token) {
      setError('Please log in to save favorites');
      return;
    }
    
    const wasFavorite = favorites.has(propertyId);
    
    // Optimistic update
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (wasFavorite) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });

    try {
      if (wasFavorite) {
        await favoritesAPI.removeFromFavorites(propertyId);
      } else {
        await favoritesAPI.addToFavorites(propertyId);
      }
    } catch (err) {
      // Revert optimistic update on error
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (wasFavorite) {
          newFavorites.add(propertyId);
        } else {
          newFavorites.delete(propertyId);
        }
        return newFavorites;
      });
      
      setError('Failed to update favorites');
    }
  }, [favorites, token]);

  // Apply client-side filtering (if needed)
  useEffect(() => {
    setFilteredListings(properties);
  }, [properties]);

  // Fetch data on filter changes
  useEffect(() => {
    fetchProperties(1, false);
  }, [fetchProperties]);

  // Fetch favorites when token changes
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Retry function
  const retry = useCallback(() => {
    fetchProperties(1, false);
  }, [fetchProperties]);

  return {
    properties,
    filteredListings,
    loading,
    error,
    favorites,
    hasMore,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery,
    selectedPropertyType,
    setSelectedPropertyType,
    toggleFavorite,
    loadMore,
    retry,
    refetch: () => fetchProperties(1, false),
  };
};
