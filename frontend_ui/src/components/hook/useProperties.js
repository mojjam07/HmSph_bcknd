// 2. Custom Hook for Properties Data (useProperties.js)
import { useState, useEffect, useCallback } from 'react';
import ApiService from '../../api';

export const useProperties = (initialFilters = {}) => {
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

      const response = await ApiService.getProperties(filters);
      
      if (append) {
        setProperties(prev => [...prev, ...response.data]);
      } else {
        setProperties(response.data);
      }
      
      setHasMore(response.hasMore);
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
    try {
      const response = await ApiService.getFavorites();
      setFavorites(new Set(response.data.map(fav => fav.propertyId)));
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback(async (propertyId) => {
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
        await ApiService.removeFromFavorites(propertyId);
      } else {
        await ApiService.addToFavorites(propertyId);
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
  }, [favorites]);

  // Apply client-side filtering (if needed)
  useEffect(() => {
    setFilteredListings(properties);
  }, [properties]);

  // Fetch data on filter changes
  useEffect(() => {
    fetchProperties(1, false);
  }, [fetchProperties]);

  // Fetch favorites on mount
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