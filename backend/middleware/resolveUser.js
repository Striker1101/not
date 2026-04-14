const { User } = require("../models");

/**
 * Resolves a userId query parameter to an internal database ID.
 * The userId could be:
 * - An internal numeric ID
 * - A UID string (from the frontend, which uses Firebase-style UIDs)
 * - undefined (use the logged-in user's ID)
 */
async function resolveUserId(queryUserId, fallbackId) {
  if (!queryUserId) return fallbackId;

  // Try to find by UID string first
  const targetUser = await User.findOne({ where: { uid: queryUserId } });
  if (targetUser) return targetUser.id;

  // Try as numeric ID
  if (!isNaN(queryUserId)) return parseInt(queryUserId);

  return fallbackId;
}

module.exports = { resolveUserId };
