import { query } from '../connect';

const createMedia = async (
  { fileName, key, bucket, bucketRegion, createdBy, path },
  client,
) => {
  const values = [fileName, key, bucket, bucketRegion, createdBy, path];
  const sql = `
    INSERT INTO media(
      file_name,
      key,
      bucket,
      bucket_region,
      created_by,
      path
    )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      ) RETURNING *
  `;
  const res = await query(sql, values, client);
  return res.rows[0];
};

export { createMedia };
