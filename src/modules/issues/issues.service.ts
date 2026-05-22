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

//get all issues from db

const getAllIssuesFromDb = async (query: {
  sort?: string;
  type?: string;
  status?: string;
}) => {
  const { sort = "newest", type, status } = query;

  let sql = `SELECT * FROM issues`;
  const conditions: string[] = [];
  const values: string[] = [];

  ///filtering
  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }
  if (status) {
    values.push(status);

    conditions.push(`status = $${values.length}`);
  }
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  // sorting
  if (sort === "oldest") {
    sql += ` ORDER BY created_at ASC`;
  } else {
    sql += ` ORDER BY created_at DESC`;
  }

  // fetch all issues
  const issueResult = await pool.query(sql, values);

  const issues = issueResult.rows;
  // collect reporter ids
  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];
  // fetch reporters separately
  let reporters: any[] = [];

  if (reporterIds.length > 0) {
    const reporterQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
    `;

    const reporterResult = await pool.query(reporterQuery, [reporterIds]);

    reporters = reporterResult.rows;
  }
  // merge reporters
  const formattedIssues = issues.map((issue) => {
    const reporter = reporters.find((r) => r.id === issue.reporter_id);

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: reporter || null,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  return formattedIssues;
};

export const issuesService = {
  createIssueIntoDb,
  getAllIssuesFromDb,
};
