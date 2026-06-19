import Notification from "../models/Notification.js";

/**
 * Create a notification
 * @param {Object} data - Notification data
 * @param {string} data.recipient - User ID of the recipient
 * @param {string} data.sender - User ID of the sender (optional)
 * @param {string} data.type - Notification type (task_assigned, task_completed, progress_updated, account_deactivated)
 * @param {string} data.title - Notification title
 * @param {string} data.message - Notification message
 * @param {string} data.link - Link to navigate to (optional)
 * @param {Object} data.metadata - Additional metadata (optional)
 * @returns {Promise<Object|null>} - The created notification or null on error
 */
export const createNotification = async (data) => {
  try {
    const notification = new Notification({
      recipient: data.recipient,
      sender: data.sender || null,
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link || null,
      metadata: data.metadata || {},
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
    return null;
  }
};