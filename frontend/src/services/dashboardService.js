import api from './api';

const DASHBOARD_BASE_URL = '/dashboard';

/**
 * Dashboard Service - Real-time analytics API integration
 * Provides all dashboard endpoints with centralized error handling and auth
 */

export const dashboardService = {
  /**
   * Get overall dashboard statistics
   * Total teachers, students, classes, subjects, timetables
   */
  async getDashboardStats() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      throw error;
    }
  },

  /**
   * Get teacher workload analytics
   * Average lessons per week, overloaded teachers, workload distribution
   */
  async getTeacherAnalytics() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/teacher-load`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch teacher analytics:', error);
      throw error;
    }
  },

  /**
   * Get timetable statistics and generation metrics
   * Generated timetables, active schedules, average slots per class
   */
  async getTimetableAnalytics() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/timetable-analytics`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch timetable analytics:', error);
      throw error;
    }
  },

  /**
   * Get conflict analytics
   * Total conflicts, by type, by teacher, resolution rate
   */
  async getConflictAnalytics() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/conflicts`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch conflict analytics:', error);
      throw error;
    }
  },

  /**
   * Get classroom utilization data
   * Utilization percentage, peak hours, free classrooms
   */
  async getClassroomAnalytics() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/classroom-utilization`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch classroom analytics:', error);
      throw error;
    }
  },

  /**
   * Get subject distribution across timetable
   * Subject counts, popularity, average slots
   */
  async getSubjectAnalytics() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/subject-distribution`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch subject analytics:', error);
      throw error;
    }
  },

  /**
   * Get free periods analytics
   * Weekly free periods, trends, availability
   */
  async getFreePeriodAnalytics() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/free-periods`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch free period analytics:', error);
      throw error;
    }
  },

  /**
   * Get activity feed - recent timetable updates and changes
   */
  async getActivityFeed() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/activity-feed`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch activity feed:', error);
      throw error;
    }
  },

  /**
   * Get operational insights and alerts
   * Overloaded teachers, conflicts, efficiency metrics
   */
  async getOperationalInsights() {
    try {
      const response = await api.get(`${DASHBOARD_BASE_URL}/insights`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch operational insights:', error);
      throw error;
    }
  },
};

export default dashboardService;
