import {
  getDashboardStats as getDashboardStatsService,
} from "../services/dashboardService.js";

/*
|--------------------------------------------------------------------------
| Dashboard Stats
|--------------------------------------------------------------------------
*/

export const getDashboardStats = async (
  req,
  res,
  next
) => {
  try {
    const stats =
      await getDashboardStatsService();

    res.status(200).json({
      success: true,
      message:
        "Dashboard statistics fetched successfully.",
      stats,
    });
  } catch (error) {
    next(error);
  }
};