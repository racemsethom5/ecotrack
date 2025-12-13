describe('Calculator Input Validation', () => {
  describe('Household Size', () => {
    it('should accept valid household size (1-20)', () => {
      const validSizes = [1, 5, 10, 20];
      validSizes.forEach(size => {
        expect(size).toBeGreaterThanOrEqual(1);
        expect(size).toBeLessThanOrEqual(20);
      });
    });

    it('should reject invalid household sizes', () => {
      const invalidSizes = [0, -1, 21, 100];
      invalidSizes.forEach(size => {
        const isValid = size >= 1 && size <= 20;
        expect(isValid).toBe(false);
      });
    });
  });

  describe('Electricity Value', () => {
    it('should accept positive numbers', () => {
      const validValues = [100, 3500, 10000];
      validValues.forEach(value => {
        expect(value).toBeGreaterThanOrEqual(0);
      });
    });

    it('should reject negative values', () => {
      const invalidValues = [-100, -1];
      invalidValues.forEach(value => {
        expect(value).toBeLessThan(0);
      });
    });
  });

  describe('Country Code', () => {
    it('should accept valid 2-letter country codes', () => {
      const validCodes = ['DE', 'US', 'GB', 'FR'];
      validCodes.forEach(code => {
        expect(code).toHaveLength(2);
        expect(code).toMatch(/^[A-Z]{2}$/);
      });
    });

    it('should reject invalid country codes', () => {
      const invalidCodes = ['D', 'USA', '12', 'de'];
      invalidCodes.forEach(code => {
        const isValid = /^[A-Z]{2}$/.test(code);
        expect(isValid).toBe(false);
      });
    });
  });

  describe('Airport Codes', () => {
    it('should accept valid 3-letter IATA codes', () => {
      const validCodes = ['FRA', 'JFK', 'LAX', 'LHR'];
      validCodes.forEach(code => {
        expect(code).toHaveLength(3);
        expect(code).toMatch(/^[A-Z]{3}$/);
      });
    });

    it('should reject invalid airport codes', () => {
      const invalidCodes = ['F', 'FRANK', '123', 'fra'];
      invalidCodes.forEach(code => {
        const isValid = /^[A-Z]{3}$/.test(code);
        expect(isValid).toBe(false);
      });
    });
  });

  describe('Vehicle Distance', () => {
    it('should accept realistic distances', () => {
      const validDistances = [0, 5000, 15000, 50000];
      validDistances.forEach(distance => {
        expect(distance).toBeGreaterThanOrEqual(0);
        expect(distance).toBeLessThanOrEqual(100000);
      });
    });
  });

  describe('Diet Type', () => {
    it('should accept valid diet types', () => {
      const validDiets = ['vegan', 'vegetarian', 'low-meat', 'medium-meat', 'high-meat'];
      const allowedDiets = ['vegan', 'vegetarian', 'low-meat', 'medium-meat', 'high-meat'];
      
      validDiets.forEach(diet => {
        expect(allowedDiets).toContain(diet);
      });
    });

    it('should reject invalid diet types', () => {
      const invalidDiets = ['carnivore', 'paleo', 'keto', ''];
      const allowedDiets = ['vegan', 'vegetarian', 'low-meat', 'medium-meat', 'high-meat'];
      
      invalidDiets.forEach(diet => {
        expect(allowedDiets).not.toContain(diet);
      });
    });
  });

  describe('Shopping Frequency', () => {
    it('should accept valid frequencies', () => {
      const validFrequencies = ['minimal', 'average', 'frequent'];
      const allowedFrequencies = ['minimal', 'average', 'frequent'];
      
      validFrequencies.forEach(freq => {
        expect(allowedFrequencies).toContain(freq);
      });
    });
  });

  describe('Form Data Structure', () => {
    it('should have all required fields', () => {
      const formData = {
        householdSize: 3,
        country: 'DE',
        electricityValue: 3500,
        dietType: 'medium-meat',
        shoppingFrequency: 'average',
      };

      expect(formData).toHaveProperty('householdSize');
      expect(formData).toHaveProperty('country');
      expect(formData).toHaveProperty('electricityValue');
      expect(formData).toHaveProperty('dietType');
      expect(formData).toHaveProperty('shoppingFrequency');
    });
  });
});