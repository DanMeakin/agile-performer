import React from 'react';

import { ProductTracking, DevelopmentHealth, AgileMaturityContainer, ProductQualityContainer } from '../../components/dashboards';

const menuItems = {
  filterTerm: "",
  items: [
    {
      heading: "DASHBOARDS",
      metrics: [
        {
          type: AgileMaturityContainer,
          name: "Agile Maturity"
        },
        {
          type: DevelopmentHealth,
          name: "Development Health"
        },
        {
          type: ProductTracking,
          name: "Product Tracking"
        },
        {
          type: ProductQualityContainer,
          name: "Product Quality"
        },
      ]
    }
  ]
};

const filterMenuItems = (term) => (
  { filterTerm: term,
    items: menuItems.items.map(({ heading, metrics }) => (
      { heading,
        metrics: metrics.filter(({ name }) => (
          name.toLowerCase().includes(term.toLowerCase())
        ))
      }
    )).filter(({ metrics }) => (
      metrics.length > 0
    ))
  }
);

export { menuItems, filterMenuItems };
