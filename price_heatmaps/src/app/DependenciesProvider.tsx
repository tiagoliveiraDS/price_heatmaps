'use client';

import { dependencies } from '@/dependencies';
import { DependenciesContext } from '@/dependencies.context';
import React, { ReactNode } from 'react';
type DependenciesProviderProps = {
  children: ReactNode;
};

const DependenciesProvider = ({ children }: DependenciesProviderProps) => {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
};

export default DependenciesProvider;
