// Utilidades para optimización de imágenes y detección de dispositivo

export const isMobile = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isSmallScreen = window.innerWidth <= 768;
  return isMobileDevice || isSmallScreen;
};

export const isLowEndDevice = (): boolean => {
  // Detectar dispositivos de gama baja basado en memoria y CPU
  const memory = (navigator as any).deviceMemory || 4; // GB
  const cores = (navigator as any).hardwareConcurrency || 4;
  return memory < 4 || cores < 4;
};

export const getOptimizedImageSrc = (src: string, quality: 'low' | 'medium' | 'high' = 'medium'): string => {
  // En un entorno real, aquí se implementaría la lógica para servir imágenes optimizadas
  // Por ahora, simplemente retornamos la imagen original
  return src;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

export const preloadImages = async (srcs: string[]): Promise<void> => {
  const promises = srcs.map(src => preloadImage(src));
  await Promise.allSettled(promises);
};

// Configuración de calidad según dispositivo
export const getQualityConfig = () => {
  const mobile = isMobile();
  const lowEnd = isLowEndDevice();
  
  if (lowEnd) {
    return {
      imageQuality: 'low',
      animationReduced: true,
      shadowsDisabled: true,
      antialiasing: false
    };
  }
  
  if (mobile) {
    return {
      imageQuality: 'medium',
      animationReduced: false,
      shadowsDisabled: false,
      antialiasing: false
    };
  }
  
  return {
    imageQuality: 'high',
    animationReduced: false,
    shadowsDisabled: false,
    antialiasing: true
  };
}; 