import { pool } from "../../db/index.js";

const createIssueIntoDb = async (
  payload: {
    title: string;
    description: string;
    type: "bug" | "feature_request";
  },
  reporter_id: number,
) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
    INSERT INTO issues (
      title,
      description,
      type,
      reporter_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, type, reporter_id],
  );

  return result.rows[0];
};
export const issuesService = {
  createIssueIntoDb,
};
