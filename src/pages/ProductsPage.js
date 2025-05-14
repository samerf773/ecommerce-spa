import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
  Checkbox,
  FormControlLabel,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';

const PRODUCTS_PER_PAGE = 12;

const ProductsPage = () => {
  // State for all products fetched from API
  const [products, setProducts] = useState([]);

  // Loading state for API call
  const [loading, setLoading] = useState(false);

  // Filter states
  const [searchName, setSearchName] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Sorting state: 'name-asc', 'price-asc', 'price-desc'
  const [sort, setSort] = useState('price-desc');

  // Pagination state
  const [page, setPage] = useState(1);

  // Fetch products from mock API on mount
  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products?limit=100') // example mock API
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter products based on name, price, and availability
  const filtered = products
    .filter(p =>
      p.title.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter(p =>
      p.price >= priceRange[0] && p.price <= priceRange[1]
    )
    .filter(p =>
      onlyAvailable ? p.rating.count > 0 : true
    );

  // Sorting function optimized for performance
  const sorted = filtered.sort((a, b) => {
    switch (sort) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
      default:
        return b.price - a.price;
    }
  });

  // Pagination: slice current page products
  const paginatedProducts = sorted.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // Reset page to 1 when filters or sort change
  useEffect(() => {
    setPage(1);
  }, [searchName, priceRange, onlyAvailable, sort]);

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Filters & Sorting */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Search by Name */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search by Name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Price Range Slider */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography gutterBottom>Price Range (${priceRange[0]} - ${priceRange[1]})</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </Grid>

        {/* Availability Checkbox */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyAvailable}
                onChange={e => setOnlyAvailable(e.target.checked)}
              />
            }
            label="Available Only"
          />
        </Grid>

        {/* Sorting Select */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              label="Sort By"
              onChange={e => setSort(e.target.value)}
            >
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="name-asc">Name: A to Z</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {paginatedProducts.length === 0 && (
          <Typography variant="h6" sx={{ mx: 3, mt: 5 }}>
            No products found.
          </Typography>
        )}
        {paginatedProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4, type: 'spring' }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 8 },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="body1" color="primary" gutterBottom>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.rating.count > 0 ? 'In Stock' : 'Out of Stock'}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Pagination
          count={Math.ceil(sorted.length / PRODUCTS_PER_PAGE)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default ProductsPage;
