import React from 'react';
import { Pressable, Text, PressableProps, StyleSheet } from 'react-native';
import { clsx } from 'clsx';

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  style,
  ...props
}) => {
  const baseStyles = styles.base;
  
  const variantStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    glass: styles.glass,
  };

  const sizeStyles = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
  };

  const textSizeStyles = {
    sm: styles.textSm,
    md: styles.textMd,
    lg: styles.textLg,
  };

  return (
    <Pressable
      style={[baseStyles, variantStyles[variant], sizeStyles[size], style as any]}
      {...props}
    >
      <Text style={[styles.text, textSizeStyles[size]]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#2f2a5c', // cosmic-600
  },
  secondary: {
    backgroundColor: '#f8f9fa', // starlight-200
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
  },
  textSm: {
    fontSize: 14,
  },
  textMd: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
});
