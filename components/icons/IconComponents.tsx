import React from 'react';

const iconContainerClasses = "flex items-center justify-center h-12 w-12 rounded-lg bg-neutral-800/80 border border-neutral-700 mb-6";
const iconProps = {
  className: "w-6 h-6 text-neutral-400",
  strokeWidth: 1.5,
};

const ServiceIconContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="flex items-center justify-center h-12 w-12 rounded-lg mb-6"
    style={{
      backgroundColor: 'rgba(var(--card-bg-rgb), var(--card-bg-alpha))',
      border: '1px solid rgb(var(--card-border-rgb))'
    }}
  >
    {children}
  </div>
);

const serviceIconProps = {
  className: "w-6 h-6",
  strokeWidth: 1.5,
  style: { color: 'rgb(var(--accent-text-rgb))' }
};

export const AITechnologyConsultingIcon: React.FC = () => (
  <ServiceIconContainer>
    <svg {...serviceIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
    </svg>
  </ServiceIconContainer>
);

export const PersonalizedAIWorkshopsIcon: React.FC = () => (
  <ServiceIconContainer>
    <svg {...serviceIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.962 0L14.25 6h5.25M5.25 6h5.25m0 0V3.75M10.5 6V3.75m0 0a3.75 3.75 0 015.962 0M10.5 3.75a3.75 3.75 0 00-5.962 0M17.25 18.72v3.75m-10.5-3.75v3.75m-3.75-3.75v3.75M5.25 19.5h3.75m-3.75 0a3.75 3.75 0 015.962 0m-5.962 0a3.75 3.75 0 005.962 0" />
    </svg>
  </ServiceIconContainer>
);

export const CustomAISolutionsIcon: React.FC = () => (
  <ServiceIconContainer>
    <svg {...serviceIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  </ServiceIconContainer>
);

export const Phase1Icon: React.FC = () => (
  <ServiceIconContainer>
    <span className="text-2xl font-bold" style={{ color: 'rgb(var(--accent-text-rgb))' }}>1</span>
  </ServiceIconContainer>
);

export const Phase2Icon: React.FC = () => (
  <ServiceIconContainer>
    <span className="text-2xl font-bold" style={{ color: 'rgb(var(--accent-text-rgb))' }}>2</span>
  </ServiceIconContainer>
);

export const Phase3Icon: React.FC = () => (
  <ServiceIconContainer>
    <span className="text-2xl font-bold" style={{ color: 'rgb(var(--accent-text-rgb))' }}>3</span>
  </ServiceIconContainer>
);


{/* FIX: Add missing icon components required by Platform.tsx */}
const platformIconProps = {
  className: "w-8 h-8 text-neutral-400",
  strokeWidth: 1.5,
};

export const DataLayerIcon: React.FC = () => (
    <svg {...platformIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5V6A1.5 1.5 0 0 1 6 4.5h12A1.5 1.5 0 0 1 19.5 6v1.5m-15 3V12A1.5 1.5 0 0 1 6 10.5h12A1.5 1.5 0 0 1 19.5 12v1.5m-15 3V18A1.5 1.5 0 0 1 6 16.5h12A1.5 1.5 0 0 1 19.5 18v1.5" />
    </svg>
);

export const ModelingLayerIcon: React.FC = () => (
    <svg {...platformIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18M9 4.5v3M15 10.5v3M7 16.5v3" />
    </svg>
);

export const ApplicationLayerIcon: React.FC = () => (
    <svg {...platformIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h16.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5zM7.5 10.5l2.25 1.5-2.25 1.5m4.5 1.5h3" />
    </svg>
);

export const SecurityIcon: React.FC = () => (
    <svg {...platformIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L4.5 6.375v4.5c0 4.5 5.625 8.625 7.5 8.625s7.5-4.125 7.5-8.625v-4.5L12 2.25z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v3m0 1.5v2.25" />
    </svg>
);