import React, { useState } from 'react';
import { Button } from './comp.index';

function Filters({
    applyFilters,
    clearFilters,
}) {
 
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const priceRanges = ['Under $50', '$50 - $200', '$200 - $500', 'Over $500'];
  const categories = ['smartphones', 'laptops', 'mens-watches', 'automotive'];

  const handlePriceRangeChange = (value) => {
    setSelectedPriceRange(prev => prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
    );
  };

  const handleCategoryChange = (value) => {
    setSelectedCategories(prev => prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
    );
  };

  return (
      <div className='flex w-full my-4 justify-around transition ease-linear delay-150 '>
          <div>
              <h2 className=' font-semibold mb-1.5'>Price Range</h2>
              {priceRanges.map(range => (
                  <label key={range} className='block'>
                      <input
                          type="checkbox"
                          value={range}
                          checked={selectedPriceRange.includes(range)}
                          onChange={() => handlePriceRangeChange(range)}
                          className=' mr-2'
                      />
                      {range}
                  </label>
              ))}
          </div>
          <div>
              <h2 className=' font-semibold mb-1.5'>Categories</h2>
              {categories.map(category => (
                  <label key={category} className='block'>
                      <input
                          type="checkbox"
                          value={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className=' mr-2'
                      />
                      {category.charAt(0).toUpperCase() + category.substring(1)}
                  </label>
              ))}
          </div>
          <div>
              <Button className='rounded-lg mb-2 bg-black text-white' onClick={() => applyFilters(selectedPriceRange, selectedCategories)}>
                  Apply
              </Button>
              <Button className='rounded-lg border border-black bg-white text-black' onClick={clearFilters}>
                  Reset
              </Button>
          </div>
      </div>
  );
};

export default Filters;
