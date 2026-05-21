import { create } from 'zustand';
import dashboardService from '../services/dashboardService';

/**
 * Dashboard Zustand Store
 * Manages all dashboard state, analytics data, loading, and error states
 * Provides real-time data fetching and refresh capabilities
 */

export const useDashboardStore = create((set, get) => ({
  // ============ STATE ============
  dashboardStats: {
    totalTeachers: 0,
    totalStudents: 0,
    totalClasses: 0,
    totalSubjects: 0,
  },
  teacherAnalytics: {
    averageLessonsPerWeek: 0,
    overloadedTeachers: 0,
    workloadDistribution: [],
    weeklyData: [],
  },
  timetableAnalytics: {
    generatedTimetables: 0,
    activeSchedules: 0,
    averageSlotsPerClass: 0,
    weeksGenerated: 0,
  },
  conflictAnalytics: {
    totalConflicts: 0,
    conflictsByType: {},
    conflictsByTeacher: [],
    resolutionRate: 0,
  },
  classroomAnalytics: {
    utilizationPercentage: 0,
    totalClassrooms: 0,
    freeClassrooms: 0,
    peakHours: [],
  },
  subjectAnalytics: {
    subjectDistribution: [],
    totalSubjectSlots: 0,
  },
  freePeriodAnalytics: {
    weeklyData: [],
    totalFreePeriods: 0,
    averageFreePeriods: 0,
  },
  activityFeed: [],
  operationalInsights: [],

  // ============ LOADING & ERROR STATES ============
  isLoading: false,
  isLoadingStats: false,
  isLoadingTeacherAnalytics: false,
  isLoadingTimetableAnalytics: false,
  isLoadingConflicts: false,
  isLoadingClassrooms: false,
  
  errors: {
    stats: null,
    teacherAnalytics: null,
    timetableAnalytics: null,
    conflicts: null,
    classrooms: null,
    activity: null,
    insights: null,
  },

  lastUpdated: {
    stats: null,
    teacherAnalytics: null,
    timetableAnalytics: null,
    conflicts: null,
    classrooms: null,
  },

  // ============ ACTIONS ============

  /**
   * Fetch all dashboard data in parallel
   */
  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      const [
        stats,
        teacherAnalytics,
        timetableAnalytics,
        conflictAnalytics,
        classroomAnalytics,
        activityFeed,
        operationalInsights,
      ] = await Promise.all([
        dashboardService.getDashboardStats(),
        dashboardService.getTeacherAnalytics(),
        dashboardService.getTimetableAnalytics(),
        dashboardService.getConflictAnalytics(),
        dashboardService.getClassroomAnalytics(),
        dashboardService.getActivityFeed(),
        dashboardService.getOperationalInsights(),
      ]);

      set({
        dashboardStats: stats || {},
        teacherAnalytics: teacherAnalytics || {},
        timetableAnalytics: timetableAnalytics || {},
        conflictAnalytics: conflictAnalytics || {},
        classroomAnalytics: classroomAnalytics || {},
        activityFeed: activityFeed || [],
        operationalInsights: operationalInsights || [],
        isLoading: false,
        errors: { ...get().errors, stats: null },
        lastUpdated: {
          ...get().lastUpdated,
          stats: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      set({
        isLoading: false,
        errors: {
          ...get().errors,
          stats: error.message || 'Failed to fetch dashboard data',
        },
      });
    }
  },

  /**
   * Fetch only dashboard statistics
   */
  fetchDashboardStats: async () => {
    set({ isLoadingStats: true });
    try {
      const data = await dashboardService.getDashboardStats();
      set({
        dashboardStats: data || {},
        isLoadingStats: false,
        errors: { ...get().errors, stats: null },
        lastUpdated: {
          ...get().lastUpdated,
          stats: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      set({
        isLoadingStats: false,
        errors: {
          ...get().errors,
          stats: error.message || 'Failed to fetch dashboard stats',
        },
      });
    }
  },

  /**
   * Fetch teacher analytics
   */
  fetchTeacherAnalytics: async () => {
    set({ isLoadingTeacherAnalytics: true });
    try {
      const data = await dashboardService.getTeacherAnalytics();
      set({
        teacherAnalytics: data || {},
        isLoadingTeacherAnalytics: false,
        errors: { ...get().errors, teacherAnalytics: null },
        lastUpdated: {
          ...get().lastUpdated,
          teacherAnalytics: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to fetch teacher analytics:', error);
      set({
        isLoadingTeacherAnalytics: false,
        errors: {
          ...get().errors,
          teacherAnalytics: error.message || 'Failed to fetch teacher analytics',
        },
      });
    }
  },

  /**
   * Fetch timetable analytics
   */
  fetchTimetableAnalytics: async () => {
    set({ isLoadingTimetableAnalytics: true });
    try {
      const data = await dashboardService.getTimetableAnalytics();
      set({
        timetableAnalytics: data || {},
        isLoadingTimetableAnalytics: false,
        errors: { ...get().errors, timetableAnalytics: null },
        lastUpdated: {
          ...get().lastUpdated,
          timetableAnalytics: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to fetch timetable analytics:', error);
      set({
        isLoadingTimetableAnalytics: false,
        errors: {
          ...get().errors,
          timetableAnalytics: error.message || 'Failed to fetch timetable analytics',
        },
      });
    }
  },

  /**
   * Fetch conflict analytics
   */
  fetchConflictAnalytics: async () => {
    set({ isLoadingConflicts: true });
    try {
      const data = await dashboardService.getConflictAnalytics();
      set({
        conflictAnalytics: data || {},
        isLoadingConflicts: false,
        errors: { ...get().errors, conflicts: null },
        lastUpdated: {
          ...get().lastUpdated,
          conflicts: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to fetch conflict analytics:', error);
      set({
        isLoadingConflicts: false,
        errors: {
          ...get().errors,
          conflicts: error.message || 'Failed to fetch conflict analytics',
        },
      });
    }
  },

  /**
   * Fetch classroom analytics
   */
  fetchClassroomAnalytics: async () => {
    set({ isLoadingClassrooms: true });
    try {
      const data = await dashboardService.getClassroomAnalytics();
      set({
        classroomAnalytics: data || {},
        isLoadingClassrooms: false,
        errors: { ...get().errors, classrooms: null },
        lastUpdated: {
          ...get().lastUpdated,
          classrooms: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to fetch classroom analytics:', error);
      set({
        isLoadingClassrooms: false,
        errors: {
          ...get().errors,
          classrooms: error.message || 'Failed to fetch classroom analytics',
        },
      });
    }
  },

  /**
   * Refresh all dashboard data
   */
  refreshDashboard: async () => {
    await get().fetchDashboardData();
  },

  /**
   * Retry failed requests
   */
  retryFailedRequests: async () => {
    const { errors } = get();
    if (errors.stats) await get().fetchDashboardStats();
    if (errors.teacherAnalytics) await get().fetchTeacherAnalytics();
    if (errors.timetableAnalytics) await get().fetchTimetableAnalytics();
    if (errors.conflicts) await get().fetchConflictAnalytics();
    if (errors.classrooms) await get().fetchClassroomAnalytics();
  },

  /**
   * Clear all errors
   */
  clearErrors: () => {
    set({
      errors: {
        stats: null,
        teacherAnalytics: null,
        timetableAnalytics: null,
        conflicts: null,
        classrooms: null,
        activity: null,
        insights: null,
      },
    });
  },

  /**
   * Reset dashboard state
   */
  reset: () => {
    set({
      dashboardStats: {},
      teacherAnalytics: {},
      timetableAnalytics: {},
      conflictAnalytics: {},
      classroomAnalytics: {},
      subjectAnalytics: {},
      freePeriodAnalytics: {},
      activityFeed: [],
      operationalInsights: [],
      isLoading: false,
      isLoadingStats: false,
      isLoadingTeacherAnalytics: false,
      isLoadingTimetableAnalytics: false,
      isLoadingConflicts: false,
      isLoadingClassrooms: false,
      errors: {
        stats: null,
        teacherAnalytics: null,
        timetableAnalytics: null,
        conflicts: null,
        classrooms: null,
        activity: null,
        insights: null,
      },
      lastUpdated: {
        stats: null,
        teacherAnalytics: null,
        timetableAnalytics: null,
        conflicts: null,
        classrooms: null,
      },
    });
  },
}));

export default useDashboardStore;
