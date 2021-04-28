import { query } from '../../../database';

const deleteContentById = async (id, client) => {
  const sql = `
    DELETE FROM contents
    WHERE id = $1
    RETURNING *
  `;

  const res = await query(sql, [id], client);
  return res.rows[0];
};

const deleteCategory = async (id, client) => {
  const sql = `
    DELETE FROM content_categories
    WHERE id = $1
    RETURNING *
  `;

  const res = await query(sql, [id], client);
  return res.rows[0];
};

const deleteContentFromProgrammeById = async (programmeContentId, client) => {
  const sql = `
    DELETE FROM programmes_contents
    WHERE id = $1
    RETURNING *
  `;

  const res = await query(sql, [programmeContentId], client);
  return res.rows[0];
};

const deleteUnusedContentCategories = async () => {
  const sql = `
    DELETE FROM content_categories
    WHERE id IN (
      SELECT
        cc.id
      FROM content_categories AS cc
      LEFT JOIN contents_content_categories ccc ON (ccc.category_id = cc.id)
      LEFT JOIN contents c ON (c.id = ccc.content_id)
      WHERE c.id IS NULL
    )
    RETURNING *
  `;

  const res = await query(sql);
  return res.rows;
};

const deleteUnusedContentsContentCategoryByContentIds = async (
  { updatedContentsIds, CCCIdsToKeep },
  client,
) => {
  const values = [updatedContentsIds, CCCIdsToKeep];

  const sql = `
    DELETE FROM contents_content_categories
    WHERE content_id = ANY($1) AND id <> ALL($2)
    RETURNING *
  `;

  const res = await query(sql, values, client);
  return res.rows;
};

export {
  deleteContentById,
  deleteCategory,
  deleteContentFromProgrammeById,
  deleteUnusedContentCategories,
  deleteUnusedContentsContentCategoryByContentIds,
};
