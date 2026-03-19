export interface DashboardData {
  todayTotal: number;
  successRate: number;
  activeUsers: number;
  pendingReviews: number;
}

export interface TrendData {
  dates: string[];
  counts: number[];
}

export interface CategoryData {
  name: string;
  value: number;
}

// 模拟获取看板核心指标
export const getDashboardData = (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        todayTotal: 1254,
        successRate: 98.5,
        activeUsers: 342,
        pendingReviews: 12,
      });
    }, 500);
  });
};

// 模拟获取7天趋势数据
export const getTrendData = (): Promise<TrendData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dates = [];
      const counts = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        dates.push(`${d.getMonth() + 1}-${d.getDate()}`);
        counts.push(Math.floor(Math.random() * 500) + 800);
      }
      resolve({ dates, counts });
    }, 500);
  });
};

// 模拟获取类别占比数据
export const getCategoryData = (): Promise<CategoryData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: '主食', value: 350 },
        { name: '肉类', value: 280 },
        { name: '蔬菜', value: 420 },
        { name: '水果', value: 150 },
        { name: '零食饮品', value: 180 },
      ]);
    }, 500);
  });
};
