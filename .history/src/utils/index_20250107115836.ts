// 工具函数
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN');
};

export const isClient = typeof window !== 'undefined'; 