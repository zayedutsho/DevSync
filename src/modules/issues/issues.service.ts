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

///single issue

const getSingleIssueFromDb = async (id: string) => {
  // get issue
  const issueResult = await pool.query(
    `
    SELECT * FROM issues
    WHERE id = $1
    `,
    [id],
  );

  const issue = issueResult.rows[0];

  // issue not found
  if (!issue) {
    throw new Error("Issue not found");
  }

  // get reporter
  const reporterResult = await pool.query(
    `
    SELECT id, name, role
    FROM users
    WHERE id = $1
    `,
    [issue.reporter_id],
  );

  const reporter = reporterResult.rows[0];

  // return formatted issue
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

//update issues
const updateIssueIntoDb = async (
  id: string,
  payload: {
    title?: string;
    description?: string;
    type?: string;
    status?: string;
  },
  user: any,
) => {
  // get issue
  const issueResult = await pool.query(
    `
    SELECT * FROM issues
    WHERE id = $1
    `,
    [id],
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  // contributor rules
  if (user.role === "contributor") {
    // can only edit own issue
    if (issue.reporter_id !== user.id) {
      throw new Error("You can only update your own issues");
    }

    // cannot edit resolved/in_progress
    if (issue.status !== "open") {
      throw new Error("You can only update open issues");
    }
  }

  // update issue
  const result = await pool.query(
    `
    UPDATE issues
    SET
      title = $1,
      description = $2,
      type = $3,
      status = $4,
      updated_at = NOW()
    WHERE id = $5
    RETURNING *
    `,
    [
      payload.title || issue.title,
      payload.description || issue.description,
      payload.type || issue.type,
      payload.status || issue.status,
      id,
    ],
  );

  return result.rows[0];
};

export const issuesService = {
  createIssueIntoDb,
  getAllIssuesFromDb,
  getSingleIssueFromDb,
  updateIssueIntoDb,
};
