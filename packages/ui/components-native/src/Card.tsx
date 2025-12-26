import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'solid' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'solid',
  style,
  ...props
}) => {
  const variantStyles = {
    solid: styles.solid,
    glass: styles.glass,
  };

  return (
    <View style={[styles.base, variantStyles[variant], style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    padding: 24,
  },
  solid: {
    backgroundColor: '#1a163a', // cosmic-800
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
